"use client";

import { motion } from "framer-motion";
import { Download, Filter } from "lucide-react";
import SubjectProgress from "@/components/dashboard/student/SubjectProgress";

export default function ParentGradesPage() {
  const allGrades = [
    { subject: "Алгебра", topic: "Квадратные уравнения", grade: 5, date: "24.01.2025", type: "Контрольная" },
    { subject: "Физика", topic: "Законы Ньютона", grade: 4, date: "23.01.2025", type: "Тест" },
    { subject: "Литература", topic: "Сочинение", grade: 5, date: "22.01.2025", type: "Письменная" },
    { subject: "История", topic: "Вторая мировая война", grade: 3, date: "21.01.2025", type: "Тест" },
    { subject: "Английский", topic: "Grammar Test", grade: 5, date: "20.01.2025", type: "Тест" },
    { subject: "Химия", topic: "Лабораторная работа", grade: 3, date: "19.01.2025", type: "Практическая" },
    { subject: "Биология", topic: "Клеточное строение", grade: 4, date: "18.01.2025", type: "Устный" },
    { subject: "Геометрия", topic: "Треугольники", grade: 5, date: "17.01.2025", type: "Контрольная" },
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
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold font-headline text-neutral-900">
            Оценки
          </h1>
          <p className="text-neutral-600 mt-1">
            Детальная успеваемость по предметам
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Фильтр</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-tertiary-500 text-white rounded-lg hover:bg-tertiary-600 transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Экспорт</span>
          </button>
        </div>
      </motion.div>

      {/* Subject Progress */}
      <SubjectProgress />

      {/* All Grades Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
      >
        <div className="p-5 border-b border-neutral-200">
          <h3 className="font-headline text-lg font-semibold text-neutral-900">
            Все оценки
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Предмет</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Тема</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Тип</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Дата</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-neutral-500 uppercase">Оценка</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {allGrades.map((row, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.3 }}
                  className="hover:bg-neutral-50"
                >
                  <td className="px-5 py-4 text-sm font-medium text-neutral-900">{row.subject}</td>
                  <td className="px-5 py-4 text-sm text-neutral-600">{row.topic}</td>
                  <td className="px-5 py-4">
                    <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded">{row.type}</span>
                  </td>
                  <td className="px-5 py-4 text-sm text-neutral-500">{row.date}</td>
                  <td className="px-5 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getGradeColor(row.grade)}`}>
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