"use client";

import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  color: 'primary' | 'secondary' | 'tertiary';
  delay?: number;
}

export default function StatCard({
  icon: Icon,
  title,
  value,
  trend,
  trendDirection = 'neutral',
  color,
  delay = 0,
}: StatCardProps) {
  const colorClasses = {
    primary: 'bg-primary-100 text-primary-600',
    secondary: 'bg-secondary-100 text-secondary-700',
    tertiary: 'bg-tertiary-100 text-tertiary-700',
  };

  const trendColors = {
    up: 'text-green-600 bg-green-100',
    down: 'text-red-600 bg-red-100',
    neutral: 'text-neutral-600 bg-neutral-100',
  };

  const TrendIcon = trendDirection === 'up' ? TrendingUp : trendDirection === 'down' ? TrendingDown : Minus;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white rounded-xl border border-neutral-200 p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${trendColors[trendDirection]}`}>
            <TrendIcon className="w-3 h-3" />
            {trend}
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl sm:text-3xl font-bold font-headline text-neutral-900 mb-1">
          {value}
        </p>
        <p className="text-sm text-neutral-600">{title}</p>
      </div>
    </motion.div>
  );
}