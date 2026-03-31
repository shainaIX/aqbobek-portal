"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, BookOpen } from "lucide-react";
import { getSubjectSummaries } from "@/lib/ai-learning/database";
import type { SubjectSummary } from "@/lib/ai-learning/types";

interface SubjectProgressProps {
  subjects?: SubjectSummary[];
  studentId?: string;
}

export default function SubjectProgress({ subjects, studentId = "1" }: SubjectProgressProps) {
  const displaySubjects = subjects ?? getSubjectSummaries(studentId);

  const getGradeColor = (grade: number) => {
    switch (grade) {
      case 5: return 'text-green-600 bg-green-100';
      case 4: return 'text-blue-600 bg-blue-100';
      case 3: return 'text-yellow-600 bg-yellow-100';
      case 2: return 'text-red-600 bg-red-100';
      default: return 'text-neutral-600 bg-neutral-100';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const TrendIcon = {
    up: TrendingUp,
    down: TrendingDown,
    stable: Minus,
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-neutral-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold text-neutral-900">
              Прогресс по предметам
            </h3>
            <p className="text-xs text-neutral-500">
              Средняя успеваемость: 4.6
            </p>
          </div>
        </div>
        <button className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
          Подробнее →
        </button>
      </div>

      {/* Subjects List */}
      <div className="p-5 space-y-4">
        {displaySubjects.map((subject, index) => {
          const Icon = TrendIcon[subject.trend];
          
          return (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="group"
            >
              {/* Subject Header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-8 rounded-full ${subject.color}`} />
                  <div>
                    <h4 className="font-medium text-neutral-900 group-hover:text-primary-600 transition-colors">
                      {subject.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${getGradeColor(subject.grade)}`}>
                        {subject.grade}
                      </span>
                      <span className={`flex items-center gap-1 text-xs ${getTrendColor(subject.trend)}`}>
                        <Icon className="w-3 h-3" />
                        {subject.trend === 'up' ? 'Растёт' : subject.trend === 'down' ? 'Падает' : 'Стабильно'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold font-headline text-neutral-900">
                    {subject.progress}%
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-3 bg-neutral-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${subject.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.08 + 0.3 }}
                  className={`h-full rounded-full ${getProgressColor(subject.progress)}`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Stats */}
      <div className="p-4 bg-neutral-50 border-t border-neutral-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold font-headline text-green-600">
              {displaySubjects.filter(s => s.progress >= 80).length}
            </p>
            <p className="text-xs text-neutral-500 mt-1">Отлично</p>
          </div>
          <div>
            <p className="text-2xl font-bold font-headline text-blue-600">
              {displaySubjects.filter(s => s.progress >= 60 && s.progress < 80).length}
            </p>
            <p className="text-xs text-neutral-500 mt-1">Хорошо</p>
          </div>
          <div>
            <p className="text-2xl font-bold font-headline text-yellow-600">
              {displaySubjects.filter(s => s.progress < 60).length}
            </p>
            <p className="text-xs text-neutral-500 mt-1">Требует внимания</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}