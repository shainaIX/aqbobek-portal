"use client";

import { motion } from "framer-motion";
import {
  AlertCircle,
  Bell,
  BookOpen,
  Calendar,
  CheckCircle,
  Monitor,
  TrendingUp,
  Users,
} from "lucide-react";

function GlobalStats() {
  const stats = [
    { icon: Users, label: "Всего учеников", value: "524", trend: "+12 за год" },
    { icon: Users, label: "Учителей", value: "48", trend: "Активных" },
    { icon: BookOpen, label: "Классов", value: "22", trend: "1-11 классы" },
    { icon: TrendingUp, label: "Средний балл", value: "4.3", trend: "+0.2 за квартал" },
  ];

  return (
    <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="rounded-xl border border-neutral-200 bg-white p-5"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100">
              <Icon className="h-5 w-5 text-neutral-600" />
            </div>
            <p className="font-headline text-2xl font-bold text-neutral-900">{stat.value}</p>
            <p className="text-sm text-neutral-600">{stat.label}</p>
            <p className="mt-1 text-xs text-neutral-500">{stat.trend}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

function QuickActions() {
  const actions = [
    {
      icon: Calendar,
      label: "Расписание",
      color: "from-purple-500 to-purple-700",
      href: "/admin/schedule",
    },
    {
      icon: Bell,
      label: "Уведомления",
      color: "from-blue-500 to-blue-700",
      href: "/admin/notifications",
    },
    {
      icon: Users,
      label: "Пользователи",
      color: "from-green-500 to-green-700",
      href: "/admin/users",
    },
    {
      icon: BookOpen,
      label: "Аналитика",
      color: "from-orange-500 to-orange-700",
      href: "/admin/analytics",
    },
    {
      icon: Monitor,
      label: "Kiosk mode",
      color: "from-amber-400 to-amber-600",
      href: "/admin/kiosk",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-6 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm"
    >
      <h2 className="mb-4 font-headline text-lg font-semibold text-neutral-900">
        Быстрые действия
      </h2>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <a
              key={action.label}
              href={action.href}
              className="group rounded-xl bg-neutral-50 p-4 transition-all hover:bg-neutral-100"
            >
              <div
                className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${action.color} transition-transform group-hover:scale-110`}
              >
                <Icon className="h-6 w-6 text-white" />
              </div>
              <p className="text-sm font-medium text-neutral-900">{action.label}</p>
            </a>
          );
        })}
      </div>
    </motion.section>
  );
}

function AttendanceOverview() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.28 }}
      className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-neutral-200 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-400 to-green-600">
            <CheckCircle className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold text-neutral-900">
              Посещаемость сегодня
            </h3>
            <p className="text-xs text-neutral-500">31 марта 2026</p>
          </div>
        </div>
        <span className="font-headline text-3xl font-bold text-green-600">95%</span>
      </div>

      <div className="grid grid-cols-3 divide-x divide-neutral-200">
        <div className="p-5 text-center">
          <p className="text-2xl font-bold text-neutral-900">524</p>
          <p className="mt-1 text-sm text-neutral-500">Всего</p>
        </div>
        <div className="p-5 text-center">
          <p className="text-2xl font-bold text-green-600">498</p>
          <p className="mt-1 text-sm text-neutral-500">Присутствуют</p>
        </div>
        <div className="p-5 text-center">
          <p className="text-2xl font-bold text-red-600">26</p>
          <p className="mt-1 text-sm text-neutral-500">Отсутствуют</p>
        </div>
      </div>
    </motion.section>
  );
}

function RecentAlerts() {
  const alerts = [
    { id: 1, message: 'Конфликт расписания: 10 "A" Физика', time: "10 мин назад", priority: "high" },
    { id: 2, message: 'Низкая посещаемость в 9 "B" (82%)', time: "1 час назад", priority: "medium" },
    { id: 3, message: "Обновление системы запланировано на вечер", time: "2 часа назад", priority: "low" },
    { id: 4, message: "Открыт kiosk mode для школьного экрана", time: "Сегодня", priority: "medium" },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.36 }}
      className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-neutral-200 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-400 to-purple-600">
            <AlertCircle className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold text-neutral-900">
              Последние уведомления
            </h3>
            <p className="text-xs text-neutral-500">{alerts.length} новых</p>
          </div>
        </div>
        <a href="/admin/notifications" className="text-sm font-medium text-purple-600 hover:text-purple-700">
          Все →
        </a>
      </div>

      <div className="divide-y divide-neutral-100">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.44 + index * 0.05 }}
            className="p-4 transition-colors hover:bg-neutral-50"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-neutral-900">{alert.message}</p>
                <p className="mt-1 text-xs text-neutral-500">{alert.time}</p>
              </div>
              <span className={`rounded-full px-2 py-1 text-xs font-bold ${getPriorityColor(alert.priority)}`}>
                {alert.priority === "high" ? "Важно" : alert.priority === "medium" ? "Средний" : "Норма"}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function ClassPerformance() {
  const classes = [
    { name: '11 "A"', students: 21, avgGpa: 4.5, attendance: 98, rank: 1 },
    { name: '10 "A"', students: 25, avgGpa: 4.2, attendance: 94, rank: 2 },
    { name: '9 "A"', students: 27, avgGpa: 4.0, attendance: 96, rank: 3 },
    { name: '10 "B"', students: 23, avgGpa: 3.9, attendance: 91, rank: 4 },
    { name: '8 "B"', students: 24, avgGpa: 3.7, attendance: 89, rank: 5 },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.52 }}
      className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm"
    >
      <div className="flex items-center justify-between border-b border-neutral-200 p-5">
        <h3 className="font-headline text-lg font-semibold text-neutral-900">
          Топ классов по успеваемости
        </h3>
        <a href="/admin/analytics" className="text-sm font-medium text-purple-600 hover:text-purple-700">
          Полная аналитика →
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase text-neutral-500">#</th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase text-neutral-500">Класс</th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase text-neutral-500">Учеников</th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase text-neutral-500">Средний балл</th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase text-neutral-500">Посещаемость</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {classes.map((cls, index) => (
              <motion.tr
                key={cls.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.04 }}
                className="hover:bg-neutral-50"
              >
                <td className="px-5 py-4">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                      cls.rank === 1
                        ? "bg-yellow-100 text-yellow-700"
                        : cls.rank === 2
                          ? "bg-neutral-200 text-neutral-700"
                          : cls.rank === 3
                            ? "bg-orange-100 text-orange-700"
                            : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {cls.rank}
                  </div>
                </td>
                <td className="px-5 py-4 text-sm font-medium text-neutral-900">{cls.name}</td>
                <td className="px-5 py-4 text-sm text-neutral-600">{cls.students}</td>
                <td className="px-5 py-4 text-sm font-bold text-neutral-900">{cls.avgGpa}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-16 overflow-hidden rounded-full bg-neutral-100">
                      <div
                        className={`h-full rounded-full ${
                          cls.attendance >= 95
                            ? "bg-green-500"
                            : cls.attendance >= 90
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                        style={{ width: `${cls.attendance}%` }}
                      />
                    </div>
                    <span className="text-sm text-neutral-600">{cls.attendance}%</span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  );
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-headline text-2xl font-bold text-neutral-900">
          Панель администратора
        </h1>
        <p className="mt-1 text-neutral-600">
          Глобальный обзор по школе Aqbobek Lyceum
        </p>
      </motion.div>

      <GlobalStats />
      <QuickActions />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AttendanceOverview />
        <RecentAlerts />
      </div>

      <ClassPerformance />
    </div>
  );
}
