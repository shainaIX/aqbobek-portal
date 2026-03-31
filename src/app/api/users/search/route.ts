import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type UserRole = "student" | "teacher" | "parent" | "admin";

const searchableRolesByUser: Record<UserRole, UserRole[]> = {
  student: ["teacher", "student"],
  teacher: ["student", "parent", "teacher", "admin"],
  parent: ["teacher", "admin"],
  admin: ["student", "parent", "teacher", "admin"],
};

export async function GET(req: Request) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || !profile?.role) {
    return NextResponse.json({ error: "User profile is unavailable" }, { status: 403 });
  }

  const currentRole = profile.role as UserRole;
  const allowedRoles = searchableRolesByUser[currentRole] ?? [];
  const url = new URL(req.url);
  const requestedRoles = (url.searchParams.get("roles") ?? "")
    .split(",")
    .map((role) => role.trim())
    .filter(Boolean) as UserRole[];
  const query = url.searchParams.get("q")?.trim() ?? "";
  const limitValue = Number(url.searchParams.get("limit") ?? "20");
  const limit = Number.isFinite(limitValue) ? Math.min(Math.max(limitValue, 1), 50) : 20;

  const effectiveRoles =
    requestedRoles.length > 0
      ? requestedRoles.filter((role) => allowedRoles.includes(role))
      : allowedRoles;

  if (effectiveRoles.length === 0) {
    return NextResponse.json([]);
  }

  let request = supabase
    .from("profiles")
    .select("id, name, role, avatar_url")
    .neq("id", user.id)
    .in("role", effectiveRoles)
    .order("name", { ascending: true })
    .limit(limit);

  if (query) {
    request = request.ilike("name", `%${query}%`);
  }

  const { data, error } = await request;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}
