"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  Bell,
  Zap
} from "lucide-react";

// Global Stats Component
function GlobalStats() {
  const stats = [
    { icon: Users, label: "Всего учеников", value: "524", trend: "+12 за год", color: "text-purple-600" },
    { icon: Users, label: "Учителей", value: "48", trend: "Активных", color: "text-blue-600" },
    { icon: BookOpen, label: "Классов", value: "22", trend: "1-11 классы", color: "text-green-600" },
    { icon: TrendingUp, label: "Средний балл", value: "4.3", trend: "+0.2 за квартал", color: "text-purple-600" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-neutral-200 p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                <Icon className="w-5 h-5 text-neutral-600" />
              </div>
            </div>
            <p className="text-2xl font-bold font-headline text-neutral-900">{stat.value}</p>
            <p className="text-sm text-neutral-600">{stat.label}</p>
            <p className="text-xs text-neutral-500 mt-1">{stat.trend}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

// Quick Actions Component
function QuickActions() {
  const actions = [
    { icon: Calendar, label: "Сгенерировать расписание", color: "from-purple-500 to-purple-700", href: "/admin/schedule" },
    { icon: Bell, label: "Создать уведомление", color: "from-blue-500 to-blue-700", href: "/admin/notifications" },
    { icon: Users, label: "Добавить пользователя", color: "from-green-500 to-green-700", href: "/admin/users" },
    { icon: BookOpen, label: "Учебный план", color: "from-orange-500 to-orange-700", href: "/admin/analytics" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5 mb-6"
    >
      <h3 className="font-headline text-lg font-semibold text-neutral-900 mb-4">
        Быстрые действия
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <a
              key={action.label}
              href={action.href}
              className="group p-4 rounded-xl bg-neutral-50 hover:bg-neutral-100 transition-all"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm font-medium text-neutral-900">{action.label}</p>
            </a>
          );
        })}
      </div>
    </motion.div>
  );
}

// Attendance Overview Component
function AttendanceOverview() {
  const todayStats = {
    total: 524,
    present: 498,
    absent: 26,
    rate: 95,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden mb-6"
    >
      <div className="flex items-center justify-between p-5 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold text-neutral-900">
              Посещаемость сегодня
            </h3>
            <p className="text-xs text-neutral-500">26 Января 2025</p>
          </div>
        </div>
        <span className="text-3xl font-bold font-headline text-green-600">
          {todayStats.rate}%
        </span>
      </div>

      <div className="grid grid-cols-3 divide-x divide-neutral-200">
        <div className="p-5 text-center">
          <p className="text-2xl font-bold text-neutral-900">{todayStats.total}</p>
          <p className="text-sm text-neutral-500 mt-1">Всего</p>
        </div>
        <div className="p-5 text-center">
          <p className="text-2xl font-bold text-green-600">{todayStats.present}</p>
          <p className="text-sm text-neutral-500 mt-1">Присутствуют</p>
        </div>
        <div className="p-5 text-center">
          <p className="text-2xl font-bold text-red-600">{todayStats.absent}</p>
          <p className="text-sm text-neutral-500 mt-1">Отсутствуют</p>
        </div>
      </div>
    </motion.div>
  );
}

// Recent Alerts Component
function RecentAlerts() {
  const alerts = [
    { id: 1, type: "schedule", message: "Конфликт расписания: 10\"А\" Физика", time: "10 мин назад", priority: "high" },
    { id: 2, type: "attendance", message: "Низкая посещаемость в 9\"Б\" (82%)", time: "1 час назад", priority: "medium" },
    { id: 3, type: "system", message: "Обновление системы запланировано на 28.01", time: "2 часа назад", priority: "low" },
    { id: 4, type: "grade", message: "Массовое выставление оценок: 11 классы", time: "3 часа назад", priority: "medium" },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-700";
      case "medium": return "bg-yellow-100 text-yellow-700";
      default: return "bg-blue-100 text-blue-700";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
    >
      <div className="flex items-center justify-between p-5 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-white" />
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
            transition={{ delay: 0.7 + index * 0.05 }}
            className="p-4 hover:bg-neutral-50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                  alert.priority === "high" ? "text-red-500" :
                  alert.priority === "medium" ? "text-yellow-500" :
                  "text-blue-500"
                }`} />
                <div>
                  <p className="text-sm font-medium text-neutral-900">{alert.message}</p>
                  <p className="text-xs text-neutral-500 mt-1">{alert.time}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${getPriorityColor(alert.priority)}`}>
                {alert.priority === "high" ? "Важно" : alert.priority === "medium" ? "Средний" : "Норма"}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Class Performance Overview
function ClassPerformance() {
  const classes = [
    { name: "11\"А\"", students: 21, avgGpa: 4.5, attendance: 98, rank: 1 },
    { name: "10\"А\"", students: 25, avgGpa: 4.2, attendance: 94, rank: 2 },
    { name: "9\"А\"", students: 27, avgGpa: 4.0, attendance: 96, rank: 3 },
    { name: "10\"Б\"", students: 23, avgGpa: 3.9, attendance: 91, rank: 4 },
    { name: "8\"Б\"", students: 24, avgGpa: 3.7, attendance: 89, rank: 5 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
    >
      <div className="flex items-center justify-between p-5 border-b border-neutral-200">
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
              <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase">#</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Класс</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Учеников</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Средний балл</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Посещаемость</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {classes.map((cls, index) => (
              <motion.tr
                key={cls.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.05 }}
                className="hover:bg-neutral-50"
              >
                <td className="px-5 py-4">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    cls.rank === 1 ? "bg-yellow-100 text-yellow-700" :
                    cls.rank === 2 ? "bg-neutral-200 text-neutral-700" :
                    cls.rank === 3 ? "bg-orange-100 text-orange-700" :
                    "bg-neutral-100 text-neutral-600"
                  }`}>
                    {cls.rank}
                  </div>
                </td>
                <td className="px-5 py-4 text-sm font-medium text-neutral-900">{cls.name}</td>
                <td className="px-5 py-4 text-sm text-neutral-600">{cls.students}</td>
                <td className="px-5 py-4">
                  <span className="text-sm font-bold text-neutral-900">{cls.avgGpa}</span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          cls.attendance >= 95 ? "bg-green-500" :
                          cls.attendance >= 90 ? "bg-yellow-500" :
                          "bg-red-500"
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
    </motion.div>
  );
}

// Main Page Component
export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold font-headline text-neutral-900">
          Панель администратора 🛡
        </h1>
        <p className="text-neutral-600 mt-1">
          Глобальный обзор по школе Aqbobek Lyceum
        </p>
      </motion.div>

      {/* Global Stats */}
      <GlobalStats />

      {/* Quick Actions */}
      <QuickActions />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance */}
        <AttendanceOverview />
        
        {/* Recent Alerts */}
        <RecentAlerts />
      </div>

      {/* Class Performance */}
      <ClassPerformance />
    </div>
  );
}