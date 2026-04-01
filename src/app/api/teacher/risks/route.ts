import { NextResponse } from 'next/server';
import {
    calculateStudentRisk,
    StudentGrade,
} from '@/lib/risk-analysis/riskCalculator';
import { mockStudents, generateMockGrades, generateMockAttendance } from '@/lib/risk-analysis/mockData';

export async function GET() {
    try {

        const studentsAtRisk = mockStudents.map(student => {
            const grades = generateMockGrades(student.id, student.scenario.grades);
            const attendance = generateMockAttendance(student.scenario.attendance);

            const allGrades = [...grades.recent, ...grades.previous];
            const averageGrade = allGrades.length > 0
                ? allGrades.reduce((sum, g) => sum + g.grade, 0) / allGrades.length
                : 0;

            const subjectGrades: Record<string, StudentGrade[]> = {};
            for (const grade of allGrades) {
                if (!subjectGrades[grade.subjectId]) {
                    subjectGrades[grade.subjectId] = [];
                }
                subjectGrades[grade.subjectId].push(grade);
            }

            const riskProfile = calculateStudentRisk({
                studentId: student.id,
                studentName: student.name,
                classId: student.classId,
                className: student.className,
                averageGrade,
                recentGrades: grades.recent,
                previousGrades: grades.previous,
                attendanceRecords: attendance,
                completedHomework: Math.floor(Math.random() * 20) + 10,
                totalHomework: 20,
                subjectGrades,
            });

            return riskProfile;
        });

        const sortedByRisk = studentsAtRisk.sort((a, b) => b.riskScore - a.riskScore);

        return NextResponse.json({
            success: true,
            data: {
                students: sortedByRisk,
                summary: {
                    total: sortedByRisk.length,
                    critical: sortedByRisk.filter(s => s.riskLevel === 'critical').length,
                    high: sortedByRisk.filter(s => s.riskLevel === 'high').length,
                    medium: sortedByRisk.filter(s => s.riskLevel === 'medium').length,
                    low: sortedByRisk.filter(s => s.riskLevel === 'low').length,
                },
            },
        });
    } catch (error) {
        console.error('Risk calculation error:', error);
        return NextResponse.json(
            { success: false, error: 'Ошибка расчёта рисков' },
            { status: 500 }
        );
    }
}