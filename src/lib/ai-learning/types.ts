

export interface Topic {
  id: string;
  name: string;
  subtopics: string[];
}

export interface Subject {
  id: string;
  name: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  topics: Topic[];
}

export type GradeType = 'exam' | 'test' | 'homework' | 'classwork';

export interface GradeEntry {
  score: number;
  type: GradeType;
  date: string;
  topicId: string;
  label?: string;
}

export interface TopicPerformance {
  topicId: string;
  subjectId: string;
  gradeHistory: GradeEntry[];
  attendanceRate: number;
  lastExamScore: number | null;
}

export interface StudentRecord {
  studentId: string;
  name: string;
  classId: string;
  className: string;
  topicPerformance: TopicPerformance[];
  trainingProgress: Record<string, number>;
}

export interface RecentGradeRow {
  subject: string;
  topic: string;
  date: string;
  grade: number;
  type: GradeType;
}

export interface SubjectSummary {
  id: string;
  name: string;
  grade: number;
  progress: number;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

export interface AIInputData {
  studentName: string;
  subjects: Subject[];
  topicPerformances: TopicPerformance[];
  recentGrades: RecentGradeRow[];
}

export type ResourceType = 'video' | 'theory' | 'practice';

export interface AIResource {
  type: ResourceType;
  title: string;
  searchQuery: string;
  platform?: 'youtube' | 'khan-academy' | 'wikipedia';
}

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
  weaknessScore: number;
  signals: string[];
  resources: AIResource[];
  estimatedMinutes: number;
  xp: number;
  deadline: string;
  avgGrade: number;
  gradeTrend: 'improving' | 'stable' | 'declining';
  aiInsight: string;
  suggestedApproach: string;
}

export interface AIAnalysisResult {
  studentId: string;
  studentName: string;
  trainingCards: AITrainingCard[];
  overallInsight: string;
  analysisTimestamp: string;
}

export interface CachedAnalysis {
  id: string;
  studentId: string;
  analysis: AIAnalysisResult;
  gradesHash: string;
  createdAt: string;
  expiresAt: string;
}
