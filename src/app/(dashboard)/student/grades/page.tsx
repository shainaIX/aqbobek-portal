"use client";

import { motion } from "framer-motion";
import SubjectProgress from "@/components/dashboard/student/SubjectProgress";
import { getRecentGrades } from "@/lib/ai-learning/database";
import { useAuth } from "@/context/AuthContext";

const gradeStyle = (g: number) => {
  if (g >= 5) return "bg-green-100 text-green-700";
  if (g >= 4) return "bg-blue-100 text-blue-700";
  if (g >= 3) return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
};

export default function GradesPage() {
  const { user } = useAuth();
  const studentId = user?.id ?? "1";
  const recentGrades = getRecentGrades(studentId, 15);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold font-headline text-neutral-900">
          Оценки и Успеваемость
        </h1>
        <p className="text-neutral-600 mt-1">
          Детальная статистика по всем предметам
        </p>
      </motion.div>

      {/* Subject Progress — pulls from real database */}
      <SubjectProgress studentId={studentId} />

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
                  Тема / Работа
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
              {recentGrades.map((row, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 + 0.3 }}
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
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold ${gradeStyle(
                        row.grade
                      )}`}
                    >
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
