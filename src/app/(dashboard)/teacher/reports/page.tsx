"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
    FileText,
    Sparkles,
    Download,
    Send,
    Clock,
    CheckCircle,
    Loader2,
    ChevronDown,
} from "lucide-react";
import TeacherSidebar from "@/components/dashboard/teacher/Sidebar";
import TeacherHeader from "@/components/dashboard/teacher/Header";

interface Report {
    id: string;
    className: string;
    type: string;
    date: string;
    status: "completed" | "generating" | "pending";
}

export default function TeacherReportsPage() {
    const [selectedClass, setSelectedClass] = useState('10"А"');
    const [reportType, setReportType] = useState("weekly");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedReport, setGeneratedReport] = useState<string | null>(null);

    const classes = ['10"А"', '10"Б"', '11"А"', '11"Б"'];
    const reportTypes = [
        { id: "weekly", name: "Еженедельный отчёт", description: "Успеваемость за неделю" },
        { id: "monthly", name: "Ежемесячный отчёт", description: "Анализ за месяц" },
        { id: "quarterly", name: "Квартальный отчёт", description: "Итоги четверти" },
        { id: "custom", name: "Произвольный период", description: "Выбрать даты" },
    ];

    const recentReports: Report[] = [
        {
            id: "1",
            className: '10"А"',
            type: "Еженедельный",
            date: "25.01.2025",
            status: "completed",
        },
        {
            id: "2",
            className: '10"Б"',
            type: "Ежемесячный",
            date: "20.01.2025",
            status: "completed",
        },
        {
            id: "3",
            className: '11"А"',
            type: "Еженедельный",
            date: "Сейчас",
            status: "generating",
        },
    ];

    const handleGenerateReport = async () => {
        setIsGenerating(true);
        // Имитация генерации
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setGeneratedReport(
            `ОТЧЁТ ОБ УСПЕВАЕМОСТИ КЛАССА ${selectedClass}\nПериод: 20-26 Января 2025\n\nСРЕДНИЙ БАЛЛ: 4.3 (+0.2)\n\nУСПЕВАЕМОСТЬ:\n• Отлично (5): 35%\n• Хорошо (4): 45%\n• Удовлетворительно (3): 15%\n• Неудовлетворительно (2): 5%\n\nУЧЕНИКИ В РИСКЕ:\n1. Иванов А. - падение на 30%\n2. Петрова М. - пропуски 5 уроков\n\nРЕКОМЕНДАЦИИ:\n• Провести индивидуальную работу с учениками в риске\n• Усилить контроль посещаемости\n• Организовать дополнительные занятия`
        );
        setIsGenerating(false);
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
                        >
                            <h1 className="text-2xl font-bold font-headline text-neutral-900">
                                AI-Генератор Отчётов
                            </h1>
                            <p className="text-neutral-600 mt-1">
                                Автоматическое создание отчётов об успеваемости класса
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Generator Form */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="lg:col-span-2 bg-white rounded-xl border border-neutral-200 shadow-sm p-6"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                                        <Sparkles className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-neutral-900">
                                            Создать новый отчёт
                                        </h2>
                                        <p className="text-sm text-neutral-600">
                                            AI проанализирует данные и создаст отчёт за 1 минуту
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {/* Class Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Класс
                                        </label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                            {classes.map((cls) => (
                                                <button
                                                    key={cls}
                                                    onClick={() => setSelectedClass(cls)}
                                                    className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${
                                                        selectedClass === cls
                                                            ? "border-secondary-500 bg-secondary-50 text-secondary-700"
                                                            : "border-neutral-200 hover:border-neutral-300"
                                                    }`}
                                                >
                                                    {cls}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Report Type */}
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                                            Тип отчёта
                                        </label>
                                        <div className="space-y-2">
                                            {reportTypes.map((type) => (
                                                <button
                                                    key={type.id}
                                                    onClick={() => setReportType(type.id)}
                                                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                                                        reportType === type.id
                                                            ? "border-secondary-500 bg-secondary-50"
                                                            : "border-neutral-200 hover:border-neutral-300"
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="font-medium text-neutral-900">
                                                                {type.name}
                                                            </p>
                                                            <p className="text-sm text-neutral-600">
                                                                {type.description}
                                                            </p>
                                                        </div>
                                                        {reportType === type.id && (
                                                            <CheckCircle className="w-5 h-5 text-secondary-600" />
                                                        )}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Generate Button */}
                                    <button
                                        onClick={handleGenerateReport}
                                        disabled={isGenerating}
                                        className="w-full py-4 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isGenerating ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                <span>AI генерирует отчёт...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="w-5 h-5" />
                                                <span>Сгенерировать отчёт</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </motion.div>

                            {/* Recent Reports */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6"
                            >
                                <h3 className="font-semibold text-neutral-900 mb-4">
                                    Недавние отчёты
                                </h3>
                                <div className="space-y-3">
                                    {recentReports.map((report) => (
                                        <div
                                            key={report.id}
                                            className="p-4 bg-neutral-50 rounded-lg border border-neutral-200"
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <p className="font-medium text-neutral-900">
                                                        {report.className}
                                                    </p>
                                                    <p className="text-sm text-neutral-600">{report.type}</p>
                                                </div>
                                                {report.status === "completed" ? (
                                                    <CheckCircle className="w-5 h-5 text-green-600" />
                                                ) : (
                                                    <Loader2 className="w-5 h-5 text-secondary-600 animate-spin" />
                                                )}
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-1 text-xs text-neutral-500">
                                                    <Clock className="w-3 h-3" />
                                                    {report.date}
                                                </div>
                                                {report.status === "completed" && (
                                                    <button className="text-xs font-medium text-secondary-600 hover:text-secondary-700 flex items-center gap-1">
                                                        <Download className="w-3 h-3" />
                                                        Скачать
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* Generated Report */}
                        {generatedReport && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden"
                            >
                                <div className="flex items-center justify-between p-5 border-b border-neutral-200">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-6 h-6 text-secondary-600" />
                                        <h3 className="text-lg font-semibold text-neutral-900">
                                            Сгенерированный отчёт
                                        </h3>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="flex items-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors text-sm font-medium">
                                            <Send className="w-4 h-4" />
                                            Отправить
                                        </button>
                                        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white rounded-lg hover:shadow-md transition-all text-sm font-medium">
                                            <Download className="w-4 h-4" />
                                            Скачать PDF
                                        </button>
                                    </div>
                                </div>
                                <div className="p-6">
                  <pre className="whitespace-pre-wrap font-mono text-sm text-neutral-700 bg-neutral-50 p-4 rounded-lg">
                    {generatedReport}
                  </pre>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}