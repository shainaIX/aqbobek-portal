"use client";

import { motion } from "framer-motion";
import {
  Bell,
  Send,
  Users,
  Calendar,
  AlertCircle,
  Search,
  Filter
} from "lucide-react";

export default function AdminNotificationsPage() {
  const notifications = [
    {
      id: 1,
      title: "Обновление расписания",
      message: "Изменения в расписании на 28-30 января",
      target: "10-11 классы",
      date: "26.01.2025",
      status: "sent",
      type: "schedule",
    },
    {
      id: 2,
      title: "Родительское собрание",
      message: "Общешкольное собрание 5 февраля в 18:00",
      target: "Все родители",
      date: "25.01.2025",
      status: "sent",
      type: "event",
    },
    {
      id: 3,
      title: "Технические работы",
      message: "Портал будет недоступен 28 января с 02:00 до 04:00",
      target: "Все пользователи",
      date: "24.01.2025",
      status: "scheduled",
      type: "system",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent": return "bg-green-100 text-green-700";
      case "scheduled": return "bg-blue-100 text-blue-700";
      case "draft": return "bg-neutral-100 text-neutral-700";
      default: return "bg-neutral-100 text-neutral-700";
    }
  };

  return (
    <div className="space-y-6">

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold font-headline text-neutral-900">
            Центр уведомлений
          </h1>
          <p className="text-neutral-600 mt-1">
            Создание и управление уведомлениями
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="text-sm font-medium">Создать уведомление</span>
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-6 text-white shadow-lg"
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Send className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold font-headline mb-2">
              Быстрое уведомление
            </h3>
            <p className="text-purple-100 text-sm mb-4">
              Отправьте сообщение выбранным пользователям
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <select className="px-4 py-2.5 bg-white/20 text-white rounded-lg border border-white/30 text-sm focus:outline-none focus:border-white">
                <option value="general">Общее</option>
                <option value="schedule">Расписание</option>
                <option value="event">Мероприятие</option>
                <option value="system">Системное</option>
              </select>

              <select className="px-4 py-2.5 bg-white/20 text-white rounded-lg border border-white/30 text-sm focus:outline-none focus:border-white">
                <option>Все пользователи</option>
                <option>Только ученики</option>
                <option>Только учителя</option>
                <option>Только родители</option>
                <option>10-11 классы</option>
                <option>9 классы</option>
              </select>
            </div>

            <textarea
              placeholder="Текст уведомления..."
              className="w-full px-4 py-3 bg-white/20 text-white placeholder:text-purple-200 rounded-lg border border-white/30 text-sm focus:outline-none focus:border-white resize-none"
              rows={3}
            />

            <div className="flex flex-wrap gap-2 mt-4">
              <button className="px-4 py-2.5 bg-white text-purple-700 font-medium rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2">
                <Send className="w-4 h-4" />
                Отправить
              </button>
              <button className="px-4 py-2.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Запланировать
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
      >
        <div className="flex items-center justify-between p-5 border-b border-neutral-200">
          <h3 className="font-headline text-lg font-semibold text-neutral-900">
            История уведомлений
          </h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Поиск..."
                className="pl-10 pr-4 py-2 bg-neutral-100 rounded-lg border-2 border-transparent focus:border-purple-500 focus:bg-white focus:outline-none transition-all text-sm"
              />
            </div>
            <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
              <Filter className="w-4 h-4 text-neutral-600" />
            </button>
          </div>
        </div>

        <div className="divide-y divide-neutral-100">
          {notifications.map((notif, index) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="p-4 hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    notif.type === "schedule" ? "bg-blue-100" :
                    notif.type === "event" ? "bg-green-100" :
                    "bg-purple-100"
                  }`}>
                    {notif.type === "schedule" ? <Calendar className="w-5 h-5 text-blue-600" /> :
                     notif.type === "event" ? <Bell className="w-5 h-5 text-green-600" /> :
                     <AlertCircle className="w-5 h-5 text-purple-600" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">{notif.title}</h4>
                    <p className="text-sm text-neutral-600 mt-1">{notif.message}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-neutral-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {notif.target}
                      </span>
                      <span>•</span>
                      <span>{notif.date}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(notif.status)}`}>
                  {notif.status === "sent" ? "Отправлено" : notif.status === "scheduled" ? "Запланировано" : "Черновик"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}