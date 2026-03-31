"use client";

import { useAuth } from "@/context/AuthContext";
import { BookOpen, Calendar, Award, TrendingUp, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import WelcomeBanner from "@/components/dashboard/student/WelcomeBanner";
import AIRecommendations from "@/components/dashboard/student/AIRecommendations";
import SchedulePreview from "@/components/dashboard/student/SchedulePreview";
import SubjectProgress from "@/components/dashboard/student/SubjectProgress";

export default function StudentDashboard() {
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
        <SubjectProgress limit={6} />
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
  icon: any;
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