"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Calendar,
    Clock,
    Users,
    TrendingUp,
    TrendingDown,
    AlertTriangle,
    FileText,
    CheckCircle,
    ChevronRight,
    Plus,
    Bell,
    Award,
} from "lucide-react";
import Link from "next/link";

interface ClassOverview {
    classId: string;
    className: string;
    students: number;
    avgGpa: number;
    attendance: number;
    trend: 'up' | 'stable' | 'down';
}

interface TodayLesson {
    id: string;
    subject: string;
    className: string;
    time: string;
    room: string;
    completed: boolean;
}

interface RiskStudent {
    studentId: string;
    studentName: string;
    className: string;
    riskScore: number;
    riskLevel: 'medium' | 'high' | 'critical';
    reason: string;
}

interface RecentActivity {
    id: string;
    type: 'grade' | 'attendance' | 'homework' | 'message';
    description: string;
    time: string;
    icon: string;
}

interface UpcomingEvent {
    id: string;
    title: string;
    date: string;
    type: 'test' | 'meeting' | 'event';
    classId?: string;
}

export default function TeacherDashboard() {
    const [selectedClass, setSelectedClass] = useState<string>('all');

    const classes: ClassOverview[] = [
        { classId: '10a', className: '10"А"', students: 25, avgGpa: 4.2, attendance: 94, trend: 'up' },
        { classId: '10b', className: '10"Б"', students: 23, avgGpa: 3.9, attendance: 91, trend: 'down' },
        { classId: '9a', className: '9"А"', students: 27, avgGpa: 4.0, attendance: 96, trend: 'stable' },
        { classId: '11a', className: '11"А"', students: 21, avgGpa: 4.5, attendance: 98, trend: 'up' },
    ];

    const todayLessons: TodayLesson[] = [
        { id: '1', subject: 'Алгебра', className: '10"А"', time: '08:30 - 09:15', room: '305', completed: true },
        { id: '2', subject: 'Геометрия', className: '10"Б"', time: '09:25 - 10:10', room: '305', completed: false },
        { id: '3', subject: 'Алгебра', className: '9"А"', time: '10:30 - 11:15', room: '305', completed: false },
        { id: '4', subject: 'Факультатив', className: '11"А"', time: '11:35 - 12:20', room: '305', completed: false },
    ];

    const riskStudents: RiskStudent[] = [
        { studentId: '1', studentName: 'Сидоров Дмитрий', className: '10"А"', riskScore: 75, riskLevel: 'medium', reason: 'Падение оценок' },
        { studentId: '2', studentName: 'Иванов Алексей', className: '10"Б"', riskScore: 85, riskLevel: 'high', reason: 'Пропуски + ДЗ' },
        { studentId: '3', studentName: 'Ким Мария', className: '9"А"', riskScore: 65, riskLevel: 'medium', reason: 'Низкие тесты' },
    ];

    const recentActivity: RecentActivity[] = [
        { id: '1', type: 'grade', description: 'Алишер И. получил 5 за контрольную', time: '10 мин назад', icon: '📊' },
        { id: '2', type: 'attendance', description: 'Темуров А. отсутствовал на уроке', time: '1 час назад', icon: '📅' },
        { id: '3', type: 'homework', description: '5 учеников не сдали ДЗ по алгебре', time: '2 часа назад', icon: '📝' },
        { id: '4', type: 'message', description: 'Новое сообщение от родителя', time: '3 часа назад', icon: '💬' },
    ];

    const upcomingEvents: UpcomingEvent[] = [
        { id: '1', title: 'Контрольная работа 10"А"', date: '28.01', type: 'test', classId: '10a' },
        { id: '2', title: 'Родительское собрание', date: '30.01', type: 'meeting', classId: '10a' },
        { id: '3', title: 'Олимпиада по математике', date: '05.02', type: 'event', classId: '11a' },
    ];

    const stats = {
        totalStudents: classes.reduce((acc, c) => acc + c.students, 0),
        avgGpa: (classes.reduce((acc, c) => acc + c.avgGpa, 0) / classes.length).toFixed(2),
        avgAttendance: Math.round(classes.reduce((acc, c) => acc + c.attendance, 0) / classes.length),
        riskCount: riskStudents.length,
    };

    return (
        <div className="space-y-6">

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
                <div>
                    <h1 className="text-2xl font-bold font-headline text-neutral-900">
                        Добро пожаловать, Анна Петровна! 👋
                    </h1>
                    <p className="text-neutral-600 mt-1">
                        Обзор ваших классов и учеников
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/teacher/reports"
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                        <FileText className="w-4 h-4" />
                        <span className="text-sm font-medium">Отчёты</span>
                    </Link>
                    <Link
                        href="/teacher/schedule"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        <span className="text-sm font-medium">Создать урок</span>
                    </Link>
                </div>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-xl border border-neutral-200 p-5"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                            <Users className="w-5 h-5 text-secondary-700" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold font-headline text-neutral-900">{stats.totalStudents}</p>
                    <p className="text-sm text-neutral-600">Всего учеников</p>
                    <p className="text-xs text-neutral-500 mt-1">{classes.length} классов</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl border border-neutral-200 p-5"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-primary-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold font-headline text-neutral-900">{stats.avgGpa}</p>
                    <p className="text-sm text-neutral-600">Средний балл</p>
                    <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        +0.2 за квартал
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-xl border border-neutral-200 p-5"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-tertiary-100 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-tertiary-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold font-headline text-neutral-900">{stats.avgAttendance}%</p>
                    <p className="text-sm text-neutral-600">Посещаемость</p>
                    <p className="text-xs text-neutral-500 mt-1">За эту неделю</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-xl border border-neutral-200 p-5"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                        </div>
                    </div>
                    <p className="text-3xl font-bold font-headline text-neutral-900">{stats.riskCount}</p>
                    <p className="text-sm text-neutral-600">В зоне риска</p>
                    <Link href="/teacher/risks" className="text-xs text-secondary-600 mt-1 hover:underline flex items-center gap-1">
                        Подробнее <ChevronRight className="w-3 h-3" />
                    </Link>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div className="lg:col-span-2 space-y-6">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
                    >
                        <div className="flex items-center justify-between p-5 border-b border-neutral-200">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-secondary-400 to-secondary-600 rounded-lg flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-headline text-lg font-semibold text-neutral-900">
                                        Сегодня
                                    </h3>
                                    <p className="text-xs text-neutral-500">
                                        {todayLessons.filter(l => l.completed).length} из {todayLessons.length} уроков завершено
                                    </p>
                                </div>
                            </div>
                            <Link href="/teacher/schedule" className="text-sm font-medium text-secondary-600 hover:text-secondary-700">
                                Полное →
                            </Link>
                        </div>

                        <div className="divide-y divide-neutral-100">
                            {todayLessons.map((lesson, index) => (
                                <motion.div
                                    key={lesson.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.6 + index * 0.05 }}
                                    className={`p-4 transition-all ${
                                        lesson.completed ? 'bg-neutral-50 opacity-60' : 'bg-white hover:bg-neutral-50'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                                lesson.completed
                                                    ? 'bg-green-100'
                                                    : 'bg-secondary-100'
                                            }`}>
                                                {lesson.completed
                                                    ? <CheckCircle className="w-5 h-5 text-green-600" />
                                                    : <Clock className="w-5 h-5 text-secondary-600" />
                                                }
                                            </div>
                                            <div>
                                                <p className={`font-medium ${
                                                    lesson.completed ? 'text-neutral-500 line-through' : 'text-neutral-900'
                                                }`}>
                                                    {lesson.subject}
                                                </p>
                                                <p className="text-sm text-neutral-500">
                                                    {lesson.className} • Кабинет {lesson.room}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-neutral-900">{lesson.time}</p>
                                            {lesson.completed ? (
                                                <span className="text-xs text-green-600 font-medium">Завершено</span>
                                            ) : (
                                                <span className="text-xs text-secondary-600 font-medium">Предстоит</span>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
                    >
                        <div className="flex items-center justify-between p-5 border-b border-neutral-200">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center">
                                    <Users className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-headline text-lg font-semibold text-neutral-900">
                                        Мои классы
                                    </h3>
                                    <p className="text-xs text-neutral-500">
                                        Успеваемость и посещаемость
                                    </p>
                                </div>
                            </div>
                            <Link href="/teacher/classes" className="text-sm font-medium text-secondary-600 hover:text-secondary-700">
                                Все классы →
                            </Link>
                        </div>

                        <div className="p-4">

                            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                                <button
                                    onClick={() => setSelectedClass('all')}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                                        selectedClass === 'all'
                                            ? 'bg-secondary-500 text-white'
                                            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                    }`}
                                >
                                    Все
                                </button>
                                {classes.map((cls) => (
                                    <button
                                        key={cls.classId}
                                        onClick={() => setSelectedClass(cls.classId)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                                            selectedClass === cls.classId
                                                ? 'bg-secondary-500 text-white'
                                                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                        }`}
                                    >
                                        {cls.className}
                                    </button>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {classes
                                    .filter(c => selectedClass === 'all' || c.classId === selectedClass)
                                    .map((cls, index) => (
                                        <motion.div
                                            key={cls.classId}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 hover:border-secondary-300 transition-all"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <h4 className="font-semibold text-neutral-900">{cls.className}</h4>
                                                <div className={`flex items-center gap-1 text-sm ${
                                                    cls.trend === 'up' ? 'text-green-600' :
                                                    cls.trend === 'down' ? 'text-red-600' :
                                                    'text-neutral-500'
                                                }`}>
                                                    {cls.trend === 'up' ? <TrendingUp className="w-4 h-4" /> :
                                                     cls.trend === 'down' ? <TrendingDown className="w-4 h-4" /> :
                                                     <Clock className="w-4 h-4" />}
                                                    <span className="text-xs">
                                                        {cls.trend === 'up' ? 'Растёт' : cls.trend === 'down' ? 'Падает' : 'Стабильно'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-neutral-600">Учеников</span>
                                                    <span className="font-medium text-neutral-900">{cls.students}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-neutral-600">Средний балл</span>
                                                    <span className="font-bold text-neutral-900">{cls.avgGpa}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-neutral-600">Посещаемость</span>
                                                    <span className="font-bold text-neutral-900">{cls.attendance}%</span>
                                                </div>
                                                <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden mt-2">
                                                    <div
                                                        className={`h-full rounded-full ${
                                                            cls.avgGpa >= 4 ? 'bg-green-500' :
                                                            cls.avgGpa >= 3.5 ? 'bg-yellow-500' :
                                                            'bg-red-500'
                                                        }`}
                                                        style={{ width: `${(cls.avgGpa / 5) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                }
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="space-y-6">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
                    >
                        <div className="flex items-center justify-between p-5 border-b border-neutral-200">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center">
                                    <AlertTriangle className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-headline text-lg font-semibold text-neutral-900">
                                        Early Warning
                                    </h3>
                                    <p className="text-xs text-neutral-500">
                                        {riskStudents.length} учеников в риске
                                    </p>
                                </div>
                            </div>
                            <Link href="/teacher/risks" className="text-sm font-medium text-secondary-600 hover:text-secondary-700">
                                Все →
                            </Link>
                        </div>

                        <div className="divide-y divide-neutral-100">
                            {riskStudents.slice(0, 3).map((student, index) => (
                                <motion.div
                                    key={student.studentId}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.9 + index * 0.05 }}
                                    className="p-4 hover:bg-neutral-50 transition-colors"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <p className="font-medium text-neutral-900">{student.studentName}</p>
                                            <p className="text-xs text-neutral-500">{student.className}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                            student.riskLevel === 'critical' ? 'bg-red-100 text-red-700' :
                                            student.riskLevel === 'high' ? 'bg-orange-100 text-orange-700' :
                                            'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {student.riskScore}%
                                        </span>
                                    </div>
                                    <p className="text-xs text-neutral-600 mb-3">{student.reason}</p>
                                    <button className="w-full py-2 bg-secondary-50 text-secondary-700 text-xs font-medium rounded-lg hover:bg-secondary-100 transition-colors">
                                        Написать родителям
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0 }}
                        className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
                    >
                        <div className="flex items-center justify-between p-5 border-b border-neutral-200">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-tertiary-400 to-tertiary-600 rounded-lg flex items-center justify-center">
                                    <Bell className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-headline text-lg font-semibold text-neutral-900">
                                        Активность
                                    </h3>
                                    <p className="text-xs text-neutral-500">
                                        Последние события
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="divide-y divide-neutral-100">
                            {recentActivity.map((activity, index) => (
                                <motion.div
                                    key={activity.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.1 + index * 0.05 }}
                                    className="p-4 hover:bg-neutral-50 transition-colors"
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="text-xl">{activity.icon}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-neutral-700 truncate">{activity.description}</p>
                                            <p className="text-xs text-neutral-400 mt-1">{activity.time}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                        className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
                    >
                        <div className="flex items-center justify-between p-5 border-b border-neutral-200">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                                    <Award className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-headline text-lg font-semibold text-neutral-900">
                                        События
                                    </h3>
                                    <p className="text-xs text-neutral-500">
                                        Ближайшие мероприятия
                                    </p>
                                </div>
                            </div>
                            <Link href="/teacher/schedule" className="text-sm font-medium text-secondary-600 hover:text-secondary-700">
                                Календарь →
                            </Link>
                        </div>

                        <div className="divide-y divide-neutral-100">
                            {upcomingEvents.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 1.3 + index * 0.05 }}
                                    className="p-4 hover:bg-neutral-50 transition-colors"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                            event.type === 'test' ? 'bg-red-100' :
                                            event.type === 'meeting' ? 'bg-blue-100' :
                                            'bg-purple-100'
                                        }`}>
                                            {event.type === 'test' ? '📝' :
                                             event.type === 'meeting' ? '👥' :
                                             '🏆'}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-neutral-900 truncate">{event.title}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Calendar className="w-3 h-3 text-neutral-400" />
                                                <span className="text-xs text-neutral-500">{event.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}