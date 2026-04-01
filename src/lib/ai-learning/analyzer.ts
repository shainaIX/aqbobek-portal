/**
 * Weakness detection engine.
 * Reads student performance data from Supabase and produces a sorted list of WeakTopic objects.
 */

import type { WeakTopic } from './types';
import { getStudentRecord, getSubjectById, fetchStudentRecord, fetchSubjects } from './database';

// ─── Scoring weights (must sum to 1.0) ────────────────────────────────────────
const W = {
  gradeAverage: 0.40,
  gradeTrend: 0.30,
  attendance: 0.20,
  examScore: 0.10,
};

/** Map a raw average grade (1–5 or 0–100 percentage) to a risk score (0–100). */
function gradeToRisk(avg: number): number {
  // Convert percentage (0-100) to 5-point scale (1-5)
  // Assuming 100% = 5, 80% = 4, 60% = 3, 40% = 2, 20% = 1
  const gradeOnFiveScale = avg > 5 ? (avg / 100) * 5 : avg;

  if (gradeOnFiveScale >= 4.5) return 0;
  if (gradeOnFiveScale >= 4.0) return 15;
  if (gradeOnFiveScale >= 3.5) return 35;
  if (gradeOnFiveScale >= 3.0) return 60;
  if (gradeOnFiveScale >= 2.0) return 80;
  return 100;
}

/** Map an attendance percentage (0–100) to a risk score (0–100). */
function attendanceToRisk(rate: number): number {
  if (rate >= 95) return 0;
  if (rate >= 85) return 20;
  if (rate >= 75) return 50;
  if (rate >= 60) return 75;
  return 100;
}

/** Map a last-exam score percentage (0–100) to a risk score (0–100). */
function examToRisk(score: number | null): number {
  if (score === null) return 0; // no data — don't penalise
  if (score >= 85) return 0;
  if (score >= 70) return 20;
  if (score >= 55) return 50;
  if (score >= 40) return 75;
  return 100;
}

/**
 * Compute grade trend risk.
 * Compares last-2 grades vs previous-2 grades of the topic.
 * Returns both a risk score and a human-readable trend label.
 */
function gradeTrendRisk(sortedScores: number[]): {
  score: number;
  trend: 'improving' | 'stable' | 'declining';
} {
  if (sortedScores.length < 2) return { score: 20, trend: 'stable' };

  const recent = sortedScores.slice(-2);
  const prev = sortedScores.slice(-4, -2);

  const recentAvg = recent.reduce((s, v) => s + v, 0) / recent.length;
  const prevAvg =
    prev.length > 0
      ? prev.reduce((s, v) => s + v, 0) / prev.length
      : recentAvg;

  const diff = recentAvg - prevAvg;

  if (diff >= 0.3) return { score: 0, trend: 'improving' };
  if (diff >= -0.2) return { score: 20, trend: 'stable' };
  if (diff >= -0.5) return { score: 60, trend: 'declining' };
  return { score: 90, trend: 'declining' };
}

/** Derive human-readable signal strings from the performance data. */
function buildSignals(
  avgGrade: number,
  attendanceRate: number,
  lastExamScore: number | null,
  trend: 'improving' | 'stable' | 'declining',
): string[] {
  const signals: string[] = [];

  // Convert percentage to 5-point scale for display
  const gradeOnFiveScale = avgGrade > 5 ? (avgGrade / 100) * 5 : avgGrade;

  if (gradeOnFiveScale < 3.0) signals.push(`Средняя оценка: ${gradeOnFiveScale.toFixed(1)} — критично`);
  else if (gradeOnFiveScale < 3.5) signals.push(`Средняя оценка: ${gradeOnFiveScale.toFixed(1)} — ниже нормы`);
  else if (gradeOnFiveScale < 4.0) signals.push(`Средняя оценка: ${gradeOnFiveScale.toFixed(1)}`);

  if (trend === 'declining') signals.push('Оценки снижаются в последнее время');
  if (trend === 'improving') signals.push('Прогресс: оценки растут');

  if (attendanceRate < 70) signals.push(`Посещаемость ${attendanceRate}% — очень низкая`);
  else if (attendanceRate < 80) signals.push(`Посещаемость ${attendanceRate}% — пропуски фиксируются`);
  else if (attendanceRate < 90) signals.push(`Посещаемость ${attendanceRate}%`);

  if (lastExamScore !== null) {
    if (lastExamScore < 50) signals.push(`Последний экзамен: ${lastExamScore}% — провал`);
    else if (lastExamScore < 65) signals.push(`Последний экзамен: ${lastExamScore}% — слабый результат`);
    else if (lastExamScore < 75) signals.push(`Последний экзамен: ${lastExamScore}%`);
  }

  return signals;
}

/** Classify weakness score → priority label. */
function scoreToPriority(
  score: number,
): 'critical' | 'high' | 'medium' | 'low' {
  if (score >= 70) return 'critical';
  if (score >= 50) return 'high';
  if (score >= 30) return 'medium';
  return 'low';
}

/**
 * Analyse a student and return their weak topics sorted by weakness score.
 * Only topics with weaknessScore > 15 are included (everything else is fine).
 *
 * @param studentId - The student ID to analyze
 * @param useCached - If true, uses cached data only (faster but may be stale)
 */
export function analyzeStudent(studentId: string, useCached = false): WeakTopic[] {
  if (useCached) {
    return analyzeStudentSync(studentId);
  }

  // For async analysis, we need to ensure data is loaded first
  // This is handled by the caller via fetchStudentRecord
  return analyzeStudentSync(studentId);
}

/**
 * Synchronous analysis using cached data.
 * Call fetchStudentRecord first to ensure data is loaded.
 */
function analyzeStudentSync(studentId: string): WeakTopic[] {
  const record = getStudentRecord(studentId);
  if (!record) return [];

  const weakTopics: WeakTopic[] = [];

  for (const tp of record.topicPerformance) {
    const subject = getSubjectById(tp.subjectId);
    const topic = subject?.topics.find((t) => t.id === tp.topicId);
    if (!subject || !topic || tp.gradeHistory.length === 0) continue;

    const sorted = [...tp.gradeHistory].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    const scores = sorted.map((g) => g.score);
    const avgGrade = scores.reduce((s, v) => s + v, 0) / scores.length;

    const { score: trendScore, trend } = gradeTrendRisk(scores);

    const weaknessScore = Math.round(
      gradeToRisk(avgGrade) * W.gradeAverage +
        trendScore * W.gradeTrend +
        attendanceToRisk(tp.attendanceRate) * W.attendance +
        examToRisk(tp.lastExamScore) * W.examScore,
    );

    // Skip topics that are performing well
    if (weaknessScore <= 15) continue;

    // Convert percentage to 5-point scale for avgGrade
    const avgGradeOnFiveScale = avgGrade > 5 ? (avgGrade / 100) * 5 : avgGrade;

    weakTopics.push({
      subjectId: subject.id,
      subjectName: subject.name,
      subjectColor: subject.color,
      topicId: topic.id,
      topicName: topic.name,
      subtopics: topic.subtopics,
      weaknessScore,
      signals: buildSignals(avgGradeOnFiveScale, tp.attendanceRate, tp.lastExamScore, trend),
      priority: scoreToPriority(weaknessScore),
      avgGrade: avgGradeOnFiveScale,
      attendanceRate: tp.attendanceRate,
      lastExamScore: tp.lastExamScore,
      gradeTrend: trend,
    });
  }

  // Sort: highest weakness first
  return weakTopics.sort((a, b) => b.weaknessScore - a.weaknessScore);
}

/**
 * Async version that ensures data is loaded before analysis.
 */
export async function analyzeStudentAsync(studentId: string): Promise<WeakTopic[]> {
  await fetchStudentRecord(studentId);
  await fetchSubjects();
  return analyzeStudent(studentId, true);
}
