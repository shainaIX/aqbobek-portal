"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  PlayCircle,
  BookOpen,
  Target,
  Clock,
  CheckCircle,
  Circle,
  ExternalLink,
  Zap,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getSubjectById, fetchSubjects, fetchStudentRecord } from "@/lib/ai-learning/database";
import { generateCardsAsync } from "@/lib/ai-learning/cardGenerator";
import type { TrainingCard } from "@/lib/ai-learning/types";

export default function TopicDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const topicId = params.topicId as string;

  const [card, setCard] = useState<TrainingCard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [completedResources, setCompletedResources] = useState<Set<string>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    video: true,
    theory: true,
    practice: true,
  });

  useEffect(() => {
    async function loadCard() {
      if (!user?.id) return;

      try {
        await Promise.all([
          fetchSubjects(),
          fetchStudentRecord(user.id),
        ]);

        const cards = await generateCardsAsync(user.id);
        const foundCard = cards.find((c) => c.topicId === topicId);

        if (foundCard) {
          setCard(foundCard);
          setProgress(foundCard.progress);
        }
      } catch (error) {
        console.error("Error loading card:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadCard();
  }, [topicId, user?.id]);

  const handleResourceComplete = (resourceUrl: string) => {
    const newCompleted = new Set(completedResources);
    if (newCompleted.has(resourceUrl)) {
      newCompleted.delete(resourceUrl);
    } else {
      newCompleted.add(resourceUrl);
    }
    setCompletedResources(newCompleted);

    if (card) {
      const totalResources = card.resources.length;
      const completedCount = newCompleted.size;
      const newProgress = Math.round((completedCount / totalResources) * 100);
      setProgress(newProgress);
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case "declining":
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-neutral-400" />;
    }
  };

  const getTrendLabel = (trend: string) => {
    return trend === "improving" ? "Растёт" : trend === "declining" ? "Падает" : "Стабильно";
  };

  const getTrendColor = (trend: string) => {
    return trend === "improving" ? "text-green-600" : trend === "declining" ? "text-red-600" : "text-neutral-400";
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 4) return "text-green-600 bg-green-100";
    if (grade >= 3) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getPriorityStyles = (priority: string) => {
    const styles = {
      critical: { border: "border-red-500", bg: "bg-red-50", text: "text-red-700", badge: "bg-red-100 text-red-700 border-red-300" },
      high: { border: "border-orange-500", bg: "bg-orange-50", text: "text-orange-700", badge: "bg-orange-100 text-orange-700 border-orange-300" },
      medium: { border: "border-yellow-500", bg: "bg-yellow-50", text: "text-yellow-700", badge: "bg-yellow-100 text-yellow-700 border-yellow-300" },
      low: { border: "border-blue-500", bg: "bg-blue-50", text: "text-blue-700", badge: "bg-blue-100 text-blue-700 border-blue-300" },
    };
    return styles[priority as keyof typeof styles] || styles.low;
  };

  const getPriorityLabel = (priority: string) => {
    const labels: Record<string, string> = {
      critical: "Критический",
      high: "Высокий",
      medium: "Средний",
      low: "Низкий",
    };
    return labels[priority] || priority;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600 font-medium">Загрузка темы...</p>
        </div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center">
        <h2 className="text-xl font-bold text-neutral-900 mb-2">Тема не найдена</h2>
        <p className="text-neutral-600 mb-4">Возможно, эта тема уже изучена или удалена.</p>
        <button
          onClick={() => router.push("/student/ai")}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          К рекомендациям
        </button>
      </div>
    );
  }

  const priorityStyle = getPriorityStyles(card.priority);
  const resourceGroups = {
    video: card.resources.filter((r) => r.type === "video"),
    theory: card.resources.filter((r) => r.type === "theory"),
    practice: card.resources.filter((r) => r.type === "practice"),
  };

  const completedCount = completedResources.size;
  const totalCount = card.resources.length;
  const isComplete = progress >= 100 || completedCount >= totalCount;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-600" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded text-xs font-bold ${priorityStyle.badge}`}>
              {getPriorityLabel(card.priority)}
            </span>
            <span className="text-xs text-neutral-500">Риск: {card.weaknessScore}/100</span>
          </div>
          <h1 className="text-2xl font-bold font-headline text-neutral-900 mt-1">
            {card.topic}
          </h1>
          <p className="text-neutral-600">{card.subject}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-3 py-1 rounded-lg text-lg font-bold ${getGradeColor(card.avgGrade)}`}>
              {card.avgGrade.toFixed(1)}
            </span>
            <span className={`flex items-center gap-1 text-sm ${getTrendColor(card.gradeTrend)}`}>
              {getTrendIcon(card.gradeTrend)}
              {getTrendLabel(card.gradeTrend)}
            </span>
          </div>
          <p className="text-xs text-neutral-500">до {card.deadline}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`rounded-2xl border-l-4 p-6 ${priorityStyle.bg} ${priorityStyle.border}`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-neutral-900 text-lg">
              Прогресс изучения
            </p>
            <p className="text-sm text-neutral-600 mt-1">
              Выполнено {completedCount} из {totalCount} ресурсов · {card.estimatedMinutes} мин
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-3xl font-bold text-neutral-900">{progress}%</p>
            </div>
            <div className="w-20 h-20 relative">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-neutral-200"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${(progress / 100) * 226} 226`}
                  strokeLinecap="round"
                  className="text-primary-500 transition-all duration-500"
                />
              </svg>
              {isComplete && (
                <CheckCircle className="w-6 h-6 text-green-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              )}
            </div>
          </div>
        </div>
        <div className="mt-4 h-3 bg-neutral-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className={`h-full rounded-full ${isComplete ? "bg-green-500" : "bg-gradient-to-r from-primary-500 to-primary-600"}`}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
      >
        <div className="bg-white rounded-xl border border-neutral-200 p-4">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-purple-500" />
            <p className="text-xs text-neutral-500">XP награда</p>
          </div>
          <p className="text-2xl font-bold text-purple-600">{card.xp} XP</p>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-4">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-tertiary-500" />
            <p className="text-xs text-neutral-500">Время</p>
          </div>
          <p className="text-2xl font-bold text-neutral-900">{card.estimatedMinutes} мин</p>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-4">
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-4 h-4 text-green-500" />
            <p className="text-xs text-neutral-500">Ресурсов</p>
          </div>
          <p className="text-2xl font-bold text-neutral-900">{card.resources.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-4">
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-4 h-4 text-blue-500" />
            <p className="text-xs text-neutral-500">Подтем</p>
          </div>
          <p className="text-2xl font-bold text-neutral-900">{card.subtopics.length}</p>
        </div>
      </motion.div>

      {card.signals.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-neutral-200 p-5"
        >
          <h3 className="font-semibold text-neutral-900 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-500" />
            Сигналы проблемы
          </h3>
          <div className="flex flex-wrap gap-2">
            {card.signals.map((signal, i) => (
              <span
                key={i}
                className="px-3 py-1.5 bg-neutral-100 text-neutral-700 text-sm rounded-lg"
              >
                {signal}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl border border-neutral-200 p-5"
      >
        <h3 className="font-semibold text-neutral-900 mb-3">Подтемы для изучения</h3>
        <div className="flex flex-wrap gap-2">
          {card.subtopics.map((subtopic, i) => (
            <span
              key={i}
              className="px-3 py-1.5 bg-primary-50 text-primary-700 text-sm rounded-lg font-medium"
            >
              {subtopic}
            </span>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {resourceGroups.video.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl border border-neutral-200 overflow-hidden"
          >
            <button
              onClick={() => toggleSection("video")}
              className="w-full p-5 flex items-center justify-between hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <PlayCircle className="w-5 h-5 text-red-500" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-neutral-900">Видео-уроки</h3>
                  <p className="text-sm text-neutral-500">
                    {completedResources.size} из {resourceGroups.video.length} выполнено
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-500">
                  {resourceGroups.video.length} видео
                </span>
                {expandedSections.video ? (
                  <ChevronUp className="w-5 h-5 text-neutral-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-neutral-400" />
                )}
              </div>
            </button>
            <AnimatePresence>
              {expandedSections.video && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="divide-y divide-neutral-100"
                >
                  {resourceGroups.video.map((resource, i) => (
                    <ResourceItem
                      key={i}
                      resource={resource}
                      isCompleted={completedResources.has(resource.url)}
                      onToggle={() => handleResourceComplete(resource.url)}
                      icon={<PlayCircle className="w-5 h-5 text-red-500" />}
                      colorClass="text-red-500"
                      bgClass="bg-red-50"
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {resourceGroups.theory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl border border-neutral-200 overflow-hidden"
          >
            <button
              onClick={() => toggleSection("theory")}
              className="w-full p-5 flex items-center justify-between hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-green-500" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-neutral-900">Теория</h3>
                  <p className="text-sm text-neutral-500">
                    Конспекты и статьи
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-500">
                  {resourceGroups.theory.length} материалов
                </span>
                {expandedSections.theory ? (
                  <ChevronUp className="w-5 h-5 text-neutral-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-neutral-400" />
                )}
              </div>
            </button>
            <AnimatePresence>
              {expandedSections.theory && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="divide-y divide-neutral-100"
                >
                  {resourceGroups.theory.map((resource, i) => (
                    <ResourceItem
                      key={i}
                      resource={resource}
                      isCompleted={completedResources.has(resource.url)}
                      onToggle={() => handleResourceComplete(resource.url)}
                      icon={<BookOpen className="w-5 h-5 text-green-500" />}
                      colorClass="text-green-500"
                      bgClass="bg-green-50"
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {resourceGroups.practice.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-xl border border-neutral-200 overflow-hidden"
          >
            <button
              onClick={() => toggleSection("practice")}
              className="w-full p-5 flex items-center justify-between hover:bg-neutral-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-blue-500" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-neutral-900">Практика</h3>
                  <p className="text-sm text-neutral-500">
                    Задачи и тесты для закрепления
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-500">
                  {resourceGroups.practice.length} заданий
                </span>
                {expandedSections.practice ? (
                  <ChevronUp className="w-5 h-5 text-neutral-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-neutral-400" />
                )}
              </div>
            </button>
            <AnimatePresence>
              {expandedSections.practice && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="divide-y divide-neutral-100"
                >
                  {resourceGroups.practice.map((resource, i) => (
                    <ResourceItem
                      key={i}
                      resource={resource}
                      isCompleted={completedResources.has(resource.url)}
                      onToggle={() => handleResourceComplete(resource.url)}
                      icon={<Target className="w-5 h-5 text-blue-500" />}
                      colorClass="text-blue-500"
                      bgClass="bg-blue-50"
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex items-center justify-between gap-4 bg-white rounded-xl border border-neutral-200 p-5"
      >
        <div>
          <p className="font-semibold text-neutral-900">Завершить изучение темы</p>
          <p className="text-sm text-neutral-600">
            {isComplete ? "Тема изучена! Отличная работа!" : "Пройдите все ресурсы, чтобы завершить тему"}
          </p>
        </div>
        <button
          onClick={() => {
            setProgress(100);
            router.push("/student/ai");
          }}
          disabled={!isComplete}
          className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${
            isComplete
              ? "bg-green-500 text-white hover:bg-green-600 shadow-lg hover:shadow-xl hover:scale-105"
              : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
          }`}
        >
          <CheckCircle className="w-5 h-5" />
          {isComplete ? "Изучено!" : "Завершить"}
        </button>
      </motion.div>
    </div>
  );
}

function ResourceItem({
  resource,
  isCompleted,
  onToggle,
  icon,
  colorClass,
  bgClass,
}: {
  resource: { title: string; url: string; duration?: string };
  isCompleted: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
  colorClass: string;
  bgClass: string;
}) {
  return (
    <div className="flex items-center gap-4 p-4 hover:bg-neutral-50 transition-all group">
      <button
        onClick={onToggle}
        className="flex-shrink-0 text-neutral-400 hover:text-primary-500 transition-colors p-1"
      >
        {isCompleted ? (
          <CheckCircle className="w-6 h-6 text-green-500" />
        ) : (
          <Circle className="w-6 h-6" />
        )}
      </button>
      <div className={`flex-shrink-0 w-10 h-10 ${bgClass} rounded-lg flex items-center justify-center`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`font-medium truncate ${isCompleted ? "text-neutral-400 line-through" : "text-neutral-900"}`}>
          {resource.title}
        </p>
        {resource.duration && (
          <p className="text-sm text-neutral-500">{resource.duration}</p>
        )}
      </div>
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-1 px-3 py-1.5 text-sm font-medium ${colorClass} hover:${bgClass} rounded-lg transition-colors`}
      >
        Открыть
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}
