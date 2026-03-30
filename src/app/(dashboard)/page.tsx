"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Award, 
  BookOpen, 
  Calendar,
  Bell,
  Search,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="lg:hidden">
                <Menu className="w-5 h-5" />
              </Button>
              <h1 className="font-headline text-2xl font-bold text-gradient">
                Aqbobek Lyceum
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center bg-white rounded-lg border border-neutral-200 px-3 py-2">
                <Search className="w-4 h-4 text-neutral-400 mr-2" />
                <input
                  type="text"
                  placeholder="Поиск..."
                  className="bg-transparent border-none outline-none text-sm w-64"
                />
              </div>
              
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>

              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                АИ
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="heading-1 mb-2">Добро пожаловать, Алишер! 👋</h2>
          <p className="body-large text-neutral-600">
            Вот что происходит с вашей успеваемостью сегодня
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={TrendingUp}
            title="Средний балл"
            value="4.8"
            trend="+0.3"
            trendUp={true}
            color="primary"
          />
          <StatCard
            icon={Award}
            title="Достижения"
            value="12"
            trend="+2"
            trendUp={true}
            color="secondary"
          />
          <StatCard
            icon={BookOpen}
            title="Предметов"
            value="14"
            trend="0"
            trendUp={true}
            color="tertiary"
          />
          <StatCard
            icon={Calendar}
            title="Уроков сегодня"
            value="6"
            trend="-1"
            trendUp={false}
            color="primary"
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="heading-3">AI-Рекомендации</h3>
              <Button variant="outlined" size="sm">Все рекомендации</Button>
            </div>
            
            <div className="space-y-4">
              <AIInsightCard
                subject="Физика"
                probability={80}
                message="Вероятность успешной сдачи СОЧ по теме «Квантовая механика»"
                recommendations={[
                  "Посмотрите видеолекцию №12",
                  "Решите 5 практических задач",
                  "Повторите формулы из главы 3"
                ]}
              />
              
              <AIInsightCard
                subject="Алгебра"
                probability={95}
                message="Отличная подготовка к контрольной работе"
                recommendations={[
                  "Продолжайте в том же духе!",
                  "Попробуйте задачи повышенной сложности"
                ]}
              />
            </div>
          </motion.div>

          {/* Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="heading-3">Расписание</h3>
              <Button variant="ghost" size="sm">Сегодня</Button>
            </div>
            
            <div className="space-y-3">
              <ScheduleItem
                time="08:30 - 09:15"
                subject="Алгебра"
                room="Кабинет 305"
                teacher="Иванова А.П."
                completed
              />
              <ScheduleItem
                time="09:25 - 10:10"
                subject="Физика"
                room="Лаборатория 201"
                teacher="Петров С.М."
                current
              />
              <ScheduleItem
                time="10:30 - 11:15"
                subject="Литература"
                room="Кабинет 412"
                teacher="Сидорова Е.В."
              />
              <ScheduleItem
                time="11:35 - 12:20"
                subject="История"
                room="Кабинет 308"
                teacher="Алиев Р.К."
              />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

// Компоненты для дашборда

function StatCard({ 
  icon: Icon, 
  title, 
  value, 
  trend, 
  trendUp, 
  color 
}: { 
  icon: any; 
  title: string; 
  value: string; 
  trend: string; 
  trendUp: boolean;
  color: 'primary' | 'secondary' | 'tertiary';
}) {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary-dark',
    tertiary: 'bg-tertiary/10 text-tertiary-dark',
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="card p-6 hover:shadow-lg transition-all"
    >
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className={`text-sm font-medium ${trendUp ? 'text-primary' : 'text-red-500'}`}>
          {trend}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold font-headline text-neutral-900">{value}</p>
        <p className="text-sm text-neutral-600 mt-1">{title}</p>
      </div>
    </motion.div>
  );
}

function AIInsightCard({ 
  subject, 
  probability, 
  message, 
  recommendations 
}: { 
  subject: string;
  probability: number;
  message: string;
  recommendations: string[];
}) {
  return (
    <div className="border border-neutral-200 rounded-lg p-4 hover:border-primary-300 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold font-headline text-lg">{subject}</h4>
        <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
          {probability}%
        </span>
      </div>
      <p className="text-neutral-600 text-sm mb-3">{message}</p>
      <div className="space-y-2">
        {recommendations.map((rec, idx) => (
          <div key={idx} className="flex items-start gap-2 text-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
            <span className="text-neutral-700">{rec}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScheduleItem({ 
  time, 
  subject, 
  room, 
  teacher, 
  completed, 
  current 
}: { 
  time: string;
  subject: string;
  room: string;
  teacher: string;
  completed?: boolean;
  current?: boolean;
}) {
  return (
    <div className={`p-3 rounded-lg border transition-all ${
      current 
        ? 'border-primary bg-primary/5 shadow-sm' 
        : completed 
          ? 'border-neutral-200 opacity-60' 
          : 'border-neutral-200 hover:border-primary-300'
    }`}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-neutral-900">{subject}</span>
        <span className="text-xs text-neutral-500">{time}</span>
      </div>
      <div className="flex items-center gap-3 text-xs text-neutral-600">
        <span>{room}</span>
        <span>•</span>
        <span>{teacher}</span>
      </div>
      {current && (
        <div className="mt-2 flex items-center gap-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-xs text-primary font-medium">Сейчас</span>
        </div>
      )}
    </div>
  );
}