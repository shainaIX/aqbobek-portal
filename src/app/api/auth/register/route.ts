import { NextResponse } from "next/server";
import { adminClient } from "@/lib/supabase/admin";
import { upsertProfile } from "@/lib/supabase/profiles";

const allowedRoles = new Set(["student", "parent"]);

function getRegisterErrorMessage(message?: string) {
  if (!message) {
    return "Не удалось создать пользователя";
  }

  if (message === "A user with this email address has already been registered") {
    return "Пользователь с таким email уже существует";
  }

  if (message === "Database error creating new user") {
    return "Supabase не смог создать auth-пользователя. Обычно это связано с trigger/function в базе или обязательным полем в profiles, которое не заполняется.";
  }

  return message;
}

export async function POST(req: Request) {
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
    const role = body.role ?? "";

    if (!name || !email || !password || !allowedRoles.has(role)) {
      return NextResponse.json(
        { error: "Заполните все поля корректно" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Пароль должен быть не менее 6 символов" },
        { status: 400 },
      );
    }

    const { data, error } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        name,
        role,
      },
    });

    if (error || !data.user) {
      return NextResponse.json(
        { error: getRegisterErrorMessage(error?.message) },
        { status: 400 },
      );
    }

    const userId = data.user.id;

    try {
      await upsertProfile(adminClient, {
        id: userId,
        name,
        email,
        role: role as "student" | "parent",
      });
    } catch {
      await adminClient.auth.admin.deleteUser(userId);

      return NextResponse.json(
        { error: "Не удалось создать профиль пользователя" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Не удалось выполнить регистрацию" },
      { status: 500 },
    );
  }
}
