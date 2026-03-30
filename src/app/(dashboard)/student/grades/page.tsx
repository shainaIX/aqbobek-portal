"use client";

import { motion } from "framer-motion";
import SubjectProgress from "@/components/dashboard/student/SubjectProgress";

export default function GradesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold font-headline text-neutral-900">
          Оценки и Успеваемость
        </h1>
        <p className="text-neutral-600 mt-1">
          Детальная статистика по всем предметам
        </p>
      </motion.div>

      {/* Subject Progress */}
      <SubjectProgress />

      {/* Recent Grades Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
      >
        <div className="p-5 border-b border-neutral-200">
          <h3 className="font-headline text-lg font-semibold text-neutral-900">
            Последние оценки
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Предмет
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Тема
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Дата
                </th>
                <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                  Оценка
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {[
                { subject: "Алгебра", topic: "Квадратные уравнения", date: "24.01.2025", grade: 5 },
                { subject: "Физика", topic: "Законы Ньютона", date: "23.01.2025", grade: 4 },
                { subject: "Литература", topic: "Сочинение", date: "22.01.2025", grade: 5 },
                { subject: "История", topic: "Тест", date: "21.01.2025", grade: 4 },
                { subject: "Химия", topic: "Лабораторная", date: "20.01.2025", grade: 3 },
              ].map((row, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.3 }}
                  className="hover:bg-neutral-50"
                >
                  <td className="px-5 py-4 text-sm font-medium text-neutral-900">
                    {row.subject}
                  </td>
                  <td className="px-5 py-4 text-sm text-neutral-600">
                    {row.topic}
                  </td>
                  <td className="px-5 py-4 text-sm text-neutral-500">
                    {row.date}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      row.grade === 5 ? "bg-green-100 text-green-700" :
                      row.grade === 4 ? "bg-blue-100 text-blue-700" :
                      row.grade === 3 ? "bg-yellow-100 text-yellow-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      {row.grade}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}