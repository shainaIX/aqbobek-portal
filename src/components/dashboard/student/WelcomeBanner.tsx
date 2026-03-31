"use client";

import { motion } from "framer-motion";
import { TrendingUp, Award, Flame } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface WelcomeBannerProps {
  stats: {
    gpa: number;
    classRank: number;
    totalStudents: number;
    streak: number;
  };
}

export default function WelcomeBanner({ stats }: WelcomeBannerProps) {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] ?? "Ученик";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 6) return "Доброй ночи";
    if (hour < 12) return "Доброе утро";
    if (hour < 18) return "Добрый день";
    return "Добрый вечер";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 p-6 sm:p-8 shadow-xl"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative z-10">
        <div className="mb-6">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold font-headline text-white mb-2"
          >
            {getGreeting()}, {firstName}! 👋
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-primary-100 text-sm sm:text-base"
          >
            Вот что происходит с вашей успеваемостью сегодня
          </motion.p>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
              <span className="text-xs sm:text-sm text-primary-100">
                Средний балл
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-headline text-white">
              {stats.gpa.toFixed(1)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
              <span className="text-xs sm:text-sm text-primary-100">Место</span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-headline text-white">
              #{stats.classRank}
            </p>
            <p className="text-xs text-primary-100 mt-1">
              из {stats.totalStudents}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
              <span className="text-xs sm:text-sm text-primary-100">Серия</span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold font-headline text-white">
              {stats.streak}
            </p>
            <p className="text-xs text-primary-100 mt-1">дней подряд</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
