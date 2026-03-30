"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    AlertTriangle,
    TrendingDown,
    Users,
    Search,
    Filter,
    Mail,
    Phone,
    ArrowRight,
    ChevronDown,
} from "lucide-react";
import TeacherSidebar from "@/components/dashboard/teacher/Sidebar";
import TeacherHeader from "@/components/dashboard/teacher/Header";

interface RiskFactor {
    type: string;
    score: number;
    weight: number;
    description: string;
    trend?: 'improving' | 'stable' | 'declining';
}

interface RiskStudent {
    studentId: string;
    studentName: string;
    classId: string;
    className: string;
    riskScore: number;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    factors: RiskFactor[];
    recommendations: string[];
    calculatedAt: string;
}

export default function TeacherRisksPage() {
    const [students, setStudents] = useState<RiskStudent[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedStudent, setSelectedStudent] = useState<RiskStudent | null>(null);
    const [filter, setFilter] = useState<'all' | 'critical' | 'high' | 'medium'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchRisks();
    }, []);

    const fetchRisks = async () => {
        try {
            const response = await fetch('/api/teacher/risks');
            const data = await response.json();
            if (data.success) {
                setStudents(data.data.students);
            }
        } catch (error) {
            console.error('Failed to fetch risks:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredStudents = students.filter(student => {
        const matchesFilter = filter === 'all' || student.riskLevel === filter;
        const matchesSearch = student.studentName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getRiskColor = (level: string) => {
        switch (level) {
            case 'critical': return 'bg-red-100 text-red-700 border-red-300';
            case 'high': return 'bg-orange-100 text-orange-700 border-orange-300';
            case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
            default: return 'bg-green-100 text-green-700 border-green-300';
        }
    };

    const getRiskLabel = (level: string) => {
        switch (level) {
            case 'critical': return 'Критический';
            case 'high': return 'Высокий';
            case 'medium': return 'Средний';
            default: return 'Низкий';
        }
    };

    const getFactorIcon = (type: string) => {
        switch (type) {
            case 'grade_average': return '📊';
            case 'grade_trend': return '📈';
            case 'attendance': return '📅';
            case 'homework_completion': return '📝';
            case 'subject_specific': return '📚';
            default: return '⚠️';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-secondary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-neutral-600 font-medium">Расчёт рисков...</p>
                </div>
            </div>
        );
    }

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
                                    <Mail className="w-4 h-4" />
                                    <span className="text-sm font-medium">Уведомить родителей</span>
                                </button>
                            </div>
                        </motion.div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
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
                                            {students.filter(s => s.riskLevel === 'critical').length}
                                        </p>
                                        <p className="text-sm text-neutral-600">Критический</p>
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
                                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <TrendingDown className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold font-headline text-neutral-900">
                                            {students.filter(s => s.riskLevel === 'high').length}
                                        </p>
                                        <p className="text-sm text-neutral-600">Высокий</p>
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
                                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                        <AlertTriangle className="w-5 h-5 text-yellow-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold font-headline text-neutral-900">
                                            {students.filter(s => s.riskLevel === 'medium').length}
                                        </p>
                                        <p className="text-sm text-neutral-600">Средний</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-white rounded-xl border border-neutral-200 p-5"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                                        <Users className="w-5 h-5 text-secondary-700" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold font-headline text-neutral-900">
                                            {students.length}
                                        </p>
                                        <p className="text-sm text-neutral-600">Всего учеников</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Filters */}
                        <div className="bg-white rounded-xl border border-neutral-200 p-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                    <input
                                        type="text"
                                        placeholder="Поиск учеников..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-neutral-100 rounded-lg border-2 border-transparent focus:border-secondary-500 focus:bg-white focus:outline-none transition-all"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    {(['all', 'critical', 'high', 'medium'] as const).map((level) => (
                                        <button
                                            key={level}
                                            onClick={() => setFilter(level)}
                                            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                                filter === level
                                                    ? 'bg-secondary-500 text-white'
                                                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                            }`}
                                        >
                                            {level === 'all' ? 'Все' : level === 'critical' ? 'Критический' : level === 'high' ? 'Высокий' : 'Средний'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Students List */}
                        <div className="space-y-4">
                            {filteredStudents.map((student, index) => (
                                <motion.div
                                    key={student.studentId}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-lg transition-all"
                                >
                                    <div className="flex items-start gap-4">
                                        {/* Avatar */}
                                        <div
                                            className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg ${
                                                student.riskLevel === 'critical' || student.riskLevel === 'high'
                                                    ? 'bg-red-100 text-red-600'
                                                    : 'bg-yellow-100 text-yellow-600'
                                            }`}
                                        >
                                            {student.studentName.split(' ').map(n => n[0]).join('')}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <h3 className="font-semibold text-neutral-900 text-lg">
                                                        {student.studentName}
                                                    </h3>
                                                    <p className="text-sm text-neutral-600 mt-0.5">
                                                        {student.className}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-3">
                          <span
                              className={`px-3 py-1 rounded-full text-xs font-bold border ${getRiskColor(
                                  student.riskLevel
                              )}`}
                          >
                            {getRiskLabel(student.riskLevel)} ({student.riskScore}%)
                          </span>
                                                    <button
                                                        onClick={() => setSelectedStudent(selectedStudent?.studentId === student.studentId ? null : student)}
                                                        className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                                                    >
                                                        <ChevronDown className={`w-5 h-5 text-neutral-600 transition-transform ${
                                                            selectedStudent?.studentId === student.studentId ? 'rotate-180' : ''
                                                        }`} />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Risk Factors Preview */}
                                            <div className="flex items-center gap-4 mb-3">
                                                {student.factors.slice(0, 3).map((factor, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 text-sm">
                                                        <span>{getFactorIcon(factor.type)}</span>
                                                        <span className={`font-medium ${
                                                            factor.score >= 60 ? 'text-red-600' : 'text-green-600'
                                                        }`}>
                              {factor.score}%
                            </span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center gap-3">
                                                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white text-sm font-medium rounded-lg hover:shadow-md transition-all">
                                                    <Mail className="w-4 h-4" />
                                                    Связаться с родителями
                                                </button>
                                                <button className="flex items-center gap-2 px-4 py-2 bg-neutral-100 text-neutral-700 text-sm font-medium rounded-lg hover:bg-neutral-200 transition-all">
                                                    Просмотреть профиль
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </div>

                                            {/* Expanded Details */}
                                            {selectedStudent?.studentId === student.studentId && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    className="mt-4 pt-4 border-t border-neutral-200"
                                                >
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        {/* Risk Factors */}
                                                        <div>
                                                            <h4 className="font-semibold text-neutral-900 mb-3">Факторы риска</h4>
                                                            <div className="space-y-2">
                                                                {student.factors.map((factor, idx) => (
                                                                    <div key={idx} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                                                                        <div className="flex items-center gap-2">
                                                                            <span>{getFactorIcon(factor.type)}</span>
                                                                            <span className="text-sm text-neutral-700">{factor.description}</span>
                                                                        </div>
                                                                        <span className={`text-sm font-bold ${
                                                                            factor.score >= 60 ? 'text-red-600' : 'text-green-600'
                                                                        }`}>
                                      {factor.score}%
                                    </span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Recommendations */}
                                                        <div>
                                                            <h4 className="font-semibold text-neutral-900 mb-3">Рекомендации</h4>
                                                            <div className="space-y-2">
                                                                {student.recommendations.map((rec, idx) => (
                                                                    <div key={idx} className="flex items-start gap-2 p-3 bg-secondary-50 rounded-lg">
                                                                        <div className="w-2 h-2 bg-secondary-500 rounded-full mt-2 flex-shrink-0" />
                                                                        <span className="text-sm text-neutral-700">{rec}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
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