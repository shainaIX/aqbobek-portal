"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, CheckCircle, ChevronRight } from "lucide-react";
import Link from "next/link";

const lessons = [
  { id: '1', time: '08:30 - 09:15', subject: 'Алгебра', room: '305', teacher: 'Иванова А.П.', completed: true },
  { id: '2', time: '09:25 - 10:10', subject: 'Физика', room: '201', teacher: 'Петров С.М.', completed: false, current: true },
  { id: '3', time: '10:30 - 11:15', subject: 'Литература', room: '412', teacher: 'Сидорова Е.В.', completed: false },
  { id: '4', time: '11:35 - 12:20', subject: 'История', room: '308', teacher: 'Алиев Р.К.', completed: false },
];

export default function SchedulePreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
    >
      <div className="flex items-center justify-between p-5 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-tertiary-400 to-tertiary-600 rounded-lg flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold text-neutral-900">
              Сегодня
            </h3>
            <p className="text-xs text-neutral-500">
              {lessons.filter(l => l.completed).length} из {lessons.length} завершено
            </p>
          </div>
        </div>
        <Link href="/student/schedule" className="text-sm font-medium text-tertiary-600 hover:text-tertiary-700 flex items-center gap-1">
          Все <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="divide-y divide-neutral-100">
        {lessons.map((lesson, index) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.05 }}
            className={`p-4 transition-all ${
              lesson.completed ? 'bg-neutral-50 opacity-60' :
              lesson.current ? 'bg-tertiary-50 border-l-4 border-tertiary-500' :
              'bg-white hover:bg-neutral-50'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                {lesson.completed ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : lesson.current ? (
                  <div className="w-3 h-3 bg-tertiary-500 rounded-full animate-pulse" />
                ) : (
                  <div className="w-3 h-3 bg-neutral-300 rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-medium text-sm ${
                  lesson.completed ? 'text-neutral-500 line-through' :
                  lesson.current ? 'text-tertiary-900' :
                  'text-neutral-900'
                }`}>
                  {lesson.subject}
                </p>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {lesson.time}
                </p>
                <div className="flex items-center gap-2 mt-1 text-xs text-neutral-500">
                  <MapPin className="w-3 h-3" />
                  <span>{lesson.room}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}