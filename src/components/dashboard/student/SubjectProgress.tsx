"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { fetchSubjectSummaries } from "@/lib/ai-learning/database";
import type { SubjectSummary } from "@/lib/ai-learning/types";

interface SubjectProgressProps {
  subjects?: SubjectSummary[];
  studentId?: string;
}

export default function SubjectProgress({ subjects, studentId }: SubjectProgressProps) {
  const { user } = useAuth();
  const [displaySubjects, setDisplaySubjects] = useState<SubjectSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const effectiveStudentId = studentId || user?.id;

  useEffect(() => {
    if (subjects) {
      setDisplaySubjects(subjects);
      setIsLoading(false);
      return;
    }

    if (!effectiveStudentId) return;

    async function loadData() {
      try {
        const summaries = await fetchSubjectSummaries(effectiveStudentId as string);
        setDisplaySubjects(summaries);
      } catch (error) {
        console.error('Error loading subject summaries:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [subjects, effectiveStudentId]);

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

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-neutral-400';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-neutral-200 p-8 text-center">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-neutral-600">Загрузка предметов...</p>
      </div>
    );
  }

  if (displaySubjects.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-neutral-200 p-8 text-center">
        <BookOpen className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
        <p className="text-neutral-600 font-medium">Нет данных по предметам</p>
        <p className="text-sm text-neutral-500 mt-1">Оценки появятся здесь после сдачи работ</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
    >

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
              Средняя успеваемость: {(displaySubjects.reduce((s, sub) => s + sub.grade, 0) / displaySubjects.filter(s => s.grade > 0).length || 0).toFixed(1)}
            </p>
          </div>
        </div>
        <button className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
          Подробнее →
        </button>
      </div>

      <div className="p-5 space-y-4">
        {displaySubjects.filter(s => s.grade > 0).map((subject, index) => {
          const Icon = TrendIcon[subject.trend];

          return (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="group"
            >

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
              {displaySubjects.filter(s => s.progress < 60 && s.grade > 0).length}
            </p>
            <p className="text-xs text-neutral-500 mt-1">Требует внимания</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
