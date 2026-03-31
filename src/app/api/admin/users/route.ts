import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { adminClient } from "@/lib/supabase/admin";
import {
  createManagedUser,
  type ManagedUserRole,
} from "@/lib/server/user-management";

const allowedRoles = new Set<ManagedUserRole>(["student", "teacher", "parent", "admin"]);

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

export async function GET() {
  const auth = await requireAdmin();
  if ("error" in auth) {
    return auth.error;
  }

  const [{ data: authUsers, error: authUsersError }, { data: profiles, error: profilesError }] =
    await Promise.all([
      adminClient.auth.admin.listUsers({ page: 1, perPage: 500 }),
      adminClient.from("profiles").select("id, name, role, avatar_url"),
    ]);

  if (authUsersError) {
    return NextResponse.json({ error: authUsersError.message }, { status: 500 });
  }

  if (profilesError) {
    return NextResponse.json({ error: profilesError.message }, { status: 500 });
  }

  const profileMap = new Map(
    (profiles ?? []).map((profile) => [profile.id, profile]),
  );

  const result = (authUsers?.users ?? []).map((authUser) => {
    const profile = profileMap.get(authUser.id);
    const fallbackName =
      typeof authUser.user_metadata?.name === "string"
        ? authUser.user_metadata.name
        : authUser.email?.split("@")[0] ?? "Пользователь";
    const role =
      (profile?.role ??
        (typeof authUser.user_metadata?.role === "string"
          ? authUser.user_metadata.role
          : null)) as ManagedUserRole | null;

    return {
      id: authUser.id,
      email: authUser.email ?? "",
      name: profile?.name ?? fallbackName,
      role,
      avatar_url: profile?.avatar_url ?? null,
      email_confirmed_at: authUser.email_confirmed_at,
      last_sign_in_at: authUser.last_sign_in_at,
      created_at: authUser.created_at,
      status: authUser.banned_until ? "disabled" : "active",
    };
  });

  return NextResponse.json(result);
}

export async function POST(req: Request) {
  const auth = await requireAdmin();
  if ("error" in auth) {
    return auth.error;
  }

  try {
    const body = (await req.json()) as {
      name?: string;
      email?: string;
      password?: string;
      role?: string;
    };

    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const password = body.password ?? "";
    const role = body.role as ManagedUserRole;

    if (!name || !email || password.length < 6 || !allowedRoles.has(role)) {
      return NextResponse.json(
        { error: "Укажите имя, email, роль и пароль не короче 6 символов." },
        { status: 400 },
      );
    }

    const user = await createManagedUser({
      name,
      email,
      password,
      role,
    });

    return NextResponse.json(
      {
        id: user.id,
        email: user.email,
        name,
        role,
        created_at: user.created_at,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Не удалось создать пользователя" },
      { status: 500 },
    );
  }
}
