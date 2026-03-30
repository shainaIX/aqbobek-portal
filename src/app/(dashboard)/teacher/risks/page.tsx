"use client";
import { motion } from "framer-motion";
import {
    AlertTriangle,
    TrendingDown,
    Users,
    Calendar,
    ArrowRight,
    Filter,
    Search,
} from "lucide-react";
import TeacherSidebar from "@/components/dashboard/teacher/Sidebar";

interface RiskStudent {
    id: string;
    name: string;
    class: string;
    avatar: string;
    trend: "down" | "warning";
    issue: string;
    lastGrade: number;
    previousGrade: number;
    attendance: number;
    lastActivity: string;
    riskLevel: "high" | "medium" | "low";
}

export default function TeacherRisksPage() {
    const riskStudents: RiskStudent[] = [
        {
            id: "1",
            name: "Иванов Александр",
            class: '10"А"',
            avatar: "ИА",
            trend: "down",
            issue: "Падение успеваемости на 30%",
            lastGrade: 3.2,
            previousGrade: 4.5,
            attendance: 78,
            lastActivity: "2 дня назад",
            riskLevel: "high",
        },
        {
            id: "2",
            name: "Петрова Мария",
            class: '10"Б"',
            avatar: "ПМ",
            trend: "warning",
            issue: "Пропуск 5 уроков за неделю",
            lastGrade: 3.8,
            previousGrade: 4.2,
            attendance: 65,
            lastActivity: "5 часов назад",
            riskLevel: "high",
        },
        {
            id: "3",
            name: "Сидоров Дмитрий",
            class: '11"А"',
            avatar: "СД",
            trend: "down",
            issue: "Не сданы 3 ДЗ подряд",
            lastGrade: 3.5,
            previousGrade: 4.0,
            attendance: 85,
            lastActivity: "1 день назад",
            riskLevel: "medium",
        },
        {
            id: "4",
            name: "Козлова Анна",
            class: '10"А"',
            avatar: "КА",
            trend: "warning",
            issue: "Снижение активности на уроках",
            lastGrade: 4.0,
            previousGrade: 4.6,
            attendance: 92,
            lastActivity: "3 часа назад",
            riskLevel: "medium",
        },
        {
            id: "5",
            name: "Новиков Павел",
            class: '11"Б"',
            avatar: "НП",
            trend: "down",
            issue: "Падение по математике",
            lastGrade: 3.0,
            previousGrade: 4.3,
            attendance: 88,
            lastActivity: "1 день назад",
            riskLevel: "high",
        },
    ];

    const getRiskColor = (level: string) => {
        switch (level) {
            case "high":
                return "bg-red-100 text-red-700 border-red-300";
            case "medium":
                return "bg-yellow-100 text-yellow-700 border-yellow-300";
            default:
                return "bg-blue-100 text-blue-700 border-blue-300";
        }
    };

    const getRiskLabel = (level: string) => {
        switch (level) {
            case "high":
                return "Высокий";
            case "medium":
                return "Средний";
            default:
                return "Низкий";
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50">
            <TeacherSidebar />
            <div className="lg:ml-64">
                <main className="px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-6">
                    <div className="max-w-[1440px] mx-auto space-y-6">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                        >
                            <div>
                                <h1 className="text-2xl font-bold font-headline text-neutral-900">
                                    Early Warning System
                                </h1>
                                <p className="text-neutral-600 mt-1">
                                    Ученики с аномальным падением успеваемости
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                                    <Filter className="w-4 h-4" />
                                    <span className="text-sm font-medium">Фильтр</span>
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-sm font-medium">Экспорт отчёта</span>
                                </button>
                            </div>
                        </motion.div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-xl border border-neutral-200 p-5"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                        <AlertTriangle className="w-5 h-5 text-red-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold font-headline text-neutral-900">
                                            {riskStudents.filter((s) => s.riskLevel === "high").length}
                                        </p>
                                        <p className="text-sm text-neutral-600">Высокий риск</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-xl border border-neutral-200 p-5"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                        <TrendingDown className="w-5 h-5 text-yellow-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold font-headline text-neutral-900">
                                            {riskStudents.filter((s) => s.riskLevel === "medium").length}
                                        </p>
                                        <p className="text-sm text-neutral-600">Средний риск</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white rounded-xl border border-neutral-200 p-5"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                                        <Users className="w-5 h-5 text-secondary-700" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold font-headline text-neutral-900">
                                            {riskStudents.length}
                                        </p>
                                        <p className="text-sm text-neutral-600">Всего в риске</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Search */}
                        <div className="bg-white rounded-xl border border-neutral-200 p-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                <input
                                    type="text"
                                    placeholder="Поиск учеников..."
                                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-100 rounded-lg border-2 border-transparent focus:border-secondary-500 focus:bg-white focus:outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Students List */}
                        <div className="space-y-4">
                            {riskStudents.map((student, index) => (
                                <motion.div
                                    key={student.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 + 0.4 }}
                                    className="bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-lg transition-all"
                                >
                                    <div className="flex items-start gap-4">
                                        {/* Avatar */}
                                        <div
                                            className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg ${
                                                student.riskLevel === "high"
                                                    ? "bg-red-100 text-red-600"
                                                    : "bg-yellow-100 text-yellow-600"
                                            }`}
                                        >
                                            {student.avatar}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <h3 className="font-semibold text-neutral-900 text-lg">
                                                        {student.name}
                                                    </h3>
                                                    <p className="text-sm text-neutral-600 mt-0.5">
                                                        {student.class} • {student.issue}
                                                    </p>
                                                </div>
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-bold border ${getRiskColor(
                                                        student.riskLevel
                                                    )}`}
                                                >
                          {getRiskLabel(student.riskLevel)} риск
                        </span>
                                            </div>

                                            {/* Stats */}
                                            <div className="grid grid-cols-3 gap-4 mb-3">
                                                <div>
                                                    <p className="text-xs text-neutral-500 mb-1">
                                                        Средний балл
                                                    </p>
                                                    <div className="flex items-center gap-2">
                            <span
                                className={`text-lg font-bold ${
                                    student.lastGrade >= 4
                                        ? "text-green-600"
                                        : student.lastGrade >= 3
                                            ? "text-yellow-600"
                                            : "text-red-600"
                                }`}
                            >
                              {student.lastGrade}
                            </span>
                                                        <span className="text-xs text-neutral-400 line-through">
                              {student.previousGrade}
                            </span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-neutral-500 mb-1">
                                                        Посещаемость
                                                    </p>
                                                    <p
                                                        className={`text-lg font-bold ${
                                                            student.attendance >= 80
                                                                ? "text-green-600"
                                                                : student.attendance >= 60
                                                                    ? "text-yellow-600"
                                                                    : "text-red-600"
                                                        }`}
                                                    >
                                                        {student.attendance}%
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-neutral-500 mb-1">
                                                        Последняя активность
                                                    </p>
                                                    <p className="text-sm font-medium text-neutral-900">
                                                        {student.lastActivity}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-3">
                                                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white text-sm font-medium rounded-lg hover:shadow-md transition-all">
                                                    <AlertTriangle className="w-4 h-4" />
                                                    Связаться с родителями
                                                </button>
                                                <button className="flex items-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-700 text-sm font-medium rounded-lg hover:bg-neutral-200 transition-all">
                                                    Просмотреть профиль
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}