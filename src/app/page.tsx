"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Award, 
  BookOpen, 
  Calendar,
  Bell,
  Search,
  Menu,
  Target,
  Clock,
  ChevronRight,
  Star,
  Zap
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg">
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h1 className="font-headline text-2xl font-bold bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent">
                  Aqbobek Lyceum
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center bg-neutral-100 rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-neutral-400 mr-2" />
                <input
                  type="text"
                  placeholder="Поиск..."
                  className="bg-transparent border-none outline-none text-sm w-64"
                />
              </div>
              
              <button className="relative p-2 hover:bg-neutral-100 rounded-lg">
                <Bell className="w-5 h-5 text-neutral-700" />
                <span className="absolute top-1 right-1 w-4 h-4 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  3
                </span>
              </button>

              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold shadow-md">
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
          <h2 className="text-3xl font-bold font-headline text-neutral-900 mb-2">
            Добро пожаловать, Алишер! 👋
          </h2>
          <p className="text-lg text-neutral-600">
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
            className="lg:col-span-2 bg-white rounded-xl border border-neutral-200 shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-semibold font-headline text-neutral-900">
                  AI-Рекомендации
                </h3>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-primary-600 border-2 border-primary-500 rounded-lg hover:bg-primary-50 transition-colors">
                Все рекомендации
              </button>
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

              <AIInsightCard
                subject="История"
                probability={65}
                message="Требуется повторение материала по теме «Вторая мировая война»"
                recommendations={[
                  "Прочитайте конспект за 15 марта",
                  "Посмотрите документальный фильм",
                  "Составьте хронологию событий"
                ]}
              />
            </div>
          </motion.div>

          {/* Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-600" />
                <h3 className="text-xl font-semibold font-headline text-neutral-900">
                  Расписание
                </h3>
              </div>
              <button className="text-sm text-neutral-600 hover:text-neutral-900">
                Сегодня
              </button>
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
              <ScheduleItem
                time="12:40 - 13:25"
                subject="Английский"
                room="Кабинет 215"
                teacher="Johnson M."
              />
            </div>

            <button className="w-full mt-6 py-2.5 text-sm font-medium text-primary-600 border-2 border-primary-500 rounded-lg hover:bg-primary-50 transition-colors flex items-center justify-center gap-2">
              Полное расписание
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Ваши цели на неделю</h3>
                <p className="text-primary-100">Прогресс: 3 из 5 выполнено</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-medium">
              Подробнее
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <GoalItem 
              title="Сдать СОЧ по физике" 
              progress={100} 
              completed 
            />
            <GoalItem 
              title="Прочитать 2 главы литературы" 
              progress={50} 
            />
            <GoalItem 
              title="Решить 20 задач по алгебре" 
              progress={75} 
            />
          </div>
        </motion.div>
      </main>
    </div>
  );
}

// Компоненты

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
    primary: 'bg-primary-100 text-primary-600',
    secondary: 'bg-secondary-100 text-secondary-700',
    tertiary: 'bg-tertiary-100 text-tertiary-700',
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 hover:shadow-lg transition-all"
    >
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
          trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
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
  const getProbabilityColor = (prob: number) => {
    if (prob >= 80) return 'bg-green-100 text-green-700 border-green-300';
    if (prob >= 60) return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    return 'bg-red-100 text-red-700 border-red-300';
  };

  return (
    <div className="border border-neutral-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold font-headline text-lg text-neutral-900">{subject}</h4>
        <span className={`px-3 py-1 text-sm font-bold rounded-full border ${getProbabilityColor(probability)}`}>
          {probability}%
        </span>
      </div>
      <p className="text-neutral-600 text-sm mb-3">{message}</p>
      <div className="space-y-2">
        {recommendations.map((rec, idx) => (
          <div key={idx} className="flex items-start gap-2 text-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
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
        ? 'border-primary-500 bg-primary-50 shadow-sm' 
        : completed 
          ? 'border-neutral-200 opacity-60 bg-neutral-50' 
          : 'border-neutral-200 hover:border-primary-300 bg-white'
    }`}>
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          {current && (
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
          )}
          <span className={`text-sm font-medium ${
            current ? 'text-primary-900' : 'text-neutral-900'
          }`}>
            {subject}
          </span>
        </div>
        <span className="text-xs text-neutral-500 font-medium">{time}</span>
      </div>
      <div className="flex items-center gap-3 text-xs text-neutral-600 ml-4">
        <span>{room}</span>
        <span>•</span>
        <span>{teacher}</span>
      </div>
      {current && (
        <div className="mt-2 ml-4">
          <span className="text-xs text-primary-600 font-semibold">Сейчас</span>
        </div>
      )}
    </div>
  );
}

function GoalItem({ 
  title, 
  progress, 
  completed 
}: { 
  title: string;
  progress: number;
  completed?: boolean;
}) {
  return (
    <div className={`p-4 rounded-lg ${
      completed ? 'bg-white/30' : 'bg-white/20'
    }`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">{title}</span>
        {completed && (
          <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      <div className="w-full bg-white/30 rounded-full h-2">
        <div 
          className="bg-white rounded-full h-2 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs mt-2 text-primary-100">{progress}%</p>
    </div>
  );
}