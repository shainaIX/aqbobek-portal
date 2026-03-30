"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Search, 
  Filter,
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
  MessageSquare
} from "lucide-react";
import { useState } from "react";

// Types
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
}

// Mock Data
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
    riskCategories: {
      academic: true,
      attendance: true,
      behavior: false,
    },
    interventions: [
      { date: "20.01.2025", action: "Разговор с учеником", status: "completed" },
      { date: "22.01.2025", action: "Звонок родителям", status: "pending" },
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
    riskCategories: {
      academic: true,
      attendance: false,
      behavior: false,
    },
    interventions: [
      { date: "23.01.2025", action: "Дополнительное задание", status: "completed" },
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
    riskCategories: {
      academic: true,
      attendance: false,
      behavior: false,
    },
    interventions: [],
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
    riskCategories: {
      academic: false,
      attendance: false,
      behavior: true,
    },
    interventions: [],
  },
];

// Risk Level Badge Component
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

// Risk Category Badge Component
function RiskCategoryBadge({ category, active }: { category: string; active: boolean }) {
  const config = {
    academic: { icon: BookOpen, label: "Успеваемость", color: "red" },
    attendance: { icon: CalendarIcon, label: "Посещаемость", color: "yellow" },
    behavior: { icon: MessageSquare, label: "Поведение", color: "blue" },
  };
  
  const { icon: Icon, label } = config[category as keyof typeof config];
  
  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
      active 
        ? "bg-neutral-900 text-white" 
        : "bg-neutral-100 text-neutral-400"
    }`}>
      <Icon className="w-3 h-3" />
      {label}
    </div>
  );
}

// Student Detail Modal Component
function StudentDetailModal({ 
  student, 
  onClose 
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
          {/* Header */}
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
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-neutral-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-5 space-y-6">
            {/* Risk Level */}
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

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-neutral-50 rounded-xl">
                <p className="text-xs text-neutral-500 mb-1">Средний балл</p>
                <p className="text-2xl font-bold text-neutral-900">{student.gpa}</p>
                <p className={`text-xs font-medium flex items-center gap-1 mt-1 ${
                  student.gpaChange < 0 ? "text-red-600" : "text-green-600"
                }`}>
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

            {/* Risk Categories */}
            <div>
              <h3 className="font-headline text-sm font-semibold text-neutral-900 mb-3">
                Категории риска
              </h3>
              <div className="flex flex-wrap gap-2">
                <RiskCategoryBadge category="academic" active={student.riskCategories.academic} />
                <RiskCategoryBadge category="attendance" active={student.riskCategories.attendance} />
                <RiskCategoryBadge category="behavior" active={student.riskCategories.behavior} />
              </div>
            </div>

            {/* Reason */}
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-red-900">Причина риска</p>
                  <p className="text-sm text-red-700 mt-1">{student.reason}</p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-headline text-sm font-semibold text-neutral-900 mb-3">
                Контакты родителей
              </h3>
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

            {/* Interventions */}
            <div>
              <h3 className="font-headline text-sm font-semibold text-neutral-900 mb-3">
                Предпринятые меры
              </h3>
              {student.interventions.length > 0 ? (
                <div className="space-y-2">
                  {student.interventions.map((intervention, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg"
                    >
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
                        intervention.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {intervention.status === "completed" ? "Выполнено" : "В ожидании"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-neutral-50 rounded-lg text-center">
                  <p className="text-sm text-neutral-500">Меры ещё не предпринимались</p>
                  <button className="mt-2 text-sm font-medium text-secondary-600 hover:text-secondary-700">
                    + Добавить меру
                  </button>
                </div>
              )}
            </div>

            {/* Actions */}
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

// Main Page Component
export default function TeacherRisksPage() {
  const [selectedStudent, setSelectedStudent] = useState<AtRiskStudent | null>(null);
  const [filterRiskLevel, setFilterRiskLevel] = useState<string>("all");
  const [filterClass, setFilterClass] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter students
  const filteredStudents = atRiskStudents.filter((student) => {
    const matchesRiskLevel = filterRiskLevel === "all" || student.riskLevel === filterRiskLevel;
    const matchesClass = filterClass === "all" || student.class.includes(filterClass);
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRiskLevel && matchesClass && matchesSearch;
  });

  // Stats
  const stats = {
    total: atRiskStudents.length,
    high: atRiskStudents.filter(s => s.riskLevel === "high").length,
    medium: atRiskStudents.filter(s => s.riskLevel === "medium").length,
    low: atRiskStudents.filter(s => s.riskLevel === "low").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold font-headline text-neutral-900">
            Early Warning System
          </h1>
          <p className="text-neutral-600 mt-1">
            Ученики в зоне риска ({stats.total})
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors">
          <Download className="w-4 h-4" />
          <span className="text-sm font-medium">Экспорт</span>
        </button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-neutral-200 p-5"
        >
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-6 h-6 text-neutral-600" />
            <span className="text-sm text-neutral-600">Всего</span>
          </div>
          <p className="text-3xl font-bold font-headline text-neutral-900">{stats.total}</p>
          <p className="text-sm text-neutral-500 mt-1">учеников в риске</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-red-200 p-5 bg-red-50/50"
        >
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <span className="text-sm text-red-600">Высокий</span>
          </div>
          <p className="text-3xl font-bold font-headline text-red-600">{stats.high}</p>
          <p className="text-sm text-red-500 mt-1">требуют внимания</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-yellow-200 p-5 bg-yellow-50/50"
        >
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
            <span className="text-sm text-yellow-600">Средний</span>
          </div>
          <p className="text-3xl font-bold font-headline text-yellow-600">{stats.medium}</p>
          <p className="text-sm text-yellow-500 mt-1">требуют контроля</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-blue-200 p-5 bg-blue-50/50"
        >
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-6 h-6 text-blue-600" />
            <span className="text-sm text-blue-600">Низкий</span>
          </div>
          <p className="text-3xl font-bold font-headline text-blue-600">{stats.low}</p>
          <p className="text-sm text-blue-500 mt-1">требуют наблюдения</p>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl border border-neutral-200 p-4"
      >
        <div className="flex flex-wrap gap-3">
          {/* Search */}
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

          {/* Risk Level Filter */}
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

          {/* Class Filter */}
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

          {/* Clear Filters */}
          {(filterRiskLevel !== "all" || filterClass !== "all" || searchQuery) && (
            <button
              onClick={() => {
                setFilterRiskLevel("all");
                setFilterClass("all");
                setSearchQuery("");
              }}
              className="px-4 py-2.5 text-sm font-medium text-neutral-600 hover:text-neutral-900"
            >
              Сбросить
            </button>
          )}
        </div>
      </motion.div>

      {/* Students List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
      >
        <div className="divide-y divide-neutral-100">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student, index) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 + 0.6 }}
                onClick={() => setSelectedStudent(student)}
                className="p-4 hover:bg-neutral-50 transition-colors cursor-pointer"
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
                        <p className={`text-sm font-bold flex items-center gap-1 ${
                          student.gpaChange < 0 ? "text-red-600" : "text-green-600"
                        }`}>
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

                    <div className="flex items-center gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle email
                        }}
                        className="px-3 py-1.5 bg-secondary-500 text-white text-xs font-medium rounded-lg hover:bg-secondary-600 transition-colors flex items-center gap-1"
                      >
                        <Mail className="w-3 h-3" />
                        Написать родителям
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle phone
                        }}
                        className="px-3 py-1.5 bg-neutral-100 text-neutral-700 text-xs font-medium rounded-lg hover:bg-neutral-200 transition-colors flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3" />
                        Позвонить
                      </button>
                      <button className="px-3 py-1.5 bg-neutral-100 text-neutral-700 text-xs font-medium rounded-lg hover:bg-neutral-200 transition-colors flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        Детали
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="p-12 text-center">
              <AlertTriangle className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-600 font-medium">Ученики не найдены</p>
              <p className="text-sm text-neutral-500 mt-1">Попробуйте изменить параметры фильтра</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <StudentDetailModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
}