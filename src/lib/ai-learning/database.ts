

import { createClient } from '@/lib/supabase/client';
import type {
  Subject,
  StudentRecord,
  SubjectSummary,
  RecentGradeRow,
  GradeEntry,
  TopicPerformance,
} from './types';

const subjectColors: Record<string, { color: string; gradientFrom: string; gradientTo: string }> = {
  'алгебра': { color: 'bg-primary-500', gradientFrom: 'from-primary-400', gradientTo: 'to-primary-600' },
  'математика': { color: 'bg-primary-500', gradientFrom: 'from-primary-400', gradientTo: 'to-primary-600' },
  'физика': { color: 'bg-tertiary-500', gradientFrom: 'from-tertiary-400', gradientTo: 'to-tertiary-600' },
  'литература': { color: 'bg-secondary-500', gradientFrom: 'from-secondary-400', gradientTo: 'to-secondary-600' },
  'история': { color: 'bg-purple-500', gradientFrom: 'from-purple-400', gradientTo: 'to-purple-600' },
  'английский язык': { color: 'bg-pink-500', gradientFrom: 'from-pink-400', gradientTo: 'to-pink-600' },
  'химия': { color: 'bg-orange-500', gradientFrom: 'from-orange-400', gradientTo: 'to-orange-600' },
  'биология': { color: 'bg-green-500', gradientFrom: 'from-green-400', gradientTo: 'to-green-600' },
  'геометрия': { color: 'bg-blue-500', gradientFrom: 'from-blue-400', gradientTo: 'to-blue-600' },
  'информатика': { color: 'bg-cyan-500', gradientFrom: 'from-cyan-400', gradientTo: 'to-cyan-600' },
  'география': { color: 'bg-emerald-500', gradientFrom: 'from-emerald-400', gradientTo: 'to-emerald-600' },
};

function getSubjectColor(name: string): { color: string; gradientFrom: string; gradientTo: string } {
  const lowerName = name.toLowerCase();
  return subjectColors[lowerName] || { color: 'bg-neutral-500', gradientFrom: 'from-neutral-400', gradientTo: 'to-neutral-600' };
}

function makeSubjectId(subjectId: number): string {
  return `subj_${subjectId}`;
}

function makeTopicId(topicId: number): string {
  return `topic_${topicId}`;
}

let cachedSubjects: Subject[] | null = null;
let subjectsLoading: Promise<Subject[]> | null = null;

export async function fetchSubjects(): Promise<Subject[]> {
  if (cachedSubjects) return cachedSubjects;
  if (subjectsLoading) return subjectsLoading;

  subjectsLoading = (async () => {
    const supabase = createClient();

    const { data: subjectsData, error: subjectsError } = await supabase
      .from('subjects')
      .select('*')
      .order('order_index', { ascending: true });

    if (subjectsError) {
      console.error('Error fetching subjects:', subjectsError);
      subjectsLoading = null;
      return [];
    }

    const { data: topicsData, error: topicsError } = await supabase
      .from('topics')
      .select('*')
      .order('order_index', { ascending: true });

    if (topicsError) {
      console.error('Error fetching topics:', topicsError);
    }

    const topicsBySubject = new Map<number, typeof topicsData>();
    topicsData?.forEach((topic) => {
      const existing = topicsBySubject.get(topic.subject_id) || [];
      existing.push(topic);
      topicsBySubject.set(topic.subject_id, existing);
    });

    cachedSubjects = subjectsData.map((subject) => {
      const subjectTopics = topicsBySubject.get(subject.id) || [];
      const colorConfig = getSubjectColor(subject.name);

      return {
        id: makeSubjectId(subject.id),
        name: subject.name,
        color: colorConfig.color,
        gradientFrom: colorConfig.gradientFrom,
        gradientTo: colorConfig.gradientTo,
        topics: subjectTopics.map((topic) => ({
          id: makeTopicId(topic.id),
          name: topic.name,
          subtopics: topic.description ? [topic.description] : [],
        })),
      };
    });

    subjectsLoading = null;
    return cachedSubjects;
  })();

  return subjectsLoading;
}

export async function getSubjectByIdAsync(subjectId: string): Promise<Subject | undefined> {
  const subjects = await fetchSubjects();
  return subjects.find((s) => s.id === subjectId);
}

export function getSubjectById(subjectId: string): Subject | undefined {
  if (!cachedSubjects) return undefined;
  return cachedSubjects.find((s) => s.id === subjectId);
}

const studentCache = new Map<string, { record: StudentRecord | null; timestamp: number }>();
const CACHE_TTL = 30000;

export async function fetchStudentRecord(studentId: string): Promise<StudentRecord | null> {

  const cached = studentCache.get(studentId);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.record;
  }

  const supabase = createClient();

  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', studentId)
    .single();

  const { data: grades, error: gradesError } = await supabase
    .from('grades')
    .select(`
      id,
      topic_id,
      score,
      grade_date,
      exam_score,
      attendance_percentage
    `)
    .eq('user_id', studentId)
    .order('grade_date', { ascending: true });

  if (gradesError) {
    console.error('Error fetching grades:', gradesError);
    studentCache.set(studentId, { record: null, timestamp: Date.now() });
    return null;
  }

  if (!grades || grades.length === 0) {
    const emptyRecord: StudentRecord = {
      studentId,
      name: userData?.full_name || 'Ученик',
      classId: 'c1',
      className: '10"A"',
      trainingProgress: {},
      topicPerformance: [],
    };
    studentCache.set(studentId, { record: emptyRecord, timestamp: Date.now() });
    return emptyRecord;
  }

  const topicIds = [...new Set(grades.map((g) => g.topic_id))];
  const { data: topics } = await supabase
    .from('topics')
    .select('id, subject_id, name')
    .in('id', topicIds);

  if (!topics) {
    studentCache.set(studentId, { record: null, timestamp: Date.now() });
    return null;
  }

  const gradesByTopic = new Map<number, typeof grades>();
  grades.forEach((grade) => {
    const existing = gradesByTopic.get(grade.topic_id) || [];
    existing.push(grade);
    gradesByTopic.set(grade.topic_id, existing);
  });

  const topicPerformance: TopicPerformance[] = [];

  for (const [topicId, topicGrades] of gradesByTopic) {
    const topic = topics.find((t) => t.id === topicId);
    if (!topic) continue;

    const gradeHistory: GradeEntry[] = topicGrades.map((g, idx) => ({
      score: g.score || 0,
      type: g.exam_score !== null ? 'exam' : idx % 3 === 0 ? 'test' : 'homework',
      date: g.grade_date.split('T')[0],
      topicId: makeTopicId(topicId),
      label: g.exam_score !== null ? 'Экзамен' : undefined,
    }));

    const attendanceValues = topicGrades
      .filter((g) => g.attendance_percentage !== null)
      .map((g) => g.attendance_percentage as number);
    const avgAttendance = attendanceValues.length > 0
      ? attendanceValues.reduce((a, b) => a + b, 0) / attendanceValues.length
      : 85;

    const examScores = topicGrades
      .filter((g) => g.exam_score !== null)
      .map((g) => g.exam_score as number);
    const lastExamScore = examScores.length > 0 ? examScores[examScores.length - 1] : null;

    topicPerformance.push({
      topicId: makeTopicId(topicId),
      subjectId: makeSubjectId(topic.subject_id),
      gradeHistory,
      attendanceRate: Math.round(avgAttendance),
      lastExamScore,
    });
  }

  const record: StudentRecord = {
    studentId,
    name: userData?.full_name || 'Ученик',
    classId: 'c1',
    className: '10"A"',
    trainingProgress: {},
    topicPerformance,
  };

  studentCache.set(studentId, { record, timestamp: Date.now() });
  return record;
}

export function getStudentRecord(studentId: string): StudentRecord | null {
  const cached = studentCache.get(studentId);
  return cached?.record || null;
}

export async function initializeStudentData(studentId: string): Promise<void> {
  await Promise.all([
    fetchSubjects(),
    fetchStudentRecord(studentId),
  ]);
}

export async function fetchSubjectSummaries(studentId: string): Promise<SubjectSummary[]> {
  const subjects = await fetchSubjects();
  const record = await fetchStudentRecord(studentId);

  if (!record) {
    return subjects.map((subject) => ({
      id: subject.id,
      name: subject.name,
      color: subject.color,
      grade: 0,
      progress: 0,
      trend: 'stable' as const,
    }));
  }

  return subjects.map((subject) => {
    const topicPerfs = record.topicPerformance.filter(
      (tp) => tp.subjectId === subject.id,
    );

    const allGrades = topicPerfs.flatMap((tp) => tp.gradeHistory);

    if (allGrades.length === 0) {
      return {
        id: subject.id,
        name: subject.name,
        color: subject.color,
        grade: 0,
        progress: 0,
        trend: 'stable' as const,
      };
    }

    const avgGrade =
      allGrades.reduce((sum, g) => sum + g.score, 0) / allGrades.length;

    const sorted = [...allGrades].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    const recent = sorted.slice(-3);
    const previous = sorted.slice(-6, -3);
    const recentAvg =
      recent.reduce((s, g) => s + g.score, 0) / (recent.length || 1);
    const prevAvg =
      previous.length > 0
        ? previous.reduce((s, g) => s + g.score, 0) / previous.length
        : recentAvg;
    const diff = recentAvg - prevAvg;

    const trend: 'up' | 'down' | 'stable' =
      diff > 0.2 ? 'up' : diff < -0.2 ? 'down' : 'stable';

    return {
      id: subject.id,
      name: subject.name,
      color: subject.color,
      grade: Math.round(avgGrade),
      progress: Math.round(avgGrade),
      trend,
    };
  });
}

export function getSubjectSummaries(studentId: string): SubjectSummary[] {
  if (!cachedSubjects) return [];
  const record = studentCache.get(studentId)?.record;
  if (!record) return [];

  return cachedSubjects.map((subject) => {
    const topicPerfs = record.topicPerformance.filter(
      (tp) => tp.subjectId === subject.id,
    );

    const allGrades = topicPerfs.flatMap((tp) => tp.gradeHistory);

    if (allGrades.length === 0) {
      return {
        id: subject.id,
        name: subject.name,
        color: subject.color,
        grade: 0,
        progress: 0,
        trend: 'stable' as const,
      };
    }

    const avgGrade =
      allGrades.reduce((sum, g) => sum + g.score, 0) / allGrades.length;

    const sorted = [...allGrades].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    const recent = sorted.slice(-3);
    const previous = sorted.slice(-6, -3);
    const recentAvg =
      recent.reduce((s, g) => s + g.score, 0) / (recent.length || 1);
    const prevAvg =
      previous.length > 0
        ? previous.reduce((s, g) => s + g.score, 0) / previous.length
        : recentAvg;
    const diff = recentAvg - prevAvg;

    const trend: 'up' | 'down' | 'stable' =
      diff > 0.2 ? 'up' : diff < -0.2 ? 'down' : 'stable';

    return {
      id: subject.id,
      name: subject.name,
      color: subject.color,
      grade: Math.round(avgGrade),
      progress: Math.round(avgGrade),
      trend,
    };
  });
}

export async function fetchRecentGrades(
  studentId: string,
  limit = 10,
): Promise<RecentGradeRow[]> {
  const record = await fetchStudentRecord(studentId);
  if (!record) return [];

  return getRecentGradesFromRecord(record, limit);
}

export function getRecentGrades(
  studentId: string,
  limit = 10,
): RecentGradeRow[] {
  const record = getStudentRecord(studentId);
  if (!record) return [];

  return getRecentGradesFromRecord(record, limit);
}

function getRecentGradesFromRecord(
  record: StudentRecord,
  limit = 10,
): RecentGradeRow[] {
  const rows: RecentGradeRow[] = [];

  for (const tp of record.topicPerformance) {
    const subject = getSubjectById(tp.subjectId);
    const topic = subject?.topics.find((t) => t.id === tp.topicId);
    if (!subject || !topic) continue;

    for (const g of tp.gradeHistory) {

      const [y, m, d] = g.date.split('-');
      rows.push({
        subject: subject.name,
        topic: g.label ?? topic.name,
        date: `${d}.${m}.${y}`,
        grade: g.score,
        type: g.type,
      });
    }
  }

  return rows
    .sort((a, b) => {
      const parse = (s: string) => {
        const [dd, mm, yyyy] = s.split('.');
        return new Date(`${yyyy}-${mm}-${dd}`).getTime();
      };
      return parse(b.date) - parse(a.date);
    })
    .slice(0, limit);
}

export async function fetchTrainingCards(studentId: string): Promise<Record<string, number>> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('training_cards')
    .select('topic_id, status')
    .eq('user_id', studentId);

  if (error) {
    console.error('Error fetching training cards:', error);
    return {};
  }

  const progress: Record<string, number> = {};
  data?.forEach((card) => {
    const topicId = makeTopicId(card.topic_id);
    progress[topicId] = card.status === 'completed' ? 100 : card.status === 'in_progress' ? 50 : 0;
  });

  return progress;
}

export async function fetchRawPerformanceData(studentId: string): Promise<import('./types').AIInputData | null> {
  const [subjects, record, recentGrades] = await Promise.all([
    fetchSubjects(),
    fetchStudentRecord(studentId),
    fetchRecentGrades(studentId, 50),
  ]);

  if (!record) {
    return null;
  }

  return {
    studentName: record.name,
    subjects,
    topicPerformances: record.topicPerformance,
    recentGrades,
  };
}
