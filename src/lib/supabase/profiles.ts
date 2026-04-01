import type { SupabaseClient, User as SupabaseUser } from "@supabase/supabase-js";

export type UserRole = "student" | "teacher" | "parent" | "admin";

interface LegacyProfileRow {
  id: string;
  name: string | null;
  role: string | null;
  avatar_url: string | null;
}

interface CurrentProfileRow {
  id: string;
  full_name: string | null;
  email: string | null;
  role: string | null;
}

export interface ResolvedProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole | null;
  avatarUrl: string | null;
}

export function isUserRole(value: unknown): value is UserRole {
  return (
    value === "student" ||
    value === "teacher" ||
    value === "parent" ||
    value === "admin"
  );
}

export function getRoleFromMetadata(user: Pick<SupabaseUser, "user_metadata">) {
  const role = user.user_metadata?.role;
  return isUserRole(role) ? role : null;
}

export function getNameFromSources(
  user: Pick<SupabaseUser, "email" | "user_metadata">,
  profile?: {
    name?: string | null;
    full_name?: string | null;
    email?: string | null;
  },
) {
  const candidates = [
    profile?.name,
    profile?.full_name,
    typeof user.user_metadata?.name === "string" ? user.user_metadata.name : null,
    profile?.email,
    user.email,
  ];

  for (const candidate of candidates) {
    const value = candidate?.trim();
    if (!value) {
      continue;
    }

    return value.includes("@") ? value.split("@")[0] : value;
  }

  return "Пользователь";
}

function isMissingColumnError(message?: string) {
  return typeof message === "string" && /column .* does not exist/i.test(message);
}

export async function getProfileById(
  client: SupabaseClient,
  user: Pick<SupabaseUser, "id" | "email" | "user_metadata">,
): Promise<ResolvedProfile> {
  const legacyResult = await client
    .from("profiles")
    .select("id, name, role, avatar_url")
    .eq("id", user.id)
    .maybeSingle<LegacyProfileRow>();

  if (!legacyResult.error) {
    return {
      id: user.id,
      name: getNameFromSources(user, legacyResult.data ?? undefined),
      email: user.email ?? "",
      role: isUserRole(legacyResult.data?.role)
        ? legacyResult.data.role
        : getRoleFromMetadata(user),
      avatarUrl: legacyResult.data?.avatar_url ?? null,
    };
  }

  if (!isMissingColumnError(legacyResult.error.message)) {
    throw new Error(legacyResult.error.message);
  }

  const currentResult = await client
    .from("profiles")
    .select("id, full_name, email, role")
    .eq("id", user.id)
    .maybeSingle<CurrentProfileRow>();

  if (currentResult.error) {
    throw new Error(currentResult.error.message);
  }

  return {
    id: user.id,
    name: getNameFromSources(user, currentResult.data ?? undefined),
    email: currentResult.data?.email ?? user.email ?? "",
    role: isUserRole(currentResult.data?.role)
      ? currentResult.data.role
      : getRoleFromMetadata(user),
    avatarUrl: null,
  };
}

export async function upsertProfile(
  client: SupabaseClient,
  input: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  },
) {
  const legacyResult = await client.from("profiles").upsert({
    id: input.id,
    name: input.name,
    role: input.role,
    avatar_url: null,
  });

  if (!legacyResult.error) {
    return;
  }

  if (!isMissingColumnError(legacyResult.error.message)) {
    throw new Error(legacyResult.error.message);
  }

  const currentResult = await client.from("profiles").upsert({
    id: input.id,
    full_name: input.name,
    email: input.email,
    role: input.role,
  });

  if (currentResult.error) {
    throw new Error(currentResult.error.message);
  }
}
