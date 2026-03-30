"use client";
import { motion } from "framer-motion";
import {
    Users,
    BookOpen,
    TrendingUp,
    MoreVertical,
    Search,
    Plus,
    Edit,
    Trash2,
} from "lucide-react";
import TeacherSidebar from "@/components/dashboard/teacher/Sidebar";
import TeacherHeader from "@/components/dashboard/teacher/Header";

interface ClassData {
    id: string;
    name: string;
    students: number;
    avgGrade: number;
    attendance: number;
    subject: string;
    schedule: string;
}

export default function TeacherClassesPage() {
    const classes: ClassData[] = [
        {
            id: "1",
            name: '10"А"',
            students: 25,
            avgGrade: 4.3,
            attendance: 92,
            subject: "Физика",
            schedule: "Пн, Ср, Пт • 09:25",
        },
        {
            id: "2",
            name: '10"Б"',
            students: 23,
            avgGrade: 4.1,
            attendance: 88,
            subject: "Физика",
            schedule: "Вт, Чт • 10:30",
        },
        {
            id: "3",
            name: '11"А"',
            students: 22,
            avgGrade: 4.5,
            attendance: 95,
            subject: "Алгебра",
            schedule: "Пн, Ср, Пт • 08:30",
        },
        {
            id: "4",
            name: '11"Б"',
            students: 24,
            avgGrade: 4.2,
            attendance: 90,
            subject: "Алгебра",
            schedule: "Вт, Чт • 11:35",
        },
    ];

    return (
        <div className="min-h-screen bg-neutral-50">
            <TeacherSidebar />
            <div className="lg:ml-64">
                <TeacherHeader />
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
                                    Мои Классы
                                </h1>
                                <p className="text-neutral-600 mt-1">
                                    Управление классами и журналами
                                </p>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all">
                                <Plus className="w-4 h-4" />
                                <span className="text-sm font-medium">Добавить класс</span>
                            </button>
                        </motion.div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-xl border border-neutral-200 p-5"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                                        <Users className="w-5 h-5 text-secondary-700" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold font-headline text-neutral-900">
                                            {classes.reduce((acc, cls) => acc + cls.students, 0)}
                                        </p>
                                        <p className="text-sm text-neutral-600">Всего учеников</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-xl border border-neutral-200 p-5"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                        <TrendingUp className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold font-headline text-neutral-900">
                                            {(
                                                classes.reduce((acc, cls) => acc + cls.avgGrade, 0) /
                                                classes.length
                                            ).toFixed(1)}
                                        </p>
                                        <p className="text-sm text-neutral-600">Средний балл</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white rounded-xl border border-neutral-200 p-5"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-tertiary-100 rounded-lg flex items-center justify-center">
                                        <BookOpen className="w-5 h-5 text-tertiary-700" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold font-headline text-neutral-900">
                                            {classes.length}
                                        </p>
                                        <p className="text-sm text-neutral-600">Классов</p>
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
                                    placeholder="Поиск классов..."
                                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-100 rounded-lg border-2 border-transparent focus:border-secondary-500 focus:bg-white focus:outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Classes Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {classes.map((cls, index) => (
                                <motion.div
                                    key={cls.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 + 0.4 }}
                                    className="bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-lg transition-all group"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                                                {cls.name.replace(/\D/g, "")}
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-neutral-900 text-lg">
                                                    {cls.name}
                                                </h3>
                                                <p className="text-sm text-neutral-600">{cls.subject}</p>
                                            </div>
                                        </div>
                                        <button className="p-2 hover:bg-neutral-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                                            <MoreVertical className="w-5 h-5 text-neutral-600" />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 mb-4">
                                        <div>
                                            <p className="text-xs text-neutral-500 mb-1">Учеников</p>
                                            <p className="text-lg font-bold text-neutral-900">
                                                {cls.students}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-neutral-500 mb-1">Средний балл</p>
                                            <p
                                                className={`text-lg font-bold ${
                                                    cls.avgGrade >= 4.5
                                                        ? "text-green-600"
                                                        : cls.avgGrade >= 4.0
                                                            ? "text-blue-600"
                                                            : "text-yellow-600"
                                                }`}
                                            >
                                                {cls.avgGrade}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-neutral-500 mb-1">Посещаемость</p>
                                            <p
                                                className={`text-lg font-bold ${
                                                    cls.attendance >= 90
                                                        ? "text-green-600"
                                                        : cls.attendance >= 80
                                                            ? "text-blue-600"
                                                            : "text-yellow-600"
                                                }`}
                                            >
                                                {cls.attendance}%
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-neutral-600 mb-4">
                                        <BookOpen className="w-4 h-4" />
                                        {cls.schedule}
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button className="flex-1 py-2.5 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white text-sm font-medium rounded-lg hover:shadow-md transition-all">
                                            Журнал
                                        </button>
                                        <button className="flex items-center gap-2 px-4 py-2.5 bg-neutral-100 text-neutral-700 text-sm font-medium rounded-lg hover:bg-neutral-200 transition-all">
                                            <Edit className="w-4 h-4" />
                                        </button>
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