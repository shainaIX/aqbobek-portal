"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle,
  Plus,
  Download,
  RefreshCw,
  Filter,
} from "lucide-react";

export default function AdminSchedulePage() {

  const scheduleConflicts = [
    { id: 1, type: "room", message: "Кабинет 305 занят двумя классами", time: "Пн 08:30", classes: ["10\"А\"", "10\"Б\""] },
    { id: 2, type: "teacher", message: "Учитель Иванов А.А. назначен на 2 урока", time: "Вт 10:30", classes: ["9\"А\"", "11\"А\""] },
  ];

  const weeklySchedule = {
    "Пн": [
      { time: "08:30 - 09:15", subject: "Алгебра", teacher: "Иванова А.П.", class: "10\"А\"", room: "305" },
      { time: "08:30 - 09:15", subject: "Физика", teacher: "Петров С.М.", class: "10\"Б\"", room: "201" },
      { time: "09:25 - 10:10", subject: "Литература", teacher: "Сидорова Е.В.", class: "9\"А\"", room: "412" },
    ],
    "Вт": [
      { time: "08:30 - 09:15", subject: "Геометрия", teacher: "Иванова А.П.", class: "10\"А\"", room: "305" },
      { time: "09:25 - 10:10", subject: "История", teacher: "Алиев Р.К.", class: "11\"А\"", room: "308" },
    ],
    "Ср": [
      { time: "08:30 - 09:15", subject: "Алгебра", teacher: "Иванова А.П.", class: "10\"А\"", room: "305" },
      { time: "08:30 - 09:15", subject: "Физика", teacher: "Петров С.М.", class: "10\"Б\"", room: "201" },
    ],
    "Чт": [
      { time: "08:30 - 09:15", subject: "Химия", teacher: "Нурсултанова Г.К.", class: "9\"А\"", room: "203" },
    ],
    "Пт": [
      { time: "08:30 - 09:15", subject: "Английский", teacher: "Johnson M.", class: "10\"А\"", room: "215" },
    ],
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
            Smart Schedule
          </h1>
          <p className="text-neutral-600 mt-1">
            Умное управление расписанием
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Фильтр</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm font-medium">Пересчитать</span>
          </button>
        </div>
      </motion.div>

      {scheduleConflicts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-xl p-5"
        >
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="font-headline text-lg font-semibold text-red-900">
                Обнаружено конфликтов: {scheduleConflicts.length}
              </h3>
              <p className="text-sm text-red-700">
                Требуется разрешение перед публикацией расписания
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {scheduleConflicts.map((conflict) => (
              <div key={conflict.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-red-200">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <div>
                    <p className="font-medium text-neutral-900">{conflict.message}</p>
                    <p className="text-sm text-neutral-500">{conflict.time} • {conflict.classes.join(", ")}</p>
                  </div>
                </div>
                <button className="px-3 py-1.5 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors">
                  Исправить
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-neutral-200 p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-6 h-6 text-purple-600" />
            <span className="text-sm text-neutral-600">Всего уроков</span>
          </div>
          <p className="text-3xl font-bold font-headline text-neutral-900">156</p>
          <p className="text-sm text-neutral-500 mt-1">на неделю</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-neutral-200 p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-6 h-6 text-purple-600" />
            <span className="text-sm text-neutral-600">Классов</span>
          </div>
          <p className="text-3xl font-bold font-headline text-neutral-900">22</p>
          <p className="text-sm text-neutral-500 mt-1">1-11 классы</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-neutral-200 p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-6 h-6 text-purple-600" />
            <span className="text-sm text-neutral-600">Учителей</span>
          </div>
          <p className="text-3xl font-bold font-headline text-neutral-900">48</p>
          <p className="text-sm text-neutral-500 mt-1">Активных</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl border border-green-200 p-5 bg-green-50/50"
        >
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <span className="text-sm text-green-600">Без конфликтов</span>
          </div>
          <p className="text-3xl font-bold font-headline text-green-600">94%</p>
          <p className="text-sm text-green-500 mt-1">уроков</p>
        </motion.div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб"].map((day, index) => (
          <button
            key={day}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              index === 0
                ? "bg-purple-500 text-white"
                : "bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
      >
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
          <h3 className="font-headline text-lg font-semibold text-neutral-900">
            Понедельник, 27 Января
          </h3>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
              <Download className="w-4 h-4 text-neutral-600" />
            </button>
            <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
              <Plus className="w-4 h-4 text-neutral-600" />
            </button>
          </div>
        </div>

        <div className="divide-y divide-neutral-100">
          {weeklySchedule["Пн"].map((lesson, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 + 0.6 }}
              className="p-4 hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">{lesson.subject}</p>
                    <div className="flex items-center gap-3 mt-1 text-sm text-neutral-500">
                      <span>{lesson.class}</span>
                      <span>•</span>
                      <span>{lesson.teacher}</span>
                      <span>•</span>
                      <span>Кабинет {lesson.room}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-neutral-900">{lesson.time}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}