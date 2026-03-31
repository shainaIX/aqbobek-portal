import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { adminClient } from "@/lib/supabase/admin";

interface ConversationParticipantRow {
  conversation_id: string;
  user_id: string;
}

interface ConversationRow {
  id: string;
  created_at: string;
}

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || profile?.role !== "admin") {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }

  return { user };
}

export async function POST() {
  const auth = await requireAdmin();
  if ("error" in auth) {
    return auth.error;
  }

  const [{ data: participants, error: participantsError }, { data: conversations, error: conversationsError }] =
    await Promise.all([
      adminClient.from("conversation_participants").select("conversation_id, user_id"),
      adminClient.from("conversations").select("id, created_at"),
    ]);

  if (participantsError) {
    return NextResponse.json({ error: participantsError.message }, { status: 500 });
  }

  if (conversationsError) {
    return NextResponse.json({ error: conversationsError.message }, { status: 500 });
  }

  const participantMap = new Map<string, string[]>();
  for (const row of (participants ?? []) as ConversationParticipantRow[]) {
    const list = participantMap.get(row.conversation_id) ?? [];
    list.push(row.user_id);
    participantMap.set(row.conversation_id, list);
  }

  const groupedByPair = new Map<string, ConversationRow[]>();

  for (const conversation of (conversations ?? []) as ConversationRow[]) {
    const members = [...(participantMap.get(conversation.id) ?? [])].sort();

    if (members.length !== 2) {
      continue;
    }

    const pairKey = members.join(":");
    const list = groupedByPair.get(pairKey) ?? [];
    list.push(conversation);
    groupedByPair.set(pairKey, list);
  }

  const duplicateIds: string[] = [];

  for (const group of groupedByPair.values()) {
    if (group.length < 2) {
      continue;
    }

    group.sort((a, b) => {
      const aTime = a.created_at ?? "";
      const bTime = b.created_at ?? "";
      return bTime.localeCompare(aTime);
    });

    duplicateIds.push(...group.slice(1).map((item) => item.id));
  }

  if (duplicateIds.length === 0) {
    return NextResponse.json({ removed: 0 });
  }

  const { error: messagesDeleteError } = await adminClient
    .from("messages")
    .delete()
    .in("conversation_id", duplicateIds);

  if (messagesDeleteError) {
    return NextResponse.json({ error: messagesDeleteError.message }, { status: 500 });
  }

  const { error: participantsDeleteError } = await adminClient
    .from("conversation_participants")
    .delete()
    .in("conversation_id", duplicateIds);

  if (participantsDeleteError) {
    return NextResponse.json({ error: participantsDeleteError.message }, { status: 500 });
  }

  const { error: conversationsDeleteError } = await adminClient
    .from("conversations")
    .delete()
    .in("id", duplicateIds);

  if (conversationsDeleteError) {
    return NextResponse.json({ error: conversationsDeleteError.message }, { status: 500 });
  }

  return NextResponse.json({
    removed: duplicateIds.length,
    conversation_ids: duplicateIds,
  });
}
