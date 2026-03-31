import { NextResponse } from "next/server";
import { adminClient } from "@/lib/supabase/admin";
import { createManagedUser } from "@/lib/server/user-management";

async function hasAdminAccount() {
  const { count, error } = await adminClient
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .eq("role", "admin");

  if (error) {
    throw new Error(error.message);
  }

  return (count ?? 0) > 0;
}

export async function GET() {
  try {
    return NextResponse.json({ can_bootstrap: !(await hasAdminAccount()) });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to inspect admins" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    if (await hasAdminAccount()) {
      return NextResponse.json(
        { error: "Администратор уже существует. Используйте админку для создания новых пользователей." },
        { status: 409 },
      );
    }

    const body = (await req.json()) as {
      name?: string;
      email?: string;
      password?: string;
    };

    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const password = body.password ?? "";

    if (!name || !email || password.length < 6) {
      return NextResponse.json(
        { error: "Укажите имя, email и пароль не короче 6 символов." },
        { status: 400 },
      );
    }

    await createManagedUser({
      name,
      email,
      password,
      role: "admin",
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Не удалось создать администратора" },
      { status: 500 },
    );
  }
}
