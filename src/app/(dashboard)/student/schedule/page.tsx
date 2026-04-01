"use client";

import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import ScheduleList from "@/components/dashboard/student/ScheduleList";

export default function SchedulePage() {
  const currentWeek = "20-26 Января 2025";

  return (
    <div className="space-y-6">

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
            Полное расписание уроков на неделю
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-neutral-200">
            <Calendar className="w-4 h-4 text-neutral-500" />
            <span className="text-sm font-medium">{currentWeek}</span>
          </div>
          <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб"].map((day, index) => (
          <button
            key={day}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              index === 2
                ? "bg-primary-500 text-white"
                : "bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <ScheduleList />
    </div>
  );
}