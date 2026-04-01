

import { createClient } from '@/lib/supabase/client';
import type { Subject, Topic, GradeEntry, TopicPerformance, StudentRecord } from './types';

interface SupabaseUser {
  id: string;
  full_name: string | null;
  email: string | null;
  grade_level: number | null;
  created_at: string;
}

interface SupabaseSubject {
  id: number;
  name: string;
  description: string | null;
  order_index: number | null;
  created_at: string;
}

interface SupabaseTopic {
  id: number;
  subject_id: number;
  name: string;
  description: string | null;
  order_index: number | null;
  created_at: string;
}

interface SupabaseGrade {
  id: number;
  user_id: string;
  topic_id: number;
  score: number | null;
  grade_date: string;
  exam_score: number | null;
  attendance_percentage: number | null;
}

interface SupabaseResource {
  id: number;
  topic_id: number;
  title: string;
  url: string;
  resource_type: string;
  difficulty: string | null;
  created_at: string;
}

interface SupabaseTrainingCard {
  id: number;
  user_id: string;
  topic_id: number;
  weakness_score: number | null;
  status: 'pending' | 'in_progress' | 'completed';
  xp_reward: number | null;
  deadline: string | null;
  ai_insight: string | null;
  created_at: string;
  updated_at: string;
}

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

function extractNumericId(id: string): number {
  const match = id.match(/(?:subj_|topic_)(\d+)/);
  return match ? parseInt(match[1], 10) : parseInt(id, 10);
}

export async function fetchSubjects(): Promise<Subject[]> {
  const supabase = createClient();

  const { data: subjectsData, error: subjectsError } = await supabase
    .from('subjects')
    .select('*')
    .order('order_index', { ascending: true });

  if (subjectsError) {
    console.error('Error fetching subjects:', subjectsError);
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

  return subjectsData.map((subject) => {
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
}

export async function fetchStudentPerformance(studentId: string): Promise<{
  user: SupabaseUser | null;
  topicPerformance: TopicPerformance[];
} | null> {
  const supabase = createClient();

  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', studentId)
    .single();

  if (!userData) {

    console.warn('User not found in public.users table:', studentId);
  }

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
    return null;
  }

  if (!grades || grades.length === 0) {
    return {
      user: userData,
      topicPerformance: [],
    };
  }

  const topicIds = [...new Set(grades.map((g) => g.topic_id))];
  const { data: topics } = await supabase
    .from('topics')
    .select('id, subject_id, name')
    .in('id', topicIds);

  if (!topics) {
    return {
      user: userData,
      topicPerformance: [],
    };
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

    const gradeHistory: GradeEntry[] = topicGrades.map((g) => ({
      score: g.score || 0,
      type: g.score && g.score >= 4 ? 'exam' : 'homework',
      date: g.grade_date.split('T')[0],
      topicId: makeTopicId(topicId),
      label: g.exam_score ? 'Экзамен' : undefined,
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

  return {
    user: userData,
    topicPerformance,
  };
}

export async function fetchTrainingCards(studentId: string): Promise<SupabaseTrainingCard[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('training_cards')
    .select('*')
    .eq('user_id', studentId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching training cards:', error);
    return [];
  }

  return data || [];
}

export async function fetchTopicResources(topicId: number) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .eq('topic_id', topicId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching resources:', error);
    return [];
  }

  return data || [];
}

export async function upsertTrainingCard(card: {
  user_id: string;
  topic_id: number;
  weakness_score: number;
  status?: 'pending' | 'in_progress' | 'completed';
  xp_reward?: number;
  deadline?: string;
  ai_insight?: string;
}) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('training_cards')
    .upsert(card, { onConflict: 'user_id,topic_id' })
    .select()
    .single();

  if (error) {
    console.error('Error upserting training card:', error);
    return null;
  }

  return data;
}

export async function updateTrainingCardProgress(
  cardId: number,
  progress: {
    status?: 'pending' | 'in_progress' | 'completed';
    ai_insight?: string;
  }
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('training_cards')
    .update({
      ...progress,
      updated_at: new Date().toISOString(),
    })
    .eq('id', cardId)
    .select()
    .single();

  if (error) {
    console.error('Error updating training card:', error);
    return null;
  }

  return data;
}
