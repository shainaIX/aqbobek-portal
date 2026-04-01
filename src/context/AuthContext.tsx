"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { getProfileById, type UserRole } from "@/lib/supabase/profiles";

export type { UserRole } from "@/lib/supabase/profiles";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  avatarUrl?: string | null;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";

  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function buildUser(
  session: Session,
  profile: Awaited<ReturnType<typeof getProfileById>>,
): User | null {
  if (!profile.email || !profile.role) {
    return null;
  }

  return {
    id: session.user.id,
    email: profile.email,
    role: profile.role,
    name: profile.name,
    avatar: getInitials(profile.name),
    avatarUrl: profile.avatarUrl,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function loadUser(session: Session | null) {
    if (!session) {
      setUser(null);
      return null;
    }

    const profile = await getProfileById(supabase, session.user);
    const nextUser = buildUser(session, profile);

    if (!nextUser) {
      throw new Error("Роль пользователя не настроена");
    }

    setUser(nextUser);
    return nextUser;
  }

  useEffect(() => {
    let isMounted = true;

    async function bootstrap() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!isMounted) return;
        await loadUser(session);
      } catch {
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void bootstrap();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      void (async () => {
        try {
          await loadUser(session);
        } catch {
          setUser(null);
        } finally {
          setIsLoading(false);
        }
      })();
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error("Неверный email или пароль");
      }

      const nextUser = await loadUser(data.session);

      if (!nextUser) {
        throw new Error("Не удалось загрузить профиль пользователя");
      }

      return nextUser;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw new Error("Не удалось выйти из системы");
      }

      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
