"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { BookOpen, Calendar, Award, TrendingUp } from "lucide-react";
import Header from "@/components/dashboard/student/Header";
import WelcomeBanner from "@/components/dashboard/student/WelcomeBanner";
import StatCard from "@/components/dashboard/student/StatCards";
import ScheduleList from "@/components/dashboard/student/ScheduleList";
import SubjectProgress from "@/components/dashboard/student/SubjectProgress";
import AIRecommendations from "@/components/dashboard/student/AIRecommendations";

export default function StudentDashboard() {
  const router = useRouter();
  const { isAuthenticated, isLoading, user } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600 font-medium">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Mock данные
  const stats = {
    gpa: 4.8,
    classRank: 5,
    totalStudents: 25,
    streak: 12,
    subjects: 14,
    lessonsToday: 6,
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Welcome Banner */}
        <div className="mb-6 sm:mb-8">
          <WelcomeBanner stats={stats} />
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <StatCard
            icon={TrendingUp}
            title="Средний балл"
            value={stats.gpa.toFixed(1)}
            trend="+0.3"
            trendDirection="up"
            color="primary"
            delay={0.1}
          />
          <StatCard
            icon={Award}
            title="Позиция в классе"
            value={`#${stats.classRank}`}
            trend="+2"
            trendDirection="up"
            color="secondary"
            delay={0.2}
          />
          <StatCard
            icon={BookOpen}
            title="Предметов"
            value={stats.subjects}
            color="tertiary"
            delay={0.3}
          />
          <StatCard
            icon={Calendar}
            title="Уроков сегодня"
            value={stats.lessonsToday}
            trend="-1"
            trendDirection="down"
            color="primary"
            delay={0.4}
          />
        </div>

        {/* Main Grid - AI + Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* AI Recommendations (2/3 width on desktop) */}
          <div className="lg:col-span-2">
            <AIRecommendations />
          </div>
          
          {/* Schedule (1/3 width on desktop) */}
          <div className="lg:col-span-1">
            <ScheduleList />
          </div>
        </div>

        {/* Subject Progress (full width) */}
        <div className="mb-6">
          <SubjectProgress />
        </div>

        {/* Placeholder for Achievements & Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-neutral-200 p-8 text-center min-h-[300px] flex items-center justify-center">
            <div>
              <p className="text-4xl mb-4">🏆</p>
              <p className="text-neutral-600 font-medium">Достижения</p>
              <p className="text-sm text-neutral-500 mt-2">Скоро будет...</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-neutral-200 p-8 text-center min-h-[300px] flex items-center justify-center">
            <div>
              <p className="text-4xl mb-4">🥇</p>
              <p className="text-neutral-600 font-medium">Лидерборд</p>
              <p className="text-sm text-neutral-500 mt-2">Скоро будет...</p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}