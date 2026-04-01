import "server-only";
import { adminClient } from "@/lib/supabase/admin";
import { upsertProfile } from "@/lib/supabase/profiles";

export type ManagedUserRole = "student" | "teacher" | "parent" | "admin";

interface CreateManagedUserInput {
  name: string;
  email: string;
  password: string;
  role: ManagedUserRole;
}

export function getManagedUserErrorMessage(message?: string) {
  if (!message) {
    return "Не удалось создать пользователя";
  }

  if (message === "A user with this email address has already been registered") {
    return "Пользователь с таким email уже существует";
  }

  if (message === "Database error creating new user") {
    return "Supabase не смог создать auth-пользователя. Проверьте trigger/function и обязательные поля в profiles.";
  }

  return message;
}

export async function createManagedUser({
  name,
  email,
  password,
  role,
}: CreateManagedUserInput) {
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
    throw new Error(getManagedUserErrorMessage(error?.message));
  }

  const userId = data.user.id;

  try {
    await upsertProfile(adminClient, {
      id: userId,
      name,
      email,
      role,
    });
  } catch {
    await adminClient.auth.admin.deleteUser(userId);
    throw new Error("Не удалось создать профиль пользователя");
  }

  return data.user;
}
