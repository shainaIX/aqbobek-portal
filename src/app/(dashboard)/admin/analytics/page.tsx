"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Award,
  Calendar,
  Download
} from "lucide-react";

export default function AdminAnalyticsPage() {
  const gradeData = [
    { grade: "11", avgGpa: 4.5, students: 65, attendance: 97 },
    { grade: "10", avgGpa: 4.1, students: 98, attendance: 94 },
    { grade: "9", avgGpa: 3.9, students: 102, attendance: 92 },
    { grade: "8", avgGpa: 4.0, students: 95, attendance: 93 },
    { grade: "7", avgGpa: 4.2, students: 88, attendance: 95 },
    { grade: "6", avgGpa: 4.3, students: 76, attendance: 96 },
  ];

  const subjectPerformance = [
    { subject: "Алгебра", avgGpa: 4.2, trend: "up" },
    { subject: "Физика", avgGpa: 3.8, trend: "down" },
    { subject: "Литература", avgGpa: 4.5, trend: "up" },
    { subject: "История", avgGpa: 4.0, trend: "stable" },
    { subject: "Химия", avgGpa: 3.7, trend: "down" },
    { subject: "Английский", avgGpa: 4.4, trend: "up" },
  ];

  return (
    <div className="space-y-6">

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold font-headline text-neutral-900">
            Аналитика
          </h1>
          <p className="text-neutral-600 mt-1">
            Глубокий анализ успеваемости по школе
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
          <Download className="w-4 h-4" />
          <span className="text-sm font-medium">Экспорт отчёта</span>
        </button>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-neutral-200 p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <span className="text-sm text-neutral-600">Средний балл</span>
          </div>
          <p className="text-3xl font-bold font-headline text-neutral-900">4.3</p>
          <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +0.2 за квартал
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-neutral-200 p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-6 h-6 text-purple-600" />
            <span className="text-sm text-neutral-600">Всего учеников</span>
          </div>
          <p className="text-3xl font-bold font-headline text-neutral-900">524</p>
          <p className="text-sm text-neutral-500 mt-1">+12 за год</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-neutral-200 p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            <span className="text-sm text-neutral-600">Посещаемость</span>
          </div>
          <p className="text-3xl font-bold font-headline text-neutral-900">94%</p>
          <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +2% за неделю
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-neutral-200 p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <Award className="w-6 h-6 text-yellow-600" />
            <span className="text-sm text-neutral-600">Отличников</span>
          </div>
          <p className="text-3xl font-bold font-headline text-neutral-900">87</p>
          <p className="text-sm text-neutral-500 mt-1">16.6% от всех</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
      >
        <div className="p-5 border-b border-neutral-200">
          <h3 className="font-headline text-lg font-semibold text-neutral-900">
            Успеваемость по параллелям
          </h3>
        </div>

        <div className="p-5">
          <div className="space-y-4">
            {gradeData.map((grade, index) => (
              <motion.div
                key={grade.grade}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 + 0.5 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 text-center">
                  <p className="font-bold text-neutral-900">{grade.grade}</p>
                  <p className="text-xs text-neutral-500">класс</p>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-neutral-600">{grade.students} учеников</span>
                    <span className="text-sm font-bold text-neutral-900">{grade.avgGpa}</span>
                  </div>
                  <div className="h-3 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-purple-700 rounded-full"
                      style={{ width: `${(grade.avgGpa / 5) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="w-20 text-right">
                  <p className="text-sm font-medium text-neutral-900">{grade.attendance}%</p>
                  <p className="text-xs text-neutral-500">посещ.</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
      >
        <div className="p-5 border-b border-neutral-200">
          <h3 className="font-headline text-lg font-semibold text-neutral-900">
            Успеваемость по предметам
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
          {subjectPerformance.map((subject, index) => (
            <motion.div
              key={subject.subject}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 + 0.7 }}
              className="p-4 bg-neutral-50 rounded-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-neutral-900">{subject.subject}</p>
                {subject.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-green-600" />
                ) : subject.trend === "down" ? (
                  <TrendingDown className="w-4 h-4 text-red-600" />
                ) : (
                  <BarChart3 className="w-4 h-4 text-neutral-400" />
                )}
              </div>
              <p className="text-2xl font-bold text-neutral-900">{subject.avgGpa}</p>
              <p className="text-xs text-neutral-500 mt-1">
                {subject.trend === "up" ? "Растёт" : subject.trend === "down" ? "Падает" : "Стабильно"}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}