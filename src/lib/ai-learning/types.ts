// ─── Core curriculum data ────────────────────────────────────────────────────

export interface Topic {
  id: string;
  name: string;
  subtopics: string[];
}

export interface Subject {
  id: string;
  name: string;
  color: string; // tailwind bg-* class
  gradientFrom: string;
  gradientTo: string;
  topics: Topic[];
}

// ─── Student performance ──────────────────────────────────────────────────────

export type GradeType = 'exam' | 'test' | 'homework' | 'classwork';

export interface GradeEntry {
  score: number; // 1–5 Russian scale
  type: GradeType;
  date: string; // ISO date string
  topicId: string;
  label?: string; // e.g. "Контрольная работа"
}

export interface TopicPerformance {
  topicId: string;
  subjectId: string;
  gradeHistory: GradeEntry[];
  attendanceRate: number; // 0–100 %
  lastExamScore: number | null; // 0–100 % (exam percentage, different from 1-5 scale)
}

export interface StudentRecord {
  studentId: string;
  name: string;
  classId: string;
  className: string;
  topicPerformance: TopicPerformance[];
  trainingProgress: Record<string, number>; // topicId → 0–100
}

// ─── Analysis output ──────────────────────────────────────────────────────────

export interface WeakTopic {
  subjectId: string;
  subjectName: string;
  subjectColor: string;
  topicId: string;
  topicName: string;
  subtopics: string[];
  weaknessScore: number; // 0–100
  signals: string[];
  priority: 'critical' | 'high' | 'medium' | 'low';
  avgGrade: number;
  attendanceRate: number;
  lastExamScore: number | null;
  gradeTrend: 'improving' | 'stable' | 'declining';
}

// ─── Resources ────────────────────────────────────────────────────────────────

export type ResourceType = 'video' | 'theory' | 'practice';

export interface Resource {
  type: ResourceType;
  title: string;
  url: string;
  duration?: string;
}

// ─── Training card ────────────────────────────────────────────────────────────

export interface TrainingCard {
  id: string;
  subjectId: string;
  subject: string;
  subjectColor: string;
  gradientFrom: string;
  gradientTo: string;
  topicId: string;
  topic: string;
  subtopics: string[];
  priority: 'critical' | 'high' | 'medium' | 'low';
  weaknessScore: number;
  signals: string[];
  resources: Resource[];
  estimatedMinutes: number;
  xp: number;
  progress: number;
  deadline: string;
  avgGrade: number;
  gradeTrend: 'improving' | 'stable' | 'declining';
  // Filled in by AI after API call
  aiInsight?: string;
  suggestedApproach?: string;
}

// ─── SubjectProgress-compatible summary ───────────────────────────────────────

export interface SubjectSummary {
  id: string;
  name: string;
  grade: number; // 1–5 rounded
  progress: number; // 0–100
  trend: 'up' | 'down' | 'stable';
  color: string;
}

// ─── Recent grade row (for grades table) ─────────────────────────────────────

export interface RecentGradeRow {
  subject: string;
  topic: string;
  date: string; // formatted DD.MM.YYYY
  grade: number;
  type: GradeType;
}

// ─── AI Analysis API ─────────────────────────────────────────────────────────

export interface AIAnalysisRequest {
  studentName: string;
  weakTopics: WeakTopic[];
  subjectSummaries: SubjectSummary[];
}

export interface AIEnhancedCard {
  topicId: string;
  aiInsight: string;
  suggestedApproach: string;
  estimatedDays: number;
}

export interface AIAnalysisResponse {
  enhancedCards: AIEnhancedCard[];
  overallInsight: string;
}
