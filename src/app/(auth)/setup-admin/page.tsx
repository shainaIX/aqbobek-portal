"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Loader2 } from "lucide-react";

export default function SetupAdminPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [canBootstrap, setCanBootstrap] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch("/api/auth/bootstrap-admin");
        const data = (await res.json()) as { can_bootstrap?: boolean; error?: string };

        if (!res.ok) {
          throw new Error(data.error ?? "Не удалось проверить наличие администратора");
        }

        setCanBootstrap(Boolean(data.can_bootstrap));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Не удалось проверить наличие администратора");
      } finally {
        setIsChecking(false);
      }
    })();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(false);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/bootstrap-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "Не удалось создать администратора");
      }

      setSuccess(true);
      setTimeout(() => router.push("/login"), 1200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось создать администратора");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-tertiary-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl border border-neutral-200 shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 text-white flex items-center justify-center shadow-lg">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-headline text-neutral-900">Первый администратор</h1>
            <p className="text-sm text-neutral-500">Одноразовая настройка доступа</p>
          </div>
        </div>

        {isChecking ? (
          <div className="py-12 flex justify-center">
            <Loader2 className="w-6 h-6 text-neutral-400 animate-spin" />
          </div>
        ) : !canBootstrap ? (
          <div className="space-y-4">
            <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">
              Администратор уже существует. Новых пользователей теперь нужно создавать из админки.
            </div>
            <Link
              href="/login"
              className="block w-full text-center px-4 py-3 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
            >
              Перейти ко входу
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1" htmlFor="name">
                Имя
              </label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="Анна Петровна Иванова"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="admin@school.kz"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1" htmlFor="password">
                Пароль
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="Не менее 6 символов"
                minLength={6}
                required
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                Администратор создан. Перенаправляю на страницу входа.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-4 py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors disabled:opacity-60"
            >
              {isSubmitting ? "Создание..." : "Создать администратора"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
