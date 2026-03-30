"use client";

import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react";

export default function TeacherSchedulePage() {
  const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const currentDay = 2; // Среда

  const schedule = {
    "Пн": [
      { time: "08:30 - 09:15", subject: "Алгебра", class: "10\"А\"", room: "305" },
      { time: "09:25 - 10:10", subject: "Геометрия", class: "10\"Б\"", room: "305" },
      { time: "10:30 - 11:15", subject: "Алгебра", class: "9\"А\"", room: "305" },
    ],
    "Вт": [
      { time: "08:30 - 09:15", subject: "Факультатив", class: "11\"А\"", room: "305" },
      { time: "09:25 - 10:10", subject: "Алгебра", class: "10\"А\"", room: "305" },
    ],
    "Ср": [
      { time: "08:30 - 09:15", subject: "Алгебра", class: "10\"А\"", room: "305" },
      { time: "09:25 - 10:10", subject: "Геометрия", class: "10\"Б\"", room: "305" },
      { time: "10:30 - 11:15", subject: "Алгебра", class: "9\"А\"", room: "305" },
      { time: "11:35 - 12:20", subject: "Факультатив", class: "11\"А\"", room: "305" },
    ],
    "Чт": [
      { time: "08:30 - 09:15", subject: "Геометрия", class: "10\"Б\"", room: "305" },
      { time: "09:25 - 10:10", subject: "Алгебра", class: "9\"А\"", room: "305" },
    ],
    "Пт": [
      { time: "08:30 - 09:15", subject: "Алгебра", class: "10\"А\"", room: "305" },
      { time: "09:25 - 10:10", subject: "Алгебра", class: "11\"А\"", room: "305" },
      { time: "10:30 - 11:15", subject: "Геометрия", class: "10\"Б\"", room: "305" },
    ],
    "Сб": [],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold font-headline text-neutral-900">
            Расписание
          </h1>
          <p className="text-neutral-600 mt-1">
            Ваше недельное расписание уроков
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-neutral-200">
            <Calendar className="w-4 h-4 text-neutral-500" />
            <span className="text-sm font-medium">20-26 Января 2025</span>
          </div>
          <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Week Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {weekDays.map((day, index) => (
          <button
            key={day}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              index === currentDay
                ? "bg-secondary-500 text-white"
                : "bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Today's Schedule */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
      >
        <div className="p-5 border-b border-neutral-200">
          <h3 className="font-headline text-lg font-semibold text-neutral-900">
            Среда, 22 Января
          </h3>
          <p className="text-sm text-neutral-500 mt-1">4 урока • 08:30 - 12:20</p>
        </div>

        <div className="divide-y divide-neutral-100">
          {schedule["Ср"].map((lesson, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="p-4 hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-secondary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">{lesson.subject}</p>
                    <div className="flex items-center gap-3 mt-1 text-sm text-neutral-500">
                      <span>{lesson.class}</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        Кабинет {lesson.room}
                      </span>
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