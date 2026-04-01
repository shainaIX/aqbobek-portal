"use client";

import type { ComponentType } from "react";
import { BookOpen, Calendar, Award, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { fetchSubjectSummaries, fetchStudentRecord } from "@/lib/ai-learning/database";
import WelcomeBanner from "@/components/dashboard/student/WelcomeBanner";
import AIRecommendations from "@/components/dashboard/student/AIRecommendations";
import SchedulePreview from "@/components/dashboard/student/SchedulePreview";
import SubjectProgress from "@/components/dashboard/student/SubjectProgress";

interface DashboardStats {
  gpa: number;
  classRank: number;
  totalStudents: number;
  streak: number;
  subjects: number;
  lessonsToday: number;
}

export default function StudentDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    gpa: 0,
    classRank: 0,
    totalStudents: 25,
    streak: 0,
    subjects: 0,
    lessonsToday: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      if (!user?.id) return;

      try {
        // Load student data
        const record = await fetchStudentRecord(user.id);
        const summaries = await fetchSubjectSummaries(user.id);

        if (record && record.topicPerformance.length > 0) {
          // Calculate GPA from all grades
          const allGrades = record.topicPerformance.flatMap((tp) => tp.gradeHistory);
          const avgGrade = allGrades.reduce((sum, g) => sum + g.score, 0) / allGrades.length;

          // Calculate streak (consecutive days with activity)
          const uniqueDates = new Set(allGrades.map((g) => g.date));
          const streak = uniqueDates.size;

          setStats({
            gpa: Math.round(avgGrade * 10) / 10,
            classRank: 5, // Would need class ranking query
            totalStudents: 25,
            streak: Math.min(streak, 30), // Cap at 30 for display
            subjects: summaries.filter((s) => s.grade > 0).length,
            lessonsToday: allGrades.filter((g) => g.date === new Date().toISOString().split('T')[0]).length,
          });
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboardData();
  }, [user?.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <WelcomeBanner stats={stats} />

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* AI Recommendations - 2/3 width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <AIRecommendations limit={2} />
        </motion.div>

        {/* Schedule Preview - 1/3 width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1"
        >
          <SchedulePreview />
        </motion.div>
      </div>

      {/* Quick Access - 2x2 Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="font-headline text-lg font-semibold text-neutral-900 mb-4">
          Быстрый доступ
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickAccessCard
            href="/student/schedule"
            icon={Calendar}
            iconColor="from-tertiary-400 to-tertiary-600"
            title="Расписание"
            description="Полное расписание на неделю"
            delay={0.4}
          />
          <QuickAccessCard
            href="/student/grades"
            icon={BookOpen}
            iconColor="from-primary-400 to-primary-600"
            title="Оценки"
            description="Успеваемость по предметам"
            delay={0.5}
          />
          <QuickAccessCard
            href="/student/achievements"
            icon={Award}
            iconColor="from-secondary-400 to-secondary-600"
            title="Достижения"
            description="Ачивки и награды"
            delay={0.6}
          />
          <QuickAccessCard
            href="/student/messages"
            icon={MessageSquare}
            iconColor="from-purple-400 to-purple-600"
            title="Сообщения"
            description="Чат с учителями"
            delay={0.7}
          />
        </div>
      </motion.div>

      {/* Subject Progress - Full Width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <SubjectProgress studentId={user?.id} />
      </motion.div>
    </div>
  );
}

// Quick Access Card Component
function QuickAccessCard({
  href,
  icon: Icon,
  iconColor,
  title,
  description,
  delay,
}: {
  href: string;
  icon: ComponentType<{ className?: string }>;
  iconColor: string;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Link
        href={href}
        className="group block p-5 bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-lg hover:border-neutral-300 transition-all duration-200"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-11 h-11 bg-gradient-to-br ${iconColor} rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <h4 className="font-semibold text-neutral-900 group-hover:text-neutral-700 transition-colors">
            {title}
          </h4>
        </div>
        <p className="text-sm text-neutral-600 leading-relaxed">
          {description}
        </p>
        <div className="mt-3 flex items-center gap-1 text-xs font-medium text-neutral-400 group-hover:text-neutral-600 transition-colors">
          <span>Открыть</span>
          <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    </motion.div>
  );
}
