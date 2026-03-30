"use client";

import { motion } from "framer-motion";
import { Award, Trophy, Star, Target, BookOpen, Flame } from "lucide-react";

interface Achievement {
  id: string;
  icon: any;
  title: string;
  description: string;
  progress: number;
  unlocked: boolean;
  color: string;
}

export default function AchievementsPage() {
  const achievements: Achievement[] = [
    {
      id: "1",
      icon: Trophy,
      title: "Первый в классе",
      description: "Занять 1 место в рейтинге класса",
      progress: 80,
      unlocked: false,
      color: "from-yellow-400 to-yellow-600",
    },
    {
      id: "2",
      icon: Flame,
      title: "10 дней подряд",
      description: "Заходить в портал 10 дней без пропусков",
      progress: 100,
      unlocked: true,
      color: "from-orange-400 to-red-500",
    },
    {
      id: "3",
      icon: Star,
      title: "Отличник",
      description: "Получить средний балл 5.0 за четверть",
      progress: 96,
      unlocked: false,
      color: "from-primary-400 to-primary-600",
    },
    {
      id: "4",
      icon: BookOpen,
      title: "Книжный червь",
      description: "Прочитать 50 книг за год",
      progress: 34,
      unlocked: false,
      color: "from-purple-400 to-purple-600",
    },
    {
      id: "5",
      icon: Target,
      title: "Цель достигнута",
      description: "Выполнить все недельные цели",
      progress: 100,
      unlocked: true,
      color: "from-green-400 to-green-600",
    },
    {
      id: "6",
      icon: Award,
      title: "Олимпиадник",
      description: "Выиграть школьную олимпиаду",
      progress: 0,
      unlocked: false,
      color: "from-blue-400 to-blue-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold font-headline text-neutral-900">
          Достижения
        </h1>
        <p className="text-neutral-600 mt-1">
          Collect all badges and show off your progress
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-neutral-200 p-4 text-center">
          <p className="text-3xl font-bold font-headline text-primary-600">
            {achievements.filter(a => a.unlocked).length}
          </p>
          <p className="text-sm text-neutral-500 mt-1">Разблокировано</p>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-4 text-center">
          <p className="text-3xl font-bold font-headline text-neutral-900">
            {achievements.length}
          </p>
          <p className="text-sm text-neutral-500 mt-1">Всего</p>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-4 text-center">
          <p className="text-3xl font-bold font-headline text-secondary-600">
            {Math.round((achievements.filter(a => a.unlocked).length / achievements.length) * 100)}%
          </p>
          <p className="text-sm text-neutral-500 mt-1">Прогресс</p>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;
          
          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white rounded-xl border-2 p-6 transition-all ${
                achievement.unlocked
                  ? "border-primary-300 shadow-md"
                  : "border-neutral-200 opacity-70"
              }`}
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${achievement.color} flex items-center justify-center mb-4 ${
                achievement.unlocked ? "" : "grayscale"
              }`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="font-headline text-lg font-semibold text-neutral-900 mb-2">
                {achievement.title}
              </h3>
              <p className="text-sm text-neutral-600 mb-4">
                {achievement.description}
              </p>

              {achievement.unlocked ? (
                <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                  ✓ Разблокировано
                </span>
              ) : (
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-neutral-500">Прогресс</span>
                    <span className="font-medium">{achievement.progress}%</span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${achievement.color} rounded-full`}
                      style={{ width: `${achievement.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}