import { StudentGrade, AttendanceRecord } from './riskCalculator';

export function generateMockGrades(
    studentId: string,
    scenario: 'excellent' | 'good' | 'declining' | 'critical'
): { recent: StudentGrade[]; previous: StudentGrade[] } {
    const subjects = [
        { id: 'math', name: 'Алгебра' },
        { id: 'physics', name: 'Физика' },
        { id: 'literature', name: 'Литература' },
        { id: 'history', name: 'История' },
        { id: 'chemistry', name: 'Химия' },
    ];

    const gradeRanges = {
        excellent: { recent: [5, 5], previous: [4, 5] },
        good: { recent: [4, 5], previous: [4, 4] },
        declining: { recent: [3, 3], previous: [4, 5] },
        critical: { recent: [2, 3], previous: [3, 4] },
    };

    const range = gradeRanges[scenario];

    const generateGrades = (grades: number[]): StudentGrade[] => {
        return subjects.flatMap(subject =>
            grades.map((grade, idx) => ({
                subjectId: subject.id,
                subjectName: subject.name,
                grade,
                date: new Date(Date.now() - idx * 7 * 24 * 60 * 60 * 1000),
                weight: idx === 0 ? 2.0 : 1.0,
            }))
        );
    };

    return {
        recent: generateGrades(range.recent),
        previous: generateGrades(range.previous),
    };
}

export function generateMockAttendance(
    scenario: 'excellent' | 'good' | 'poor' | 'critical'
): AttendanceRecord[] {
    const records: AttendanceRecord[] = [];
    const totalLessons = 40;

    const absenceRates = {
        excellent: 0.05,
        good: 0.10,
        poor: 0.35,
        critical: 0.55,
    };

    const absenceRate = absenceRates[scenario];
    const absentLessons = Math.floor(totalLessons * absenceRate);

    for (let i = 0; i < totalLessons; i++) {
        const isAbsent = i < absentLessons;
        records.push({
            date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
            status: isAbsent ? 'absent' : 'present',
            lessonId: `lesson_${i}`,
        });
    }

    return records;
}

export const mockStudents = [
    {
        id: 's1',
        name: 'Иванов Александр',
        classId: 'c1',
        className: '10"А"',
        scenario: { grades: 'excellent' as const, attendance: 'excellent' as const },
    },
    {
        id: 's2',
        name: 'Петрова Мария',
        classId: 'c1',
        className: '10"А"',
        scenario: { grades: 'good' as const, attendance: 'good' as const },
    },
    {
        id: 's3',
        name: 'Сидоров Дмитрий',
        classId: 'c1',
        className: '10"А"',
        scenario: { grades: 'declining' as const, attendance: 'poor' as const },
    },
    {
        id: 's4',
        name: 'Козлова Анна',
        classId: 'c1',
        className: '10"А"',
        scenario: { grades: 'critical' as const, attendance: 'critical' as const },
    },
];