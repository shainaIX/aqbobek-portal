"use client";

import { useAuth } from "@/context/AuthContext";
import { BookOpen, Calendar, Award, TrendingUp } from "lucide-react";
import WelcomeBanner from "@/components/dashboard/student/WelcomeBanner";
import StatCard from "@/components/dashboard/student/StatCards";
import AIRecommendations from "@/components/dashboard/student/AIRecommendations";

export default function StudentDashboard() {
  const { user } = useAuth();

  const stats = {
    gpa: 4.8,
    classRank: 5,
    totalStudents: 25,
    streak: 12,
    subjects: 14,
    lessonsToday: 6,
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <WelcomeBanner stats={stats} />

      {/* AI Recommendations */}
      <AIRecommendations />

      {/* Quick Links to Other Pages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a
          href="/student/schedule"
          className="p-6 bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-md hover:border-primary-300 transition-all group"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-tertiary-400 to-tertiary-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-headline text-lg font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
              Расписание
            </h3>
          </div>
          <p className="text-sm text-neutral-600">
            Полное расписание на неделю с заменами
          </p>
          <p className="text-xs text-primary-600 mt-3 font-medium">
            Открыть →
          </p>
        </a>

        <a
          href="/student/grades"
          className="p-6 bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-md hover:border-primary-300 transition-all group"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-headline text-lg font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
              Оценки
            </h3>
          </div>
          <p className="text-sm text-neutral-600">
            Детальная успеваемость по предметам
          </p>
          <p className="text-xs text-primary-600 mt-3 font-medium">
            Открыть →
          </p>
        </a>

        <a
          href="/student/achievements"
          className="p-6 bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-md hover:border-primary-300 transition-all group"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-headline text-lg font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
              Достижения
            </h3>
          </div>
          <p className="text-sm text-neutral-600">
            Ваши ачивки и награды
          </p>
          <p className="text-xs text-primary-600 mt-3 font-medium">
            Открыть →
          </p>
        </a>
      </div>
    </div>
  );
}