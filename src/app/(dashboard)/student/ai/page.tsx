"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  PlayCircle,
  Target,
  Clock,
  Search,
  Zap,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Minus,
  ChevronRight,
  AlertTriangle,
  Brain,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { generateCards } from "@/lib/ai-learning/cardGenerator";
import { analyzeStudent } from "@/lib/ai-learning/analyzer";
import { getSubjectSummaries } from "@/lib/ai-learning/database";
import {
  analyzeWithGemini,
  buildGeminiRequest,
  getGeminiApiKey,
  isGeminiConfigured,
} from "@/lib/ai-learning/gemini";
import type { TrainingCard, GeminiAnalysisResponse } from "@/lib/ai-learning/types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function priorityLabel(p: TrainingCard["priority"]) {
  return p === "critical"
    ? "Критично"
    : p === "high"
    ? "Высокий"
    : p === "medium"
    ? "Средний"
    : "Низкий";
}

function priorityColor(p: TrainingCard["priority"]) {
  return p === "critical"
    ? "bg-red-100 text-red-700 border-red-300"
    : p === "high"
    ? "bg-orange-100 text-orange-700 border-orange-300"
    : p === "medium"
    ? "bg-yellow-100 text-yellow-700 border-yellow-300"
    : "bg-blue-100 text-blue-700 border-blue-300";
}

function trendIcon(trend: TrainingCard["gradeTrend"]) {
  if (trend === "improving") return <TrendingUp className="w-3.5 h-3.5 text-green-500" />;
  if (trend === "declining") return <TrendingDown className="w-3.5 h-3.5 text-red-500" />;
  return <Minus className="w-3.5 h-3.5 text-neutral-400" />;
}

function gradeColor(g: number) {
  if (g >= 5) return "text-green-600 bg-green-100";
  if (g >= 4) return "text-blue-600 bg-blue-100";
  if (g >= 3) return "text-yellow-600 bg-yellow-100";
  return "text-red-600 bg-red-100";
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AIRecommendationsPage() {
  const { user } = useAuth();
  const studentId = user?.id ?? "1";

  const [cards, setCards] = useState<TrainingCard[]>([]);
  const [geminiResponse, setGeminiResponse] =
    useState<GeminiAnalysisResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGeminiLoading, setIsGeminiLoading] = useState(false);
  const [geminiError, setGeminiError] = useState<string | null>(null);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [filter, setFilter] = useState<"all" | "critical" | "high" | "medium" | "low">("all");
  const [search, setSearch] = useState("");

  // Subject summaries are always available (no AI needed)
  const subjectSummaries = getSubjectSummaries(studentId);
  const totalXP = cards.reduce((acc, c) => acc + c.xp, 0);
  const completedXP = cards.reduce(
    (acc, c) => acc + Math.round((c.progress / 100) * c.xp),
    0
  );

  // ── Generate cards (local analysis) ────────────────────────────────────────
  async function handleGenerate() {
    setIsAnalyzing(true);
    setGeminiResponse(null);
    setGeminiError(null);

    // Small delay so the loading animation is visible
    await new Promise((r) => setTimeout(r, 600));
    const generated = generateCards(studentId);
    setCards(generated);
    setHasGenerated(true);
    setIsAnalyzing(false);

    // If Gemini API key is configured, auto-enhance
    const apiKey = getGeminiApiKey();
    if (apiKey && generated.length > 0) {
      setIsGeminiLoading(true);
      try {
        const weakTopics = analyzeStudent(studentId);
        const request = buildGeminiRequest(
          user?.name ?? "Ученик",
          weakTopics,
          subjectSummaries
        );
        const response = await analyzeWithGemini(request, apiKey);
        setGeminiResponse(response);
      } catch (err) {
        setGeminiError(
          err instanceof Error ? err.message : "Ошибка Gemini API"
        );
      } finally {
        setIsGeminiLoading(false);
      }
    }
  }

  // ── Filtered cards ──────────────────────────────────────────────────────────
  const filtered = cards.filter((c) => {
    const matchFilter = filter === "all" || c.priority === filter;
    const matchSearch =
      c.subject.toLowerCase().includes(search.toLowerCase()) ||
      c.topic.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  // ── Gemini insight for a card ───────────────────────────────────────────────
  function geminiInsight(topicId: string) {
    return geminiResponse?.enhancedCards.find((e) => e.topicId === topicId);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold font-headline text-neutral-900">
            AI-Рекомендации
          </h1>
          <p className="text-neutral-600 mt-1">
            Персональный план улучшения успеваемости
          </p>
        </div>
        {hasGenerated && (
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-gradient-to-r from-purple-500 to-primary-500 text-white rounded-lg text-sm font-medium flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>
                XP: {completedXP} / {totalXP}
              </span>
            </div>
            <Link
              href="/student"
              className="px-4 py-2 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors text-sm font-medium"
            >
              ← На дашборд
            </Link>
          </div>
        )}
      </motion.div>

      {/* Subject overview (always visible) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {subjectSummaries.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl border border-neutral-200 p-4 text-center"
          >
            <div
              className={`w-8 h-8 rounded-lg mx-auto mb-2 ${s.color} flex items-center justify-center`}
            >
              <span className="text-white text-xs font-bold">{s.name[0]}</span>
            </div>
            <p className="text-xs text-neutral-500 mb-1 truncate">{s.name}</p>
            <span
              className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${gradeColor(s.grade)}`}
            >
              {s.grade}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Generate button / loading / Gemini overall insight */}
      {!hasGenerated ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-12 text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-xl font-bold font-headline text-neutral-900 mb-2">
            Персональный AI-анализ
          </h2>
          <p className="text-neutral-600 mb-2 max-w-md mx-auto">
            AI проанализирует твои оценки, посещаемость и динамику по каждой теме,
            и составит индивидуальный план обучения.
          </p>
          {isGeminiConfigured() && (
            <p className="text-xs text-purple-600 mb-6 font-medium flex items-center justify-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Gemini AI подключён — дополнит анализ персональными инсайтами
            </p>
          )}
          {!isGeminiConfigured() && (
            <p className="text-xs text-neutral-400 mb-6">
              Добавь NEXT_PUBLIC_GEMINI_API_KEY в .env.local для AI-инсайтов от Gemini
            </p>
          )}
          <button
            onClick={handleGenerate}
            disabled={isAnalyzing}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-primary-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-60 disabled:scale-100"
          >
            {isAnalyzing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Анализируем данные...
              </>
            ) : (
              <>
                <Brain className="w-5 h-5" />
                Получить AI-анализ
              </>
            )}
          </button>
        </motion.div>
      ) : (
        <>
          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-neutral-200 p-5"
            >
              <p className="text-xs text-neutral-600 mb-1">Тем требует внимания</p>
              <p className="text-2xl font-bold text-neutral-900">{cards.length}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-white rounded-xl border border-neutral-200 p-5"
            >
              <p className="text-xs text-neutral-600 mb-1">Критических</p>
              <p className="text-2xl font-bold text-red-600">
                {cards.filter((c) => c.priority === "critical").length}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl border border-neutral-200 p-5"
            >
              <p className="text-xs text-neutral-600 mb-1">Общее время</p>
              <p className="text-2xl font-bold text-tertiary-600">
                {Math.round(
                  cards.reduce((s, c) => s + c.estimatedMinutes, 0) / 60
                )}
                ч
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-xl border border-neutral-200 p-5"
            >
              <p className="text-xs text-neutral-600 mb-1">XP за всё</p>
              <p className="text-2xl font-bold text-purple-600">{totalXP}</p>
            </motion.div>
          </div>

          {/* Gemini overall insight */}
          <AnimatePresence>
            {isGeminiLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-gradient-to-r from-purple-50 to-primary-50 border border-purple-200 rounded-xl p-4 flex items-center gap-3"
              >
                <div className="w-5 h-5 border-2 border-purple-400/40 border-t-purple-500 rounded-full animate-spin flex-shrink-0" />
                <p className="text-sm text-purple-700 font-medium">
                  Gemini анализирует твои данные...
                </p>
              </motion.div>
            )}
            {geminiError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3"
              >
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-700">Gemini: {geminiError}</p>
              </motion.div>
            )}
            {geminiResponse?.overallInsight && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-purple-50 to-primary-50 border border-purple-200 rounded-xl p-5 flex items-start gap-4"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-purple-800 mb-1">
                    Gemini — общий анализ
                  </p>
                  <p className="text-sm text-purple-700 leading-relaxed">
                    {geminiResponse.overallInsight}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
              onChange={(e) =>
                setFilter(
                  e.target.value as "all" | "critical" | "high" | "medium" | "low"
                )
              }
              className="px-4 py-2.5 bg-neutral-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">Все приоритеты</option>
              <option value="critical">Критично</option>
              <option value="high">Высокий</option>
              <option value="medium">Средний</option>
              <option value="low">Низкий</option>
            </select>
            <button
              onClick={handleGenerate}
              className="px-4 py-2.5 bg-white border border-neutral-200 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors flex items-center gap-2"
            >
              <Brain className="w-4 h-4" />
              Обновить анализ
            </button>
          </div>

          {/* Cards */}
          <div className="space-y-4">
            {filtered.map((card, index) => {
              const insight = geminiInsight(card.topicId);
              const resourceCounts = {
                videos: card.resources.filter((r) => r.type === "video").length,
                theory: card.resources.filter((r) => r.type === "theory").length,
                practice: card.resources.filter((r) => r.type === "practice").length,
              };

              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg bg-gradient-to-br ${card.gradientFrom} ${card.gradientTo} text-white shadow-sm`}
                        >
                          {card.subject[0]}
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-900 text-lg leading-tight">
                            {card.subject}
                          </h3>
                          <p className="text-sm text-neutral-600">{card.topic}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`px-2 py-0.5 rounded text-xs font-bold ${gradeColor(
                                Math.round(card.avgGrade)
                              )}`}
                            >
                              {card.avgGrade.toFixed(1)}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-neutral-500">
                              {trendIcon(card.gradeTrend)}
                              {card.gradeTrend === "improving"
                                ? "Растёт"
                                : card.gradeTrend === "declining"
                                ? "Падает"
                                : "Стабильно"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold border ${priorityColor(
                            card.priority
                          )}`}
                        >
                          {priorityLabel(card.priority)}
                        </span>
                        <p className="text-xs text-neutral-500 mt-1.5">
                          Риск: {card.weaknessScore}/100
                        </p>
                      </div>
                    </div>

                    {/* Signals */}
                    {card.signals.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {card.signals.map((sig, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-md"
                          >
                            {sig}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Subtopics */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {card.subtopics.map((st, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-md font-medium"
                        >
                          {st}
                        </span>
                      ))}
                    </div>

                    {/* Gemini insight (if available) */}
                    <AnimatePresence>
                      {insight && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="bg-gradient-to-r from-purple-50 to-primary-50 border border-purple-200 rounded-lg p-3 mb-4"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                            <span className="text-xs font-semibold text-purple-700">
                              Gemini AI
                            </span>
                            <span className="text-xs text-purple-500">
                              · {insight.estimatedDays} д. на освоение
                            </span>
                          </div>
                          <p className="text-xs text-purple-800 leading-relaxed mb-1">
                            {insight.aiInsight}
                          </p>
                          <p className="text-xs text-purple-700 font-medium">
                            Стратегия: {insight.suggestedApproach}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Resources row */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <PlayCircle className="w-4 h-4 text-red-500" />
                        <span>{resourceCounts.videos} видео</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <BookOpen className="w-4 h-4 text-green-500" />
                        <span>{resourceCounts.theory} теории</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <Target className="w-4 h-4 text-blue-500" />
                        <span>{resourceCounts.practice} задач</span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-neutral-500">Прогресс выполнения</span>
                        <span className="font-medium">{card.progress}%</span>
                      </div>
                      <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all"
                          style={{ width: `${card.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                      <div className="flex items-center gap-4 text-sm text-neutral-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {card.estimatedMinutes} мин
                        </span>
                        <span>до {card.deadline}</span>
                      </div>
                      <Link
                        href={`/student/ai/${card.topicId}`}
                        className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                      >
                        Начать
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Priority accent bar */}
                  <div
                    className={`h-1 ${
                      card.priority === "critical"
                        ? "bg-red-500"
                        : card.priority === "high"
                        ? "bg-orange-400"
                        : card.priority === "medium"
                        ? "bg-yellow-400"
                        : "bg-blue-400"
                    }`}
                  />
                </motion.div>
              );
            })}

            {filtered.length === 0 && hasGenerated && (
              <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center">
                <p className="text-neutral-600 font-medium">
                  Рекомендации не найдены
                </p>
                <p className="text-sm text-neutral-500 mt-1">
                  Попробуйте изменить фильтр или поиск
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
