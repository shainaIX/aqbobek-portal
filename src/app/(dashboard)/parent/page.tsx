"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Calendar, 
  MessageSquare, 
  Award,
  User,
  ChevronDown,
  AlertCircle,
  CheckCircle,
  Clock
} from "lucide-react";
import { useState } from "react";

// Child Selector Component
function ChildSelector() {
  const [selectedChild, setSelectedChild] = useState(0);
  
  const children = [
    { id: 1, name: "Алишер Иманалиев", class: "10\"А\"", avatar: "АИ" },
    { id: 2, name: "Амина Иманалиева", class: "8\"Б\"", avatar: "АИ" },
  ];

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-4 mb-6">
      <label className="block text-sm font-medium text-neutral-700 mb-2">
        Выберите ребенка
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {children.map((child, index) => (
          <button
            key={child.id}
            onClick={() => setSelectedChild(index)}
            className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
              selectedChild === index
                ? "border-tertiary-500 bg-tertiary-50"
                : "border-neutral-200 hover:border-neutral-300"
            }`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
              selectedChild === index
                ? "bg-gradient-to-br from-tertiary-400 to-tertiary-600"
                : "bg-neutral-300"
            }`}>
              {child.avatar}
            </div>
            <div className="text-left">
              <p className={`font-medium ${
                selectedChild === index ? "text-tertiary-900" : "text-neutral-900"
              }`}>
                {child.name}
              </p>
              <p className="text-sm text-neutral-500">{child.class}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// AI Weekly Summary Component
function AIWeeklySummary() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-tertiary-500 to-tertiary-600 rounded-xl p-6 text-white shadow-lg"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
          <MessageSquare className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold font-headline mb-1">
            AI-выжимка за неделю
          </h3>
          <p className="text-tertiary-100 text-sm">
            20 - 26 Января 2025
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0 mt-0.5" />
          <p className="text-sm">
            <span className="font-semibold">Отлично:</span> Алишер молодец в алгебре — получил 5 за контрольную работу
          </p>
        </div>
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
          <p className="text-sm">
            <span className="font-semibold">Внимание:</span> Пропустил 2 урока истории без уважительной причины
          </p>
        </div>
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
          <p className="text-sm">
            <span className="font-semibold">Рекомендация:</span> Обсудите тайм-менеджмент и важность посещения всех уроков
          </p>
        </div>
      </div>

      <button className="mt-4 w-full py-3 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors">
        Подробнее →
      </button>
    </motion.div>
  );
}

// Quick Stats Component
function QuickStats() {
  const stats = [
    { icon: TrendingUp, label: "Средний балл", value: "4.6", trend: "+0.2", color: "text-green-600" },
    { icon: Calendar, label: "Пропусков", value: "2", trend: "на этой неделе", color: "text-yellow-600" },
    { icon: MessageSquare, label: "Сообщений", value: "5", trend: "новых", color: "text-blue-600" },
    { icon: Award, label: "Достижений", value: "3", trend: "в этом месяце", color: "text-purple-600" },
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
            className="bg-white rounded-xl border border-neutral-200 p-4"
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

// Recent Grades Component
function RecentGrades() {
  const grades = [
    { subject: "Алгебра", topic: "Квадратные уравнения", grade: 5, date: "24.01" },
    { subject: "Физика", topic: "Законы Ньютона", grade: 4, date: "23.01" },
    { subject: "Литература", topic: "Сочинение", grade: 5, date: "22.01" },
    { subject: "История", topic: "Тест", grade: 3, date: "21.01" },
  ];

  const getGradeColor = (grade: number) => {
    switch (grade) {
      case 5: return "bg-green-100 text-green-700";
      case 4: return "bg-blue-100 text-blue-700";
      case 3: return "bg-yellow-100 text-yellow-700";
      default: return "bg-red-100 text-red-700";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
    >
      <div className="flex items-center justify-between p-5 border-b border-neutral-200">
        <h3 className="font-headline text-lg font-semibold text-neutral-900">
          Последние оценки
        </h3>
        <a href="/parent/grades" className="text-sm font-medium text-tertiary-600 hover:text-tertiary-700">
          Все →
        </a>
      </div>
      <div className="divide-y divide-neutral-100">
        {grades.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.05 }}
            className="flex items-center justify-between p-4 hover:bg-neutral-50"
          >
            <div>
              <p className="font-medium text-neutral-900">{item.subject}</p>
              <p className="text-sm text-neutral-500">{item.topic}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-neutral-500">{item.date}</span>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${getGradeColor(item.grade)}`}>
                {item.grade}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Attendance Alert Component
function AttendanceAlert() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
          <Calendar className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-headline text-lg font-semibold text-neutral-900">
            Посещаемость
          </h3>
          <p className="text-xs text-neutral-500">Январь 2025</p>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {Array.from({ length: 31 }).map((_, i) => {
          const day = i + 1;
          const isAbsent = [15, 22].includes(day);
          const isToday = day === 26;
          
          return (
            <div
              key={i}
              className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium ${
                isToday
                  ? "bg-tertiary-500 text-white"
                  : isAbsent
                  ? "bg-red-100 text-red-600"
                  : "bg-neutral-100 text-neutral-600"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-neutral-100" />
            <span className="text-neutral-500">Присутствовал</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-red-100" />
            <span className="text-neutral-500">Пропустил</span>
          </div>
        </div>
        <a href="/parent/attendance" className="text-tertiary-600 font-medium">
          Подробнее →
        </a>
      </div>
    </motion.div>
  );
}

// Messages Preview Component
function MessagesPreview() {
  const messages = [
    {
      teacher: "Иванова А.П.",
      subject: "Алгебра",
      message: "Алишер отлично справился с контрольной...",
      time: "2 часа назад",
      unread: true,
    },
    {
      teacher: "Петров С.М.",
      subject: "Физика",
      message: "Прошу обсудить с сыном пропущенный урок...",
      time: "Вчера",
      unread: true,
    },
    {
      teacher: "Сидорова Е.В.",
      subject: "Литература",
      message: "Благодарю за помощь в организации мероприятия...",
      time: "23.01",
      unread: false,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
    >
      <div className="flex items-center justify-between p-5 border-b border-neutral-200">
        <h3 className="font-headline text-lg font-semibold text-neutral-900">
          Сообщения от учителей
        </h3>
        <a href="/parent/messages" className="text-sm font-medium text-tertiary-600 hover:text-tertiary-700">
          Все ({messages.length}) →
        </a>
      </div>
      <div className="divide-y divide-neutral-100">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className={`p-4 hover:bg-neutral-50 cursor-pointer ${
              msg.unread ? "bg-tertiary-50/50" : ""
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center text-xs font-bold">
                  {msg.teacher[0]}
                </div>
                <div>
                  <p className="font-medium text-neutral-900">{msg.teacher}</p>
                  <p className="text-xs text-neutral-500">{msg.subject}</p>
                </div>
              </div>
              {msg.unread && (
                <div className="w-2 h-2 bg-tertiary-500 rounded-full" />
              )}
            </div>
            <p className="text-sm text-neutral-600 mb-2">{msg.message}</p>
            <p className="text-xs text-neutral-400">{msg.time}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Main Page Component
export default function ParentDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold font-headline text-neutral-900">
          Добро пожаловать! 👋
        </h1>
        <p className="text-neutral-600 mt-1">
          Обзор успеваемости ваших детей
        </p>
      </motion.div>

      {/* Child Selector */}
      <ChildSelector />

      {/* AI Weekly Summary */}
      <AIWeeklySummary />

      {/* Quick Stats */}
      <QuickStats />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Grades */}
        <RecentGrades />
        
        {/* Attendance */}
        <AttendanceAlert />
      </div>

      {/* Messages */}
      <MessagesPreview />
    </div>
  );
}