"use client";

import { motion } from "framer-motion";
import { 
  Sparkles, 
  BookOpen, 
  PlayCircle, 
  Target, 
  Clock, 
  TrendingUp,
  Filter,
  Search,
  CheckCircle,
  ArrowRight,
  Zap,
  BarChart3
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface AIRecommendation {
  id: string;
  subject: string;
  topic: string;
  priority: 'high' | 'medium' | 'low';
  confidence: number;
  prediction: string;
  reason: string;
  weakPoints: string[];
  resources: {
    videos: number;
    tasks: number;
    theory: number;
  };
  estimatedTime: string;
  deadline: string;
  xp: number;
  progress: number;
}

const recommendations: AIRecommendation[] = [
  {
    id: '1',
    subject: 'Физика',
    topic: 'Квантовая механика',
    priority: 'high',
    confidence: 82,
    prediction: '75% вероятность 3 на СОЧ',
    reason: 'Пропустил 2 урока + тест на 3.2',
    weakPoints: ['Формула Планка', 'Фотоэффект', 'Уравнение Эпштейна'],
    resources: { videos: 3, tasks: 5, theory: 2 },
    estimatedTime: '2 часа',
    deadline: '5 Февраля',
    xp: 150,
    progress: 40
  },
  {
    id: '2',
    subject: 'Алгебра',
    topic: 'Квадратные уравнения',
    priority: 'medium',
    confidence: 65,
    prediction: '80% вероятность 4 на СОЧ',
    reason: 'Низкие результаты контрольной',
    weakPoints: ['Дискриминант', 'Теорема Виета'],
    resources: { videos: 2, tasks: 8, theory: 1 },
    estimatedTime: '1.5 часа',
    deadline: '7 Февраля',
    xp: 120,
    progress: 75
  },
  {
    id: '3',
    subject: 'Химия',
    topic: 'Органическая химия',
    priority: 'low',
    confidence: 45,
    prediction: '60% вероятность 3 на СОЧ',
    reason: 'Пропуск ДЗ (5 раз)',
    weakPoints: ['Углеводороды', 'Спирты', 'Реакции'],
    resources: { videos: 4, tasks: 10, theory: 3 },
    estimatedTime: '3 часа',
    deadline: '10 Февраля',
    xp: 200,
    progress: 10
  },
];

export default function AIRecommendationsPage() {
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [search, setSearch] = useState('');

  const filtered = recommendations.filter(r => {
    const matchesFilter = filter === 'all' || r.priority === filter;
    const matchesSearch = r.subject.toLowerCase().includes(search.toLowerCase()) ||
                         r.topic.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default: return 'bg-blue-100 text-blue-700 border-blue-300';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const totalXP = recommendations.reduce((acc, r) => acc + r.xp, 0);
  const completedXP = recommendations.reduce((acc, r) => acc + Math.round((r.progress / 100) * r.xp), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-headline text-neutral-900">AI-Рекомендации</h1>
          <p className="text-neutral-600 mt-1">Персональный план улучшения успеваемости</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-gradient-to-r from-purple-500 to-primary-500 text-white rounded-lg text-sm font-medium flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span>XP: {completedXP} / {totalXP}</span>
          </div>
          <Link
            href="/student"
            className="px-4 py-2 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors text-sm font-medium"
          >
            ← На дашборд
          </Link>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border border-neutral-200 p-5">
          <p className="text-xs text-neutral-600 mb-1">Всего рекомендаций</p>
          <p className="text-2xl font-bold text-neutral-900">{recommendations.length}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl border border-neutral-200 p-5">
          <p className="text-xs text-neutral-600 mb-1">Высокий приоритет</p>
          <p className="text-2xl font-bold text-red-600">{recommendations.filter(r => r.priority === 'high').length}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl border border-neutral-200 p-5">
          <p className="text-xs text-neutral-600 mb-1">Средняя уверенность</p>
          <p className="text-2xl font-bold text-primary-600">
            {Math.round(recommendations.reduce((acc, r) => acc + r.confidence, 0) / recommendations.length)}%
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl border border-neutral-200 p-5">
          <p className="text-xs text-neutral-600 mb-1">Времени нужно</p>
          <p className="text-2xl font-bold text-tertiary-600">6.5 ч</p>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Поиск предмета или темы..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-neutral-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="px-4 py-2.5 bg-neutral-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">Все приоритеты</option>
          <option value="high">Высокий</option>
          <option value="medium">Средний</option>
          <option value="low">Низкий</option>
        </select>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {filtered.map((rec, index) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <Link href={`/student/ai/${rec.subject.toLowerCase()}`}>
              <div className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                      rec.subject === 'Физика' ? 'bg-red-100 text-red-600' :
                      rec.subject === 'Алгебра' ? 'bg-blue-100 text-blue-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {rec.subject[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 text-lg">{rec.subject}</h3>
                      <p className="text-sm text-neutral-600">{rec.topic}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(rec.priority)}`}>
                      {rec.priority === 'high' ? 'Высокий приоритет' : rec.priority === 'medium' ? 'Средний' : 'Низкий'}
                    </span>
                    <p className={`text-sm font-bold mt-1 ${getConfidenceColor(rec.confidence)}`}>
                      {rec.confidence}%
                    </p>
                  </div>
                </div>

                {/* Prediction & Reason */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-neutral-900 mb-1">{rec.prediction}</p>
                  <p className="text-sm text-neutral-600">{rec.reason}</p>
                </div>

                {/* Weak Points */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {rec.weakPoints.map((point, i) => (
                    <span key={i} className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded-md">
                      {point}
                    </span>
                  ))}
                </div>

                {/* Resources */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <PlayCircle className="w-4 h-4 text-red-500" />
                    <span>{rec.resources.videos} видео</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <Target className="w-4 h-4 text-blue-500" />
                    <span>{rec.resources.tasks} задач</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <BookOpen className="w-4 h-4 text-green-500" />
                    <span>{rec.resources.theory} теории</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-neutral-500">Прогресс выполнения</span>
                    <span className="font-medium">{rec.progress}%</span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all"
                      style={{ width: `${rec.progress}%` }}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                  <div className="flex items-center gap-4 text-sm text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {rec.estimatedTime}
                    </span>
                    <span>до {rec.deadline}</span>
                  </div>
                  <span className="text-sm font-medium text-purple-600">+{rec.xp} XP</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center">
            <p className="text-neutral-600 font-medium">Рекомендации не найдены</p>
            <p className="text-sm text-neutral-500 mt-1">Попробуйте изменить параметры фильтра</p>
          </div>
        )}
      </div>
    </div>
  );
}