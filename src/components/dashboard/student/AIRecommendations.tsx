"use client";

import { motion } from "framer-motion";
import { 
  Sparkles, 
  Target, 
  PlayCircle, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight,
  AlertCircle,
  TrendingUp
} from "lucide-react";

interface Recommendation {
  id: string;
  subject: string;
  probability: number;
  message: string;
  actions: {
    icon: 'video' | 'book' | 'task';
    text: string;
    completed?: boolean;
  }[];
  priority: 'high' | 'medium' | 'low';
}

interface AIRecommendationsProps {
  recommendations?: Recommendation[];
}

export default function AIRecommendations({ recommendations }: AIRecommendationsProps) {
  // Mock данные если не переданы
  const defaultRecommendations: Recommendation[] = [
    {
      id: '1',
      subject: 'Физика',
      probability: 82,
      message: 'Вероятность успешной сдачи СОЧ по теме «Квантовая механика»',
      actions: [
        { icon: 'video', text: 'Посмотрите видеолекцию №12', completed: false },
        { icon: 'task', text: 'Решите 5 практических задач', completed: false },
        { icon: 'book', text: 'Повторите формулы из главы 3', completed: true },
      ],
      priority: 'high',
    },
    {
      id: '2',
      subject: 'Алгебра',
      probability: 95,
      message: 'Отличная подготовка к контрольной работе',
      actions: [
        { icon: 'task', text: 'Продолжайте в том же духе!', completed: false },
        { icon: 'book', text: 'Попробуйте задачи повышенной сложности', completed: false },
      ],
      priority: 'low',
    },
    {
      id: '3',
      subject: 'История',
      probability: 58,
      message: 'Требуется повторение материала по теме «Вторая мировая война»',
      actions: [
        { icon: 'book', text: 'Прочитайте конспект за 15 марта', completed: false },
        { icon: 'video', text: 'Посмотрите документальный фильм', completed: false },
        { icon: 'task', text: 'Составьте хронологию событий', completed: false },
      ],
      priority: 'high',
    },
  ];

  const displayRecommendations = recommendations || defaultRecommendations;

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'text-green-600 bg-green-100 border-green-300';
    if (probability >= 60) return 'text-yellow-600 bg-yellow-100 border-yellow-300';
    return 'text-red-600 bg-red-100 border-red-300';
  };

  const getProbabilityLabel = (probability: number) => {
    if (probability >= 80) return 'Отлично';
    if (probability >= 60) return 'Хорошо';
    return 'Внимание';
  };

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-l-red-500';
      case 'medium':
        return 'border-l-4 border-l-yellow-500';
      default:
        return 'border-l-4 border-l-green-500';
    }
  };

  const ActionIcon = {
    video: PlayCircle,
    book: BookOpen,
    task: Target,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold text-neutral-900">
              AI-Рекомендации
            </h3>
            <p className="text-xs text-neutral-500">
              Персональные советы на основе успеваемости
            </p>
          </div>
        </div>
        <button className="text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors flex items-center gap-1">
          Все рекомендации
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Recommendations List */}
      <div className="divide-y divide-neutral-100">
        {displayRecommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`p-5 ${getPriorityStyles(rec.priority)} hover:bg-neutral-50 transition-colors`}
          >
            {/* Subject & Probability */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold font-headline text-lg ${
                  rec.priority === 'high' ? 'bg-red-100 text-red-600' :
                  rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  {rec.subject[0]}
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900">{rec.subject}</h4>
                  <p className="text-sm text-neutral-600 mt-0.5">{rec.message}</p>
                </div>
              </div>
              <div className={`px-3 py-1.5 rounded-full text-sm font-bold border ${getProbabilityColor(rec.probability)}`}>
                {rec.probability}%
              </div>
            </div>

            {/* Probability Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-neutral-500">Уверенность AI</span>
                <span className="font-medium">{getProbabilityLabel(rec.probability)}</span>
              </div>
              <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${rec.probability}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                  className={`h-full rounded-full ${
                    rec.probability >= 80 ? 'bg-green-500' :
                    rec.probability >= 60 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              {rec.actions.map((action, actionIndex) => {
                const Icon = ActionIcon[action.icon];
                return (
                  <motion.div
                    key={actionIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + actionIndex * 0.05 + 0.5 }}
                    className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors cursor-pointer ${
                      action.completed ? 'bg-green-50' : 'bg-neutral-50 hover:bg-neutral-100'
                    }`}
                  >
                    <div className={`flex-shrink-0 ${
                      action.completed ? 'text-green-600' : 'text-neutral-400'
                    }`}>
                      {action.completed ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <span className={`text-sm flex-1 ${
                      action.completed ? 'text-green-700 line-through' : 'text-neutral-700'
                    }`}>
                      {action.text}
                    </span>
                    {!action.completed && (
                      <button className="text-xs font-medium text-primary-600 hover:text-primary-700">
                        Выполнить
                      </button>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Priority Indicator */}
            {rec.priority === 'high' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-3 flex items-center gap-2 text-xs text-red-600 bg-red-50 p-2 rounded-lg"
              >
                <AlertCircle className="w-4 h-4" />
                <span className="font-medium">Рекомендуется выполнить в ближайшие 2 дня</span>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 bg-gradient-to-r from-purple-50 to-primary-50 border-t border-neutral-200">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-primary-600" />
          <div className="flex-1">
            <p className="text-sm font-medium text-neutral-900">
              Общий прогресс подготовки
            </p>
            <p className="text-xs text-neutral-500">
              +12% за последнюю неделю
            </p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold font-headline text-primary-600">
              78%
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}