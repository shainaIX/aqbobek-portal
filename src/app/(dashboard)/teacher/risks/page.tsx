"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Search,
  Download,
  Mail,
  Phone,
  X,
  CheckCircle,
  Clock,
  BookOpen,
  Calendar as CalendarIcon,
  BarChart3,
  Eye,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  ShieldAlert,
} from "lucide-react";
import { useState } from "react";

interface AtRiskStudent {
  id: number;
  name: string;
  class: string;
  avatar: string;
  riskLevel: "high" | "medium" | "low";
  gpa: number;
  gpaChange: number;
  subject: string;
  reason: string;
  missedLessons: number;
  lastAttendance: string;
  parentEmail: string;
  parentPhone: string;
  riskCategories: {
    academic: boolean;
    attendance: boolean;
    behavior: boolean;
  };
  interventions: {
    date: string;
    action: string;
    status: "completed" | "pending";
  }[];
  threats: string[];
  recommendations: string[];
}

const atRiskStudents: AtRiskStudent[] = [
  {
    id: 1,
    name: "Темуров Али",
    class: "10\"А\"",
    avatar: "ТА",
    riskLevel: "high",
    gpa: 3.2,
    gpaChange: -0.8,
    subject: "Физика",
    reason: "Резкое падение успеваемости за 2 недели",
    missedLessons: 4,
    lastAttendance: "18.01.2025",
    parentEmail: "temurov@email.kz",
    parentPhone: "+7 (777) 111-22-33",
    riskCategories: { academic: true, attendance: true, behavior: false },
    interventions: [
      { date: "20.01.2025", action: "Разговор с учеником", status: "completed" },
      { date: "22.01.2025", action: "Звонок родителям", status: "pending" },
    ],
    threats: [
      "Критическое падение GPA на 0.8 пунктов за 2 недели",
      "4 пропуска подряд без уважительной причины",
      "Провалены 2 контрольные работы по физике",
      "Риск не быть допущенным к итоговой аттестации",
    ],
    recommendations: [
      "Организовать дополнительные занятия по физике 2 раза в неделю",
      "Провести встречу с родителями для выяснения причин пропусков",
      "Назначить куратора из числа успевающих одноклассников",
      "Составить индивидуальный план наверстывания пропущенного материала",
      "Еженедельно отслеживать прогресс и корректировать план",
    ],
  },
  {
    id: 2,
    name: "Ким Дмитрий",
    class: "10\"Б\"",
    avatar: "КД",
    riskLevel: "medium",
    gpa: 3.5,
    gpaChange: -0.5,
    subject: "Алгебра",
    reason: "Пропуск домашних заданий (5 раз)",
    missedLessons: 2,
    lastAttendance: "24.01.2025",
    parentEmail: "kim@email.kz",
    parentPhone: "+7 (777) 222-33-44",
    riskCategories: { academic: true, attendance: false, behavior: false },
    interventions: [
      { date: "23.01.2025", action: "Дополнительное задание", status: "completed" },
    ],
    threats: [
      "Систематический пропуск домашних заданий (5 из 7)",
      "Снижение GPA на 0.5 пункта за месяц",
      "Пробелы в базовых темах алгебры",
    ],
    recommendations: [
      "Ввести ежедневный контроль выполнения ДЗ через дневник",
      "Предоставить структурированные материалы для самостоятельной работы",
      "Провести беседу о важности регулярной работы",
      "Информировать родителей о пропусках домашних заданий",
    ],
  },
  {
    id: 3,
    name: "Иванова Мария",
    class: "9\"А\"",
    avatar: "ИМ",
    riskLevel: "medium",
    gpa: 3.6,
    gpaChange: -0.4,
    subject: "Химия",
    reason: "Низкие результаты контрольных работ",
    missedLessons: 1,
    lastAttendance: "25.01.2025",
    parentEmail: "ivanova@email.kz",
    parentPhone: "+7 (777) 333-44-55",
    riskCategories: { academic: true, attendance: false, behavior: false },
    interventions: [],
    threats: [
      "Низкие баллы в 3 последних контрольных работах по химии",
      "Снижение GPA на 0.4 пункта",
      "Риск не сдать полугодовую аттестацию по химии",
    ],
    recommendations: [
      "Провести диагностику пробелов в знаниях по химии",
      "Назначить консультации с преподавателем химии",
      "Предложить дополнительные тренировочные тесты",
      "Мониторить результаты следующих контрольных работ",
    ],
  },
  {
    id: 4,
    name: "Петров Сергей",
    class: "10\"А\"",
    avatar: "ПС",
    riskLevel: "low",
    gpa: 3.8,
    gpaChange: -0.2,
    subject: "Литература",
    reason: "Снижение активности на уроках",
    missedLessons: 0,
    lastAttendance: "26.01.2025",
    parentEmail: "petrov@email.kz",
    parentPhone: "+7 (777) 444-55-66",
    riskCategories: { academic: false, attendance: false, behavior: true },
    interventions: [],
    threats: [
      "Заметное снижение активности и вовлечённости на уроках",
      "Небольшое снижение GPA на 0.2 пункта",
      "Возможные психоэмоциональные трудности",
    ],
    recommendations: [
      "Провести индивидуальную беседу для выяснения причин снижения активности",
      "Предложить более интересные и творческие задания по литературе",
      "Наблюдать за изменениями в поведении в течение 2 недель",
    ],
  },
];

function RiskLevelBadge({ level }: { level: string }) {
  const config = {
    high: { color: "bg-red-100 text-red-700 border-red-300", label: "Высокий риск" },
    medium: { color: "bg-yellow-100 text-yellow-700 border-yellow-300", label: "Средний риск" },
    low: { color: "bg-blue-100 text-blue-700 border-blue-300", label: "Низкий риск" },
  };
  const { color, label } = config[level as keyof typeof config];
  return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${color}`}>
      {label}
    </span>
  );
}

function RiskCategoryBadge({ category, active }: { category: string; active: boolean }) {
  const config = {
    academic: { icon: BookOpen, label: "Успеваемость" },
    attendance: { icon: CalendarIcon, label: "Посещаемость" },
    behavior: { icon: MessageSquare, label: "Поведение" },
  };
  const { icon: Icon, label } = config[category as keyof typeof config];
  return (
      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
          active ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-400"
      }`}>
        <Icon className="w-3 h-3" />
        {label}
      </div>
  );
}

function ExpandedInsights({ student }: { student: AtRiskStudent }) {
  return (
      <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
      >
        <div className="px-4 pb-4 border-t border-neutral-100 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-red-100 rounded-lg flex items-center justify-center">
                <ShieldAlert className="w-4 h-4 text-red-600" />
              </div>
              <h4 className="text-sm font-bold text-red-900">Угрозы</h4>
            </div>
            <ul className="space-y-2">
              {student.threats.map((threat, i) => (
                  <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="flex items-start gap-2"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span className="text-xs text-red-800 leading-snug">{threat}</span>
                  </motion.li>
              ))}
            </ul>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-emerald-600" />
              </div>
              <h4 className="text-sm font-bold text-emerald-900">Рекомендации</h4>
            </div>
            <ul className="space-y-2">
              {student.recommendations.map((rec, i) => (
                  <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 + 0.1 }}
                      className="flex items-start gap-2"
                  >
                <span className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-emerald-200 text-emerald-700 text-[9px] font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                    <span className="text-xs text-emerald-800 leading-snug">{rec}</span>
                  </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
  );
}

function StudentDetailModal({
                              student,
                              onClose,
                            }: {
  student: AtRiskStudent;
  onClose: () => void;
}) {
  return (
      <AnimatePresence>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
          <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >

            <div className="sticky top-0 bg-white border-b border-neutral-200 p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-neutral-300 to-neutral-400 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {student.avatar}
                </div>
                <div>
                  <h2 className="text-xl font-bold font-headline text-neutral-900">{student.name}</h2>
                  <p className="text-sm text-neutral-500">{student.class}</p>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            <div className="p-5 space-y-6">
              <div className="flex items-center justify-between">
                <RiskLevelBadge level={student.riskLevel} />
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-secondary-500 text-white text-sm font-medium rounded-lg hover:bg-secondary-600 transition-colors">
                    <Mail className="w-4 h-4" />
                    Родителям
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 text-neutral-700 text-sm font-medium rounded-lg hover:bg-neutral-200 transition-colors">
                    <Eye className="w-4 h-4" />
                    Профиль
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-neutral-50 rounded-xl">
                  <p className="text-xs text-neutral-500 mb-1">Средний балл</p>
                  <p className="text-2xl font-bold text-neutral-900">{student.gpa}</p>
                  <p className={`text-xs font-medium flex items-center gap-1 mt-1 ${student.gpaChange < 0 ? "text-red-600" : "text-green-600"}`}>
                    {student.gpaChange < 0 ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                    {student.gpaChange > 0 ? "+" : ""}{student.gpaChange}
                  </p>
                </div>
                <div className="p-4 bg-neutral-50 rounded-xl">
                  <p className="text-xs text-neutral-500 mb-1">Пропуски</p>
                  <p className="text-2xl font-bold text-neutral-900">{student.missedLessons}</p>
                  <p className="text-xs text-neutral-500 mt-1">уроков</p>
                </div>
                <div className="p-4 bg-neutral-50 rounded-xl">
                  <p className="text-xs text-neutral-500 mb-1">Проблема</p>
                  <p className="text-sm font-bold text-neutral-900">{student.subject}</p>
                </div>
                <div className="p-4 bg-neutral-50 rounded-xl">
                  <p className="text-xs text-neutral-500 mb-1">Посещал</p>
                  <p className="text-sm font-bold text-neutral-900">{student.lastAttendance}</p>
                </div>
              </div>

              <div>
                <h3 className="font-headline text-sm font-semibold text-neutral-900 mb-3">Категории риска</h3>
                <div className="flex flex-wrap gap-2">
                  <RiskCategoryBadge category="academic" active={student.riskCategories.academic} />
                  <RiskCategoryBadge category="attendance" active={student.riskCategories.attendance} />
                  <RiskCategoryBadge category="behavior" active={student.riskCategories.behavior} />
                </div>
              </div>

              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-900">Причина риска</p>
                    <p className="text-sm text-red-700 mt-1">{student.reason}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldAlert className="w-4 h-4 text-red-600" />
                    <h3 className="text-sm font-bold text-red-900">Угрозы</h3>
                  </div>
                  <ul className="space-y-2">
                    {student.threats.map((t, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                          <span className="text-xs text-red-800 leading-snug">{t}</span>
                        </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-4 h-4 text-emerald-600" />
                    <h3 className="text-sm font-bold text-emerald-900">Рекомендации</h3>
                  </div>
                  <ul className="space-y-2">
                    {student.recommendations.map((r, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="flex-shrink-0 w-4 h-4 rounded-full bg-emerald-200 text-emerald-700 text-[9px] font-bold flex items-center justify-center">{i + 1}</span>
                          <span className="text-xs text-emerald-800 leading-snug">{r}</span>
                        </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="font-headline text-sm font-semibold text-neutral-900 mb-3">Контакты родителей</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                    <Mail className="w-5 h-5 text-neutral-400" />
                    <div>
                      <p className="text-xs text-neutral-500">Email</p>
                      <p className="text-sm font-medium text-neutral-900">{student.parentEmail}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                    <Phone className="w-5 h-5 text-neutral-400" />
                    <div>
                      <p className="text-xs text-neutral-500">Телефон</p>
                      <p className="text-sm font-medium text-neutral-900">{student.parentPhone}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-headline text-sm font-semibold text-neutral-900 mb-3">Предпринятые меры</h3>
                {student.interventions.length > 0 ? (
                    <div className="space-y-2">
                      {student.interventions.map((intervention, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              {intervention.status === "completed" ? (
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                              ) : (
                                  <Clock className="w-5 h-5 text-yellow-500" />
                              )}
                              <div>
                                <p className="text-sm font-medium text-neutral-900">{intervention.action}</p>
                                <p className="text-xs text-neutral-500">{intervention.date}</p>
                              </div>
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                intervention.status === "completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                            }`}>
                        {intervention.status === "completed" ? "Выполнено" : "В ожидании"}
                      </span>
                          </div>
                      ))}
                    </div>
                ) : (
                    <div className="p-4 bg-neutral-50 rounded-lg text-center">
                      <p className="text-sm text-neutral-500">Меры ещё не предпринимались</p>
                      <button className="mt-2 text-sm font-medium text-secondary-600 hover:text-secondary-700">+ Добавить меру</button>
                    </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-200">
                <button className="flex-1 px-4 py-2.5 bg-secondary-500 text-white font-medium rounded-lg hover:bg-secondary-600 transition-colors flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Написать ученику
                </button>
                <button className="flex-1 px-4 py-2.5 bg-neutral-100 text-neutral-700 font-medium rounded-lg hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Написать родителям
                </button>
                <button className="flex-1 px-4 py-2.5 bg-neutral-100 text-neutral-700 font-medium rounded-lg hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Аналитика
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
  );
}

export default function TeacherRisksPage() {
  const [selectedStudent, setSelectedStudent] = useState<AtRiskStudent | null>(null);
  const [expandedStudentId, setExpandedStudentId] = useState<number | null>(null);
  const [filterRiskLevel, setFilterRiskLevel] = useState<string>("all");
  const [filterClass, setFilterClass] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredStudents = atRiskStudents.filter((student) => {
    const matchesRiskLevel = filterRiskLevel === "all" || student.riskLevel === filterRiskLevel;
    const matchesClass = filterClass === "all" || student.class.includes(filterClass);
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRiskLevel && matchesClass && matchesSearch;
  });

  const stats = {
    total: atRiskStudents.length,
    high: atRiskStudents.filter((s) => s.riskLevel === "high").length,
    medium: atRiskStudents.filter((s) => s.riskLevel === "medium").length,
    low: atRiskStudents.filter((s) => s.riskLevel === "low").length,
  };

  const toggleExpand = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedStudentId((prev) => (prev === id ? null : id));
  };

  return (
      <div className="space-y-6">

        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold font-headline text-neutral-900">Early Warning System</h1>
            <p className="text-neutral-600 mt-1">Ученики в зоне риска ({stats.total})</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Экспорт</span>
          </button>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: AlertTriangle, color: "neutral", label: "Всего", value: stats.total, sub: "учеников в риске" },
            { icon: AlertTriangle, color: "red", label: "Высокий", value: stats.high, sub: "требуют внимания" },
            { icon: AlertTriangle, color: "yellow", label: "Средний", value: stats.medium, sub: "требуют контроля" },
            { icon: AlertTriangle, color: "blue", label: "Низкий", value: stats.low, sub: "требуют наблюдения" },
          ].map(({ icon: Icon, color, label, value, sub }, i) => (
              <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-white rounded-xl border p-5 ${
                      color === "neutral" ? "border-neutral-200" :
                          color === "red" ? "border-red-200 bg-red-50/50" :
                              color === "yellow" ? "border-yellow-200 bg-yellow-50/50" :
                                  "border-blue-200 bg-blue-50/50"
                  }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon className={`w-6 h-6 ${
                      color === "neutral" ? "text-neutral-600" :
                          color === "red" ? "text-red-600" :
                              color === "yellow" ? "text-yellow-600" : "text-blue-600"
                  }`} />
                  <span className={`text-sm ${
                      color === "neutral" ? "text-neutral-600" :
                          color === "red" ? "text-red-600" :
                              color === "yellow" ? "text-yellow-600" : "text-blue-600"
                  }`}>{label}</span>
                </div>
                <p className={`text-3xl font-bold font-headline ${
                    color === "neutral" ? "text-neutral-900" :
                        color === "red" ? "text-red-600" :
                            color === "yellow" ? "text-yellow-600" : "text-blue-600"
                }`}>{value}</p>
                <p className={`text-sm mt-1 ${
                    color === "neutral" ? "text-neutral-500" :
                        color === "red" ? "text-red-500" :
                            color === "yellow" ? "text-yellow-500" : "text-blue-500"
                }`}>{sub}</p>
              </motion.div>
          ))}
        </div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl border border-neutral-200 p-4"
        >
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                  type="text"
                  placeholder="Поиск ученика..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-100 rounded-lg border-2 border-transparent focus:border-secondary-500 focus:bg-white focus:outline-none transition-all text-sm"
              />
            </div>
            <select
                value={filterRiskLevel}
                onChange={(e) => setFilterRiskLevel(e.target.value)}
                className="px-4 py-2.5 bg-neutral-100 rounded-lg border-2 border-transparent focus:border-secondary-500 focus:bg-white focus:outline-none transition-all text-sm"
            >
              <option value="all">Все уровни</option>
              <option value="high">Высокий риск</option>
              <option value="medium">Средний риск</option>
              <option value="low">Низкий риск</option>
            </select>
            <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="px-4 py-2.5 bg-neutral-100 rounded-lg border-2 border-transparent focus:border-secondary-500 focus:bg-white focus:outline-none transition-all text-sm"
            >
              <option value="all">Все классы</option>
              <option value="10">10 классы</option>
              <option value="9">9 классы</option>
              <option value="11">11 классы</option>
            </select>
            {(filterRiskLevel !== "all" || filterClass !== "all" || searchQuery) && (
                <button
                    onClick={() => { setFilterRiskLevel("all"); setFilterClass("all"); setSearchQuery(""); }}
                    className="px-4 py-2.5 text-sm font-medium text-neutral-600 hover:text-neutral-900"
                >
                  Сбросить
                </button>
            )}
          </div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
        >
          <div className="divide-y divide-neutral-100">
            {filteredStudents.length > 0 ? (
                filteredStudents.map((student, index) => {
                  const isExpanded = expandedStudentId === student.id;
                  return (
                      <motion.div
                          key={student.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 + 0.6 }}
                          className={`transition-colors ${isExpanded ? "bg-neutral-50/70" : "hover:bg-neutral-50"}`}
                      >

                        <div
                            onClick={() => setSelectedStudent(student)}
                            className="p-4 cursor-pointer"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-neutral-300 to-neutral-400 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                              {student.avatar}
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h4 className="font-semibold text-neutral-900">{student.name}</h4>
                                  <p className="text-sm text-neutral-500">{student.class}</p>
                                </div>
                                <RiskLevelBadge level={student.riskLevel} />
                              </div>

                              <div className="flex flex-wrap gap-2 mb-3">
                                <RiskCategoryBadge category="academic" active={student.riskCategories.academic} />
                                <RiskCategoryBadge category="attendance" active={student.riskCategories.attendance} />
                                <RiskCategoryBadge category="behavior" active={student.riskCategories.behavior} />
                              </div>

                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                                <div>
                                  <p className="text-xs text-neutral-500">Средний балл</p>
                                  <p className="text-sm font-bold text-neutral-900">{student.gpa}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-neutral-500">Изменение</p>
                                  <p className={`text-sm font-bold flex items-center gap-1 ${student.gpaChange < 0 ? "text-red-600" : "text-green-600"}`}>
                                    {student.gpaChange < 0 ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                                    {student.gpaChange > 0 ? "+" : ""}{student.gpaChange}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-neutral-500">Проблема</p>
                                  <p className="text-sm font-medium text-neutral-900">{student.subject}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-neutral-500">Пропуски</p>
                                  <p className="text-sm font-bold text-neutral-900">{student.missedLessons}</p>
                                </div>
                              </div>

                              <p className="text-sm text-neutral-600 mb-3">{student.reason}</p>

                              <div className="flex items-center gap-2 flex-wrap">
                                <button
                                    onClick={(e) => { e.stopPropagation(); }}
                                    className="px-3 py-1.5 bg-secondary-500 text-white text-xs font-medium rounded-lg hover:bg-secondary-600 transition-colors flex items-center gap-1"
                                >
                                  <Mail className="w-3 h-3" />
                                  Написать родителям
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); }}
                                    className="px-3 py-1.5 bg-neutral-100 text-neutral-700 text-xs font-medium rounded-lg hover:bg-neutral-200 transition-colors flex items-center gap-1"
                                >
                                  <Phone className="w-3 h-3" />
                                  Позвонить
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setSelectedStudent(student); }}
                                    className="px-3 py-1.5 bg-neutral-100 text-neutral-700 text-xs font-medium rounded-lg hover:bg-neutral-200 transition-colors flex items-center gap-1"
                                >
                                  <Eye className="w-3 h-3" />
                                  Детали
                                </button>

                                <button
                                    onClick={(e) => toggleExpand(student.id, e)}
                                    className={`ml-auto px-3 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1.5 ${
                                        isExpanded
                                            ? "bg-neutral-900 text-white"
                                            : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                                    }`}
                                >
                                  {isExpanded ? (
                                      <>
                                        <ChevronUp className="w-3 h-3" />
                                        Скрыть советы
                                      </>
                                  ) : (
                                      <>
                                        <ChevronDown className="w-3 h-3" />
                                        <ShieldAlert className="w-3 h-3 text-red-500" />
                                        {student.threats.length} угроз ·{" "}
                                        <Lightbulb className="w-3 h-3 text-emerald-500" />
                                        {student.recommendations.length} советов
                                      </>
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <AnimatePresence>
                          {isExpanded && <ExpandedInsights student={student} />}
                        </AnimatePresence>
                      </motion.div>
                  );
                })
            ) : (
                <div className="p-12 text-center">
                  <AlertTriangle className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                  <p className="text-neutral-600 font-medium">Ученики не найдены</p>
                  <p className="text-sm text-neutral-500 mt-1">Попробуйте изменить параметры фильтра</p>
                </div>
            )}
          </div>
        </motion.div>

        {selectedStudent && (
            <StudentDetailModal
                student={selectedStudent}
                onClose={() => setSelectedStudent(null)}
            />
        )}
      </div>
  );
}