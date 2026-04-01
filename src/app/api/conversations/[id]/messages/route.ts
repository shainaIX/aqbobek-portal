import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { adminClient } from "@/lib/supabase/admin";

interface MessageRow {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

interface ProfileRow {
  id: string;
  name: string | null;
  role: string | null;
  avatar_url: string | null;
}

function mapMessageWithProfiles(
  messages: MessageRow[],
  profiles: Map<string, ProfileRow>,
) {
  return messages.map((message) => {
    const profile = profiles.get(message.sender_id);

    return {
      id: message.id,
      conversation_id: message.conversation_id,
      sender_id: message.sender_id,
      content: message.content,
      created_at: message.created_at,
      sender_name: profile?.name ?? "Неизвестный",
      sender_role: profile?.role ?? null,
      sender_avatar: profile?.avatar_url ?? null,
    };
  });
}

async function requireConversationAccess(conversationId: string) {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: NextResponse.json({ error: "Не авторизован" }, { status: 401 }) };
  }

  const { data: access } = await supabase
    .from("conversation_participants")
    .select("user_id")
    .eq("conversation_id", conversationId)
    .eq("user_id", user.id)
    .single();

  if (!access) {
    return { error: NextResponse.json({ error: "Доступ запрещён" }, { status: 403 }) };
  }

  return { user };
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const access = await requireConversationAccess(id);

  if ("error" in access) {
    return access.error;
  }

  const url = new URL(req.url);
  const cursor = url.searchParams.get("cursor");
  const limit = 30;

  let query = adminClient
    .from("messages")
    .select("id, conversation_id, sender_id, content, created_at")
    .eq("conversation_id", id)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (cursor) {
    query = query.lt("created_at", cursor);
  }

  const { data: messageRows, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const messages = [...(messageRows ?? [])].reverse() as MessageRow[];
  const senderIds = [...new Set(messages.map((message) => message.sender_id))];

  const { data: profileRows, error: profilesError } =
    senderIds.length === 0
      ? { data: [], error: null }
      : await adminClient
          .from("profiles")
          .select("id, name, role, avatar_url")
          .in("id", senderIds);

  if (profilesError) {
    return NextResponse.json({ error: profilesError.message }, { status: 500 });
  }

  const profiles = new Map((profileRows ?? []).map((profile) => [profile.id, profile as ProfileRow]));

  return NextResponse.json(mapMessageWithProfiles(messages, profiles));
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const access = await requireConversationAccess(id);

  if ("error" in access) {
    return access.error;
  }

  const { user } = access;
  const { content } = await req.json();

  if (!content?.trim()) {
    return NextResponse.json({ error: "Пустое сообщение" }, { status: 400 });
  }

  const { data: insertedRows, error: messageError } = await adminClient
    .from("messages")
    .insert({
      conversation_id: id,
      sender_id: user.id,
      content: content.trim(),
    })
    .select("id, conversation_id, sender_id, content, created_at")
    .limit(1);

  if (messageError) {
    return NextResponse.json({ error: messageError.message }, { status: 500 });
  }

  const message = insertedRows?.[0] as MessageRow | undefined;

  if (!message) {
    return NextResponse.json({ error: "Не удалось создать сообщение" }, { status: 500 });
  }

  await adminClient
    .from("conversation_participants")
    .update({ last_read_at: new Date().toISOString() })
    .eq("conversation_id", id)
    .eq("user_id", user.id);

  const [{ data: senderProfile }, { data: recipient }] = await Promise.all([
    adminClient.from("profiles").select("id, name, role, avatar_url").eq("id", user.id).single(),
    adminClient
      .from("conversation_participants")
      .select("user_id")
      .eq("conversation_id", id)
      .neq("user_id", user.id)
      .single(),
  ]);

  if (recipient) {
    await adminClient.from("notifications").insert({
      user_id: recipient.user_id,
      type: "message",
      title: `Новое сообщение от ${senderProfile?.name ?? "пользователя"}`,
      body: content.trim().slice(0, 100),
      metadata: { conversation_id: id, sender_id: user.id },
    });
  }

  const profiles = new Map<string, ProfileRow>();
  if (senderProfile) {
    profiles.set(senderProfile.id, senderProfile as ProfileRow);
  }

  return NextResponse.json(
    mapMessageWithProfiles([message], profiles)[0],
    { status: 201 },
  );
}
