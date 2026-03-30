"use client";
import { motion } from "framer-motion";
import {
    Calendar,
    Clock,
    MapPin,
    Users,
    ChevronLeft,
    ChevronRight,
    Plus,
} from "lucide-react";
import TeacherSidebar from "@/components/dashboard/teacher/Sidebar";
import TeacherHeader from "@/components/dashboard/teacher/Header";

interface Lesson {
    id: string;
    time: string;
    endTime: string;
    subject: string;
    className: string;
    room: string;
    type: "lesson" | "exam" | "event";
}

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

export default function TeacherSchedulePage() {
    const schedule: Record<string, Lesson[]> = {
        "Пн": [
            {
                id: "1",
                time: "08:30",
                endTime: "09:15",
                subject: "Алгебра",
                className: '11"А"',
                room: "Кабинет 305",
                type: "lesson",
            },
            {
                id: "2",
                time: "09:25",
                endTime: "10:10",
                subject: "Физика",
                className: '10"А"',
                room: "Лаборатория 201",
                type: "lesson",
            },
            {
                id: "3",
                time: "10:30",
                endTime: "11:15",
                subject: "Физика",
                className: '10"Б"',
                room: "Лаборатория 201",
                type: "lesson",
            },
        ],
        "Вт": [
            {
                id: "4",
                time: "09:25",
                endTime: "10:10",
                subject: "Алгебра",
                className: '11"Б"',
                room: "Кабинет 305",
                type: "lesson",
            },
            {
                id: "5",
                time: "11:35",
                endTime: "12:20",
                subject: "Физика",
                className: '11"А"',
                room: "Лаборатория 201",
                type: "lesson",
            },
        ],
        "Ср": [
            {
                id: "6",
                time: "08:30",
                endTime: "09:15",
                subject: "Алгебра",
                className: '11"А"',
                room: "Кабинет 305",
                type: "lesson",
            },
            {
                id: "7",
                time: "09:25",
                endTime: "10:10",
                subject: "Физика",
                className: '10"А"',
                room: "Лаборатория 201",
                type: "lesson",
            },
        ],
        "Чт": [
            {
                id: "8",
                time: "09:25",
                endTime: "10:10",
                subject: "Алгебра",
                className: '11"Б"',
                room: "Кабинет 305",
                type: "lesson",
            },
            {
                id: "9",
                time: "10:30",
                endTime: "11:15",
                subject: "Физика",
                className: '10"Б"',
                room: "Лаборатория 201",
                type: "lesson",
            },
        ],
        "Пт": [
            {
                id: "10",
                time: "08:30",
                endTime: "09:15",
                subject: "Алгебра",
                className: '11"А"',
                room: "Кабинет 305",
                type: "lesson",
            },
            {
                id: "11",
                time: "11:35",
                endTime: "12:20",
                subject: "Физика",
                className: '10"А"',
                room: "Лаборатория 201",
                type: "lesson",
            },
        ],
        "Сб": [],
    };

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
                                    Расписание
                                </h1>
                                <p className="text-neutral-600 mt-1">
                                    20-26 Января 2025
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                                    <ChevronLeft className="w-4 h-4" />
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all">
                                    <Plus className="w-4 h-4" />
                                    <span className="text-sm font-medium">Добавить урок</span>
                                </button>
                            </div>
                        </motion.div>

                        {/* Week Tabs */}
                        <div className="bg-white rounded-xl border border-neutral-200 p-2">
                            <div className="grid grid-cols-6 gap-2">
                                {weekDays.map((day, index) => (
                                    <button
                                        key={day}
                                        className={`py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                                            index === 2
                                                ? "bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-md"
                                                : "hover:bg-neutral-100 text-neutral-700"
                                        }`}
                                    >
                                        <div className="flex flex-col items-center gap-1">
                                            <span>{day}</span>
                                            <span className="text-xs opacity-75">
                        {20 + index} янв
                      </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Schedule */}
                        <div className="space-y-4">
                            {Object.entries(schedule).map(([day, lessons], dayIndex) => (
                                <motion.div
                                    key={day}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: dayIndex * 0.1 }}
                                    className="bg-white rounded-xl border border-neutral-200 overflow-hidden"
                                >
                                    <div className="flex items-center gap-3 px-5 py-4 bg-neutral-50 border-b border-neutral-200">
                                        <Calendar className="w-5 h-5 text-secondary-600" />
                                        <h3 className="font-semibold text-neutral-900">{day}</h3>
                                        <span className="text-sm text-neutral-600">
                      {lessons.length} уроков
                    </span>
                                    </div>
                                    <div className="divide-y divide-neutral-100">
                                        {lessons.length > 0 ? (
                                            lessons.map((lesson, index) => (
                                                <motion.div
                                                    key={lesson.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: dayIndex * 0.1 + index * 0.05 }}
                                                    className="p-4 hover:bg-neutral-50 transition-colors"
                                                >
                                                    <div className="flex items-start gap-4">
                                                        <div className="flex items-center gap-2 min-w-[120px]">
                                                            <Clock className="w-4 h-4 text-neutral-400" />
                                                            <div>
                                                                <p className="text-sm font-bold text-neutral-900">
                                                                    {lesson.time}
                                                                </p>
                                                                <p className="text-xs text-neutral-500">
                                                                    {lesson.endTime}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-medium text-neutral-900 mb-1">
                                                                {lesson.subject}
                                                            </h4>
                                                            <div className="flex items-center gap-4 text-sm text-neutral-600">
                                                                <div className="flex items-center gap-1">
                                                                    <Users className="w-4 h-4" />
                                                                    {lesson.className}
                                                                </div>
                                                                <div className="flex items-center gap-1">
                                                                    <MapPin className="w-4 h-4" />
                                                                    {lesson.room}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <span
                                                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                                lesson.type === "lesson"
                                                                    ? "bg-blue-100 text-blue-700"
                                                                    : lesson.type === "exam"
                                                                        ? "bg-red-100 text-red-700"
                                                                        : "bg-green-100 text-green-700"
                                                            }`}
                                                        >
                              {lesson.type === "lesson"
                                  ? "Урок"
                                  : lesson.type === "exam"
                                      ? "Контрольная"
                                      : "Мероприятие"}
                            </span>
                                                    </div>
                                                </motion.div>
                                            ))
                                        ) : (
                                            <div className="p-8 text-center text-neutral-500">
                                                <p>Нет уроков</p>
                                            </div>
                                        )}
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