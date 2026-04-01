
export interface StudentGrade {
    subjectId: string;
    subjectName: string;
    grade: number;
    date: Date;
    weight?: number;
}

export interface AttendanceRecord {
    date: Date;
    status: 'present' | 'absent' | 'late' | 'excused';
    lessonId: string;
}

export interface StudentRiskProfile {
    studentId: string;
    studentName: string;
    classId: string;
    className: string;
    riskScore: number;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    factors: RiskFactor[];
    recommendations: string[];
    calculatedAt: Date;
}

export interface RiskFactor {
    type: RiskFactorType;
    score: number;
    weight: number;
    description: string;
    trend?: 'improving' | 'stable' | 'declining';
}

export type RiskFactorType =
    | 'grade_average'
    | 'grade_trend'
    | 'attendance'
    | 'homework_completion'
    | 'subject_specific';

export const RISK_THRESHOLDS = {

    gradeAverage: {
        excellent: 4.5,
        good: 4.0,
        satisfactory: 3.0,
        critical: 2.0,
    },

    gradeTrend: {
        improvement: 0.3,
        stable: 0.1,
        decline_warning: 0.3,
        decline_critical: 0.5,
    },

    attendance: {
        excellent: 95,
        good: 85,
        warning: 70,
        critical: 50,
    },

    weights: {
        gradeAverage: 0.35,
        gradeTrend: 0.30,
        attendance: 0.25,
        homeworkCompletion: 0.10,
    },

    levels: {
        low: 25,
        medium: 50,
        high: 75,
        critical: 90,
    },
};

export function calculateGradeAverageRisk(averageGrade: number): RiskFactor {
    const { gradeAverage } = RISK_THRESHOLDS;

    let score: number;
    let description: string;
    let trend: RiskFactor['trend'] = 'stable';

    if (averageGrade >= gradeAverage.excellent) {
        score = 0;
        description = 'Отличная успеваемость';
        trend = 'improving';
    } else if (averageGrade >= gradeAverage.good) {
        score = 15;
        description = 'Хорошая успеваемость';
    } else if (averageGrade >= gradeAverage.satisfactory) {
        score = 50;
        description = 'Удовлетворительная успеваемость, требуется внимание';
        trend = 'declining';
    } else if (averageGrade >= gradeAverage.critical) {
        score = 75;
        description = 'Низкая успеваемость, критическая ситуация';
        trend = 'declining';
    } else {
        score = 100;
        description = 'Критическая успеваемость, необходимо вмешательство';
        trend = 'declining';
    }

    return {
        type: 'grade_average',
        score,
        weight: RISK_THRESHOLDS.weights.gradeAverage,
        description,
        trend,
    };
}

export function calculateGradeTrendRisk(
    recentGrades: StudentGrade[],
    previousGrades: StudentGrade[]
): RiskFactor {
    const { gradeTrend } = RISK_THRESHOLDS;

    const recentAverage = recentGrades.length > 0
        ? recentGrades.reduce((sum, g) => sum + g.grade, 0) / recentGrades.length
        : 0;

    const previousAverage = previousGrades.length > 0
        ? previousGrades.reduce((sum, g) => sum + g.grade, 0) / previousGrades.length
        : 0;

    const change = recentAverage - previousAverage;

    let score: number;
    let description: string;
    let trend: RiskFactor['trend'];

    if (change >= gradeTrend.improvement) {
        score = 0;
        description = `Успеваемость улучшается (+${change.toFixed(2)})`;
        trend = 'improving';
    } else if (Math.abs(change) <= gradeTrend.stable) {
        score = 20;
        description = `Успеваемость стабильна (изменение: ${change.toFixed(2)})`;
        trend = 'stable';
    } else if (change <= -gradeTrend.decline_warning && change > -gradeTrend.decline_critical) {
        score = 60;
        description = `Снижение успеваемости (${change.toFixed(2)})`;
        trend = 'declining';
    } else if (change <= -gradeTrend.decline_critical) {
        score = 90;
        description = `Критическое падение успеваемости (${change.toFixed(2)})`;
        trend = 'declining';
    } else {
        score = 40;
        description = `Незначительное изменение (${change.toFixed(2)})`;
        trend = 'stable';
    }

    return {
        type: 'grade_trend',
        score,
        weight: RISK_THRESHOLDS.weights.gradeTrend,
        description,
        trend,
    };
}

export function calculateAttendanceRisk(attendanceRecords: AttendanceRecord[]): RiskFactor {
    const { attendance } = RISK_THRESHOLDS;

    if (attendanceRecords.length === 0) {
        return {
            type: 'attendance',
            score: 0,
            weight: RISK_THRESHOLDS.weights.attendance,
            description: 'Нет данных о посещаемости',
            trend: 'stable',
        };
    }

    const totalLessons = attendanceRecords.length;
    const presentLessons = attendanceRecords.filter(
        r => r.status === 'present' || r.status === 'excused'
    ).length;

    const attendanceRate = (presentLessons / totalLessons) * 100;
    const absentLessons = attendanceRecords.filter(r => r.status === 'absent').length;

    let score: number;
    let description: string;
    let trend: RiskFactor['trend'] = 'stable';

    if (attendanceRate >= attendance.excellent) {
        score = 0;
        description = `Отличная посещаемость (${attendanceRate.toFixed(1)}%)`;
        trend = 'improving';
    } else if (attendanceRate >= attendance.good) {
        score = 20;
        description = `Хорошая посещаемость (${attendanceRate.toFixed(1)}%, пропусков: ${absentLessons})`;
    } else if (attendanceRate >= attendance.warning) {
        score = 60;
        description = `Низкая посещаемость (${attendanceRate.toFixed(1)}%, пропусков: ${absentLessons})`;
        trend = 'declining';
    } else if (attendanceRate >= attendance.critical) {
        score = 85;
        description = `Критическая посещаемость (${attendanceRate.toFixed(1)}%, пропусков: ${absentLessons})`;
        trend = 'declining';
    } else {
        score = 100;
        description = `Катастрофическая посещаемость (${attendanceRate.toFixed(1)}%, пропусков: ${absentLessons})`;
        trend = 'declining';
    }

    return {
        type: 'attendance',
        score,
        weight: RISK_THRESHOLDS.weights.attendance,
        description,
        trend,
    };
}

export function calculateHomeworkRisk(
    completedHomework: number,
    totalHomework: number
): RiskFactor {
    if (totalHomework === 0) {
        return {
            type: 'homework_completion',
            score: 0,
            weight: RISK_THRESHOLDS.weights.homeworkCompletion,
            description: 'Нет данных о домашних заданиях',
            trend: 'stable',
        };
    }

    const completionRate = (completedHomework / totalHomework) * 100;

    let score: number;
    let description: string;
    let trend: RiskFactor['trend'];

    if (completionRate >= 95) {
        score = 0;
        description = `Все ДЗ выполнены (${completionRate.toFixed(1)}%)`;
        trend = 'improving';
    } else if (completionRate >= 80) {
        score = 25;
        description = `Хорошее выполнение ДЗ (${completionRate.toFixed(1)}%)`;
        trend = 'stable';
    } else if (completionRate >= 60) {
        score = 55;
        description = `Недостаточное выполнение ДЗ (${completionRate.toFixed(1)}%)`;
        trend = 'declining';
    } else {
        score = 90;
        description = `Критическое невыполнение ДЗ (${completionRate.toFixed(1)}%)`;
        trend = 'declining';
    }

    return {
        type: 'homework_completion',
        score,
        weight: RISK_THRESHOLDS.weights.homeworkCompletion,
        description,
        trend,
    };
}

export function calculateSubjectRisk(grades: StudentGrade[]): RiskFactor {
    if (grades.length === 0) {
        return {
            type: 'subject_specific',
            score: 0,
            weight: 0.10,
            description: 'Нет оценок по предмету',
            trend: 'stable',
        };
    }

    const average = grades.reduce((sum, g) => sum + g.grade, 0) / grades.length;
    const latestGrade = grades[grades.length - 1].grade;

    let score: number;
    let description: string;
    let trend: RiskFactor['trend'];

    if (average >= 4.5) {
        score = 0;
        description = `Отличная успеваемость по предмету (средний: ${average.toFixed(2)})`;
        trend = 'improving';
    } else if (average >= 4.0) {
        score = 20;
        description = `Хорошая успеваемость по предмету (средний: ${average.toFixed(2)})`;
        trend = 'stable';
    } else if (average >= 3.0) {
        score = 50;
        description = `Удовлетворительная успеваемость по предмету (средний: ${average.toFixed(2)})`;
        trend = 'declining';
    } else {
        score = 80;
        description = `Низкая успеваемость по предмету (средний: ${average.toFixed(2)})`;
        trend = 'declining';
    }

    if (latestGrade <= 2) {
        score = Math.min(100, score + 20);
        description += ` (последняя оценка: ${latestGrade})`;
    }

    return {
        type: 'subject_specific',
        score,
        weight: 0.10,
        description,
        trend,
    };
}

export function calculateStudentRisk(params: {
    studentId: string;
    studentName: string;
    classId: string;
    className: string;
    averageGrade: number;
    recentGrades: StudentGrade[];
    previousGrades: StudentGrade[];
    attendanceRecords: AttendanceRecord[];
    completedHomework: number;
    totalHomework: number;
    subjectGrades: Record<string, StudentGrade[]>;
}): StudentRiskProfile {

    const factors: RiskFactor[] = [
        calculateGradeAverageRisk(params.averageGrade),
        calculateGradeTrendRisk(params.recentGrades, params.previousGrades),
        calculateAttendanceRisk(params.attendanceRecords),
        calculateHomeworkRisk(params.completedHomework, params.totalHomework),
    ];

    const subjectRisks = Object.entries(params.subjectGrades).map(([, grades]) =>
        calculateSubjectRisk(grades)
    );

    const maxSubjectRisk = subjectRisks.length > 0
        ? Math.max(...subjectRisks.map(r => r.score))
        : 0;

    if (maxSubjectRisk > 50) {
        factors.push({
            type: 'subject_specific',
            score: maxSubjectRisk,
            weight: 0.10,
            description: `Критическая успеваемость по одному или нескольким предметам`,
            trend: 'declining',
        });
    }

    const totalRiskScore = factors.reduce(
        (sum, factor) => sum + (factor.score * factor.weight),
        0
    );

    const { levels } = RISK_THRESHOLDS;
    let riskLevel: StudentRiskProfile['riskLevel'];

    if (totalRiskScore >= levels.critical) {
        riskLevel = 'critical';
    } else if (totalRiskScore >= levels.high) {
        riskLevel = 'high';
    } else if (totalRiskScore >= levels.medium) {
        riskLevel = 'medium';
    } else {
        riskLevel = 'low';
    }

    const recommendations = generateRecommendations(factors);

    return {
        studentId: params.studentId,
        studentName: params.studentName,
        classId: params.classId,
        className: params.className,
        riskScore: Math.round(totalRiskScore),
        riskLevel,
        factors,
        recommendations,
        calculatedAt: new Date(),
    };
}

function generateRecommendations(
    factors: RiskFactor[]
): string[] {
    const recommendations: string[] = [];

    for (const factor of factors) {
        if (factor.score >= 60) {
            switch (factor.type) {
                case 'grade_average':
                    recommendations.push('Организовать дополнительные занятия по основным предметам');
                    recommendations.push('Провести встречу с родителями для обсуждения успеваемости');
                    break;
                case 'grade_trend':
                    recommendations.push('Выявить причины снижения успеваемости');
                    recommendations.push('Составить индивидуальный план улучшения оценок');
                    break;
                case 'attendance':
                    recommendations.push('Выяснить причины пропусков');
                    recommendations.push('Усилить контроль посещаемости');
                    recommendations.push('Информировать родителей о пропусках');
                    break;
                case 'homework_completion':
                    recommendations.push('Ввести ежедневный контроль выполнения ДЗ');
                    recommendations.push('Предоставить дополнительные материалы для самостоятельной работы');
                    break;
                case 'subject_specific':
                    recommendations.push('Провести диагностику знаний по проблемным предметам');
                    recommendations.push('Назначить консультации с преподавателями');
                    break;
            }
        }
    }

    return [...new Set(recommendations)].slice(0, 5);
}