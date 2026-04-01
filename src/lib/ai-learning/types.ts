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

// ─── Recent grade row (for grades table) ─────────────────────────────────────

export interface RecentGradeRow {
  subject: string;
  topic: string;
  date: string; // formatted DD.MM.YYYY
  grade: number;
  type: GradeType;
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

// ─── AI-first architecture: input data ─────────────────────────────────────────

export interface AIInputData {
  studentName: string;
  subjects: Subject[];
  topicPerformances: TopicPerformance[];
  recentGrades: RecentGradeRow[];
}

// ─── AI-generated resources ────────────────────────────────────────────────────

export type ResourceType = 'video' | 'theory' | 'practice';

export interface AIResource {
  type: ResourceType;
  title: string;
  searchQuery: string; // Search query instead of hardcoded URL
  platform?: 'youtube' | 'khan-academy' | 'wikipedia';
}

// ─── AI-generated training card ────────────────────────────────────────────────

export interface AITrainingCard {
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
  weaknessScore: number; // 0–100, AI-determined
  signals: string[]; // AI-generated improvement signals
  resources: AIResource[];
  estimatedMinutes: number; // AI-estimated
  xp: number; // AI-allocated XP
  deadline: string; // ISO date, AI-determined
  avgGrade: number; // From performance data
  gradeTrend: 'improving' | 'stable' | 'declining';
  aiInsight: string; // AI-generated insight
  suggestedApproach: string; // AI-suggested learning approach
}

// ─── AI analysis result (from Groq) ───────────────────────────────────────────

export interface AIAnalysisResult {
  studentId: string;
  studentName: string;
  trainingCards: AITrainingCard[];
  overallInsight: string;
  analysisTimestamp: string; // ISO date
}

// ─── Cached analysis with invalidation ──────────────────────────────────────────

export interface CachedAnalysis {
  id: string; // UUID
  studentId: string;
  analysis: AIAnalysisResult;
  gradesHash: string; // SHA256 of student's grades, for invalidation
  createdAt: string; // ISO date
  expiresAt: string; // ISO date (24h from creation)
}
