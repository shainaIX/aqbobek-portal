"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import {
    Users,
    BookOpen,
    TrendingUp,
    AlertTriangle,
    FileText,
    Calendar,
    Sparkles,
    Clock,
    CheckCircle,
} from "lucide-react";

export default function TeacherDashboard() {
    const router = useRouter();
    const { isAuthenticated, isLoading, user } = useAuth();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-secondary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-neutral-600 font-medium">Загрузка...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    // Mock данные
    const stats = {
        totalStudents: 87,
        classes: 5,
        averageGrade: 4.3,
        atRiskStudents: 3,
    };

    const riskStudents = [
        {
            id: 1,
            name: "Иванов Александр",
            class: '10"А"',
            issue: "Падение успеваемости на 30%",
            trend: "down",
            lastGrade: 3.2,
        },
        {
            id: 2,
            name: "Петрова Мария",
            class: '10"Б"',
            issue: "Пропуск 5 уроков за неделю",
            trend: "warning",
            lastGrade: 3.8,
        },
        {
            id: 3,
            name: "Сидоров Дмитрий",
            class: '11"А"',
            issue: "Не сданы 3 ДЗ подряд",
            trend: "down",
            lastGrade: 3.5,
        },
    ];

    const upcomingClasses = [
        {
            id: 1,
            subject: "Физика",
            class: '10"А"',
            time: "09:25 - 10:10",
            room: "Лаборатория 201",
            status: "current",
        },
        {
            id: 2,
            subject: "Алгебра",
            class: '10"Б"',
            time: "10:30 - 11:15",
            room: "Кабинет 305",
            status: "upcoming",
        },
        {
            id: 3,
            subject: "Физика",
            class: '11"А"',
            time: "11:35 - 12:20",
            room: "Лаборатория 201",
            status: "upcoming",
        },
    ];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
                <div>
                    <h1 className="text-2xl font-bold font-headline text-neutral-900">
                        Дашборд Учителя
                    </h1>
                    <p className="text-neutral-600 mt-1">
                        Аналитика успеваемости и управление классами
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-medium">AI-Отчёт</span>
                    </motion.button>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <StatCard
                    icon={Users}
                    title="Всего учеников"
                    value={stats.totalStudents}
                    color="secondary"
                    delay={0.1}
                />
                <StatCard
                    icon={BookOpen}
                    title="Классов"
                    value={stats.classes}
                    color="primary"
                    delay={0.2}
                />
                <StatCard
                    icon={TrendingUp}
                    title="Средний балл"
                    value={stats.averageGrade.toFixed(1)}
                    trend="+0.2"
                    trendUp={true}
                    color="tertiary"
                    delay={0.3}
                />
                <StatCard
                    icon={AlertTriangle}
                    title="Учеников в риске"
                    value={stats.atRiskStudents}
                    trend="+1"
                    trendUp={false}
                    color="danger"
                    delay={0.4}
                />
            </div>

            {/* Main Grid - Risk Students + Schedule */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Early Warning System (2/3 width) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="lg:col-span-2 bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
                >
                    <div className="flex items-center justify-between p-5 border-b border-neutral-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-headline text-lg font-semibold text-neutral-900">
                                    Early Warning System
                                </h3>
                                <p className="text-xs text-neutral-500">
                                    Ученики с аномальным падением успеваемости
                                </p>
                            </div>
                        </div>
                        <button className="text-sm font-medium text-secondary-600 hover:text-secondary-700 transition-colors">
                            Все риски →
                        </button>
                    </div>
                    <div className="divide-y divide-neutral-100">
                        {riskStudents.map((student, index) => (
                            <motion.div
                                key={student.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 + 0.6 }}
                                className="p-4 hover:bg-neutral-50 transition-colors"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                                                student.trend === "down"
                                                    ? "bg-red-100 text-red-600"
                                                    : "bg-yellow-100 text-yellow-600"
                                            }`}
                                        >
                                            {student.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-neutral-900">
                                                {student.name}
                                            </h4>
                                            <p className="text-sm text-neutral-600">
                                                {student.class} • {student.issue}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p
                                            className={`text-lg font-bold ${
                                                student.lastGrade >= 4
                                                    ? "text-green-600"
                                                    : student.lastGrade >= 3
                                                        ? "text-yellow-600"
                                                        : "text-red-600"
                                            }`}
                                        >
                                            {student.lastGrade}
                                        </p>
                                        <p className="text-xs text-neutral-500">Средний балл</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Today's Schedule (1/3 width) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
                >
                    <div className="flex items-center justify-between p-5 border-b border-neutral-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-tertiary-400 to-tertiary-600 rounded-lg flex items-center justify-center">
                                <Clock className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-headline text-lg font-semibold text-neutral-900">
                                    Сегодня
                                </h3>
                                <p className="text-xs text-neutral-500">
                                    {new Date().toLocaleDateString("ru-RU", {
                                        weekday: "long",
                                        day: "numeric",
                                        month: "long",
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="divide-y divide-neutral-100">
                        {upcomingClasses.map((lesson, index) => (
                            <motion.div
                                key={lesson.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 + 0.8 }}
                                className={`p-4 ${
                                    lesson.status === "current"
                                        ? "bg-secondary-50 border-l-4 border-secondary-500"
                                        : "hover:bg-neutral-50"
                                }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium text-neutral-900">
                                        {lesson.subject}
                                    </h4>
                                    {lesson.status === "current" && (
                                        <span className="px-2 py-0.5 bg-secondary-500 text-white text-xs font-medium rounded-full">
                      СЕЙЧАС
                    </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3 text-xs text-neutral-500">
                                    <span>{lesson.class}</span>
                                    <span>•</span>
                                    <span>{lesson.time}</span>
                                    <span>•</span>
                                    <span>{lesson.room}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="p-4 bg-neutral-50 border-t border-neutral-200">
                        <button className="w-full text-sm font-medium text-secondary-600 hover:text-secondary-700 transition-colors">
                            Полное расписание →
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Quick Actions + AI Report Generator */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6"
                >
                    <h3 className="font-headline text-lg font-semibold text-neutral-900 mb-4">
                        Быстрые действия
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <QuickActionCard
                            icon={FileText}
                            title="Создать отчёт"
                            description="AI-генерация за 1 клик"
                            color="secondary"
                        />
                        <QuickActionCard
                            icon={Users}
                            title="Классный журнал"
                            description="Выставить оценки"
                            color="primary"
                        />
                        <QuickActionCard
                            icon={Calendar}
                            title="Заменить урок"
                            description="Изменить расписание"
                            color="tertiary"
                        />
                        <QuickActionCard
                            icon={AlertTriangle}
                            title="Уведомить родителей"
                            description="Отправить сообщение"
                            color="danger"
                        />
                    </div>
                </motion.div>

                {/* AI Report Generator Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl shadow-lg p-6 text-white"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">AI-Отчёты</h3>
                            <p className="text-secondary-100 text-sm">
                                Автоматическая генерация отчётов
                            </p>
                        </div>
                    </div>
                    <p className="text-secondary-100 text-sm mb-4">
                        Сгенерируйте текстовый отчёт об успеваемости класса для классного
                        руководства за 1 клик. AI проанализирует оценки, посещаемость и
                        динамику.
                    </p>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div
                                    key={i}
                                    className="w-8 h-8 rounded-full bg-white/30 border-2 border-secondary-500 flex items-center justify-center text-xs font-bold"
                                >
                                    {i}
                                </div>
                            ))}
                        </div>
                        <span className="text-sm text-secondary-100">
              5 отчётов сгенерировано сегодня
            </span>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 bg-white text-secondary-600 font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                        Создать новый отчёт
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
}

// Helper Components

function StatCard({
                      icon: Icon,
                      title,
                      value,
                      trend,
                      trendUp,
                      color,
                      delay = 0,
                  }: {
    icon: any;
    title: string;
    value: string | number;
    trend?: string;
    trendUp?: boolean;
    color: "primary" | "secondary" | "tertiary" | "danger";
    delay?: number;
}) {
    const colorClasses = {
        primary: "bg-primary-100 text-primary-600",
        secondary: "bg-secondary-100 text-secondary-700",
        tertiary: "bg-tertiary-100 text-tertiary-700",
        danger: "bg-red-100 text-red-600",
    };

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
                    <div
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            trendUp
                                ? "text-green-600 bg-green-100"
                                : "text-red-600 bg-red-100"
                        }`}
                    >
                        {trendUp ? "↑" : "↓"}
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

function QuickActionCard({
                             icon: Icon,
                             title,
                             description,
                             color,
                         }: {
    icon: any;
    title: string;
    description: string;
    color: "primary" | "secondary" | "tertiary" | "danger";
}) {
    const colorClasses = {
        primary: "bg-primary-50 text-primary-600 hover:bg-primary-100",
        secondary: "bg-secondary-50 text-secondary-600 hover:bg-secondary-100",
        tertiary: "bg-tertiary-50 text-tertiary-600 hover:bg-tertiary-100",
        danger: "bg-red-50 text-red-600 hover:bg-red-100",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-4 rounded-xl border border-neutral-200 text-left transition-all ${colorClasses[color]}`}
        >
            <Icon className="w-6 h-6 mb-2" />
            <h4 className="font-medium text-sm mb-1">{title}</h4>
            <p className="text-xs opacity-75">{description}</p>
        </motion.button>
    );
}