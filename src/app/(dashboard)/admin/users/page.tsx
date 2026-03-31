"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Download,
  Filter,
  GraduationCap,
  Loader2,
  MoreVertical,
  Plus,
  Search,
  Shield,
  Users,
} from "lucide-react";

type UserRole = "student" | "teacher" | "parent" | "admin";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: UserRole | null;
  avatar_url: string | null;
  email_confirmed_at: string | null;
  last_sign_in_at: string | null;
  created_at: string;
  status: "active" | "disabled";
}

const roleMeta: Record<UserRole, { label: string; icon: typeof Users }> = {
  student: { label: "Ученики", icon: GraduationCap },
  teacher: { label: "Учителя", icon: BookOpen },
  parent: { label: "Родители", icon: Users },
  admin: { label: "Админы", icon: Shield },
};

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(value: string | null) {
  if (!value) {
    return "Никогда";
  }

  return new Date(value).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function statusLabel(status: AdminUser["status"]) {
  return status === "active" ? "Активен" : "Отключен";
}

function statusColor(status: AdminUser["status"]) {
  return status === "active"
    ? "bg-green-100 text-green-700"
    : "bg-neutral-200 text-neutral-700";
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | UserRole>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student" as UserRole,
  });

  async function fetchUsers() {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/users");
      const data = (await res.json()) as AdminUser[] | { error?: string };

      if (!res.ok) {
        throw new Error(
          !Array.isArray(data) && data.error ? data.error : "Не удалось загрузить пользователей",
        );
      }

      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось загрузить пользователей");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesTab = activeTab === "all" || user.role === activeTab;
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery, users]);

  const counts = useMemo(
    () => ({
      all: users.length,
      student: users.filter((user) => user.role === "student").length,
      teacher: users.filter((user) => user.role === "teacher").length,
      parent: users.filter((user) => user.role === "parent").length,
      admin: users.filter((user) => user.role === "admin").length,
    }),
    [users],
  );

  async function handleCreateUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        throw new Error(data.error ?? "Не удалось создать пользователя");
      }

      setForm({
        name: "",
        email: "",
        password: "",
        role: "student",
      });
      setIsCreateOpen(false);
      await fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось создать пользователя");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold font-headline text-neutral-900">Пользователи</h1>
          <p className="text-neutral-600 mt-1">Создание и управление учетными записями портала.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Экспорт</span>
          </button>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Добавить</span>
          </button>
        </div>
      </motion.div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">{error}</div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { id: "all" as const, label: "Все", icon: Users, count: counts.all },
          { id: "student" as const, label: "Ученики", icon: GraduationCap, count: counts.student },
          { id: "teacher" as const, label: "Учителя", icon: BookOpen, count: counts.teacher },
          { id: "parent" as const, label: "Родители", icon: Users, count: counts.parent },
          { id: "admin" as const, label: "Админы", icon: Shield, count: counts.admin },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isActive
                  ? "border-purple-500 bg-purple-50 shadow-sm"
                  : "border-neutral-200 bg-white hover:border-purple-200"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-5 h-5 ${isActive ? "text-purple-600" : "text-neutral-500"}`} />
                <span className="text-2xl font-bold text-neutral-900">{item.count}</span>
              </div>
              <p className={`text-sm font-medium ${isActive ? "text-purple-700" : "text-neutral-700"}`}>
                {item.label}
              </p>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[240px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Поиск по имени или email..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white rounded-lg border-2 border-neutral-200 focus:border-purple-500 focus:outline-none transition-all text-sm"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
          <Filter className="w-4 h-4" />
          <span className="text-sm font-medium">Фильтр</span>
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Пользователь</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Роль</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Статус</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Последний вход</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Создан</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center">
                    <Loader2 className="w-6 h-6 text-neutral-400 animate-spin mx-auto" />
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-neutral-500">
                    Пользователи не найдены.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => {
                  const role = user.role ?? "student";
                  const roleInfo = roleMeta[role];

                  return (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 + 0.1 }}
                      className="hover:bg-neutral-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {getInitials(user.name)}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-neutral-900 truncate">{user.name}</p>
                            <p className="text-sm text-neutral-500 truncate">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-neutral-700">{roleInfo.label}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${statusColor(user.status)}`}>
                          {statusLabel(user.status)}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-sm text-neutral-600">{formatDate(user.last_sign_in_at)}</td>
                      <td className="px-5 py-4 text-sm text-neutral-600">{formatDate(user.created_at)}</td>
                      <td className="px-5 py-4">
                        <button className="p-1 hover:bg-neutral-100 rounded transition-colors">
                          <MoreVertical className="w-4 h-4 text-neutral-600" />
                        </button>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {isCreateOpen && (
        <div className="fixed inset-0 z-[70] bg-neutral-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl border border-neutral-200 shadow-2xl p-6">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h2 className="text-xl font-bold font-headline text-neutral-900">Новый пользователь</h2>
                <p className="text-sm text-neutral-500 mt-1">
                  Создайте аккаунт с любой ролью и готовым паролем.
                </p>
              </div>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="px-3 py-1.5 rounded-lg text-sm text-neutral-500 hover:bg-neutral-100"
              >
                Закрыть
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1" htmlFor="name">
                  Имя
                </label>
                <input
                  id="name"
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-purple-500 focus:outline-none transition-colors"
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
                  value={form.email}
                  onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-purple-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1" htmlFor="role">
                    Роль
                  </label>
                  <select
                    id="role"
                    value={form.role}
                    onChange={(event) =>
                      setForm((prev) => ({ ...prev, role: event.target.value as UserRole }))
                    }
                    className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-purple-500 focus:outline-none transition-colors bg-white"
                  >
                    <option value="student">Ученик</option>
                    <option value="teacher">Учитель</option>
                    <option value="parent">Родитель</option>
                    <option value="admin">Администратор</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1" htmlFor="password">
                    Пароль
                  </label>
                  <input
                    id="password"
                    type="password"
                    minLength={6}
                    value={form.password}
                    onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:border-purple-500 focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2.5 rounded-xl bg-purple-600 text-white hover:bg-purple-700 transition-colors disabled:opacity-60"
                >
                  {isSubmitting ? "Создание..." : "Создать пользователя"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
