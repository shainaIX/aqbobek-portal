"use client";

import { motion } from "framer-motion";
import { FileText, Sparkles, Download, Calendar, Clock, CheckCircle } from "lucide-react";

export default function TeacherReportsPage() {
  const reports = [
    {
      id: 1,
      class: "10\"А\"",
      type: "Ежемесячный отчёт",
      period: "Январь 2025",
      generated: "AI",
      date: "26.01.2025",
      status: "ready",
    },
    {
      id: 2,
      class: "10\"Б\"",
      type: "Отчёт по успеваемости",
      period: "Январь 2025",
      generated: "AI",
      date: "25.01.2025",
      status: "ready",
    },
    {
      id: 3,
      class: "9\"А\"",
      type: "Анализ посещаемости",
      period: "Январь 2025",
      generated: "AI",
      date: "24.01.2025",
      status: "ready",
    },
  ];

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
            Отчёты
          </h1>
          <p className="text-neutral-600 mt-1">
            AI-генерация отчётов об успеваемости
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">Сгенерировать новый</span>
        </button>
      </motion.div>

      {/* AI Generator Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl p-6 text-white shadow-lg"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold font-headline mb-2">
              Быстрая генерация отчётов
            </h3>
            <p className="text-secondary-100 text-sm mb-4">
              AI проанализирует успеваемость класса и создаст подробный отчёт за 30 секунд
            </p>
            <div className="flex flex-wrap gap-3">
              <select className="px-4 py-2 bg-white/20 text-white rounded-lg border border-white/30 text-sm focus:outline-none focus:border-white">
                <option>10&quot;А&quot;</option>
                <option>10&quot;Б&quot;</option>
                <option>9&quot;А&quot;</option>
                <option>11&quot;А&quot;</option>
              </select>
              <select className="px-4 py-2 bg-white/20 text-white rounded-lg border border-white/30 text-sm focus:outline-none focus:border-white">
                <option>Январь 2025</option>
                <option>Декабрь 2024</option>
                <option>Ноябрь 2024</option>
              </select>
              <button className="px-4 py-2 bg-white text-secondary-700 font-medium rounded-lg hover:bg-white/90 transition-colors">
                Сгенерировать
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Reports List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
      >
        <div className="p-5 border-b border-neutral-200">
          <h3 className="font-headline text-lg font-semibold text-neutral-900">
            Готовые отчёты
          </h3>
        </div>

        <div className="divide-y divide-neutral-100">
          {reports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="p-4 hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-secondary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">{report.class} — {report.type}</p>
                    <div className="flex items-center gap-3 mt-1 text-sm text-neutral-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {report.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {report.date}
                      </span>
                      <span className="flex items-center gap-1 text-secondary-600">
                        <Sparkles className="w-3 h-3" />
                        {report.generated}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {report.status === "ready" && (
                    <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                      <CheckCircle className="w-4 h-4" />
                      Готов
                    </span>
                  )}
                  <button className="px-3 py-1.5 bg-secondary-500 text-white text-sm font-medium rounded-lg hover:bg-secondary-600 transition-colors flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    Скачать
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}