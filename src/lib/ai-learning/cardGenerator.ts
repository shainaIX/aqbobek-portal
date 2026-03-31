/**
 * Assembles TrainingCard objects from analyzed weak topics.
 * This is the final step before rendering — combines analysis + resources.
 */

import type { TrainingCard } from './types';
import { analyzeStudent } from './analyzer';
import { getResources } from './resourceMapper';
import { getStudentRecord, getSubjectById } from './database';

/** Returns estimated study minutes based on weakness score and subtopic count. */
function estimateMinutes(weaknessScore: number, subtopicCount: number): number {
  const base = weaknessScore >= 70 ? 90 : weaknessScore >= 50 ? 60 : 40;
  return base + subtopicCount * 10;
}

/** Returns XP reward: harder topics give more XP. */
function calcXP(weaknessScore: number): number {
  return Math.round((50 + weaknessScore) / 10) * 10;
}

/** Returns a deadline string (e.g. "3 февраля") based on priority. */
function calcDeadline(priority: 'critical' | 'high' | 'medium' | 'low'): string {
  const days =
    priority === 'critical' ? 3
    : priority === 'high' ? 7
    : priority === 'medium' ? 14
    : 21;

  const date = new Date();
  date.setDate(date.getDate() + days);

  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
}

/**
 * Generate training cards for a student.
 * Returns cards sorted by weakness score (highest first).
 */
export function generateCards(studentId: string): TrainingCard[] {
  const weakTopics = analyzeStudent(studentId);
  const record = getStudentRecord(studentId);

  return weakTopics.map((wt) => {
    const subject = getSubjectById(wt.subjectId);
    const resources = getResources(wt.topicId, wt.topicName);

    // Pull training progress from the student record
    const progress = record?.trainingProgress[wt.topicId] ?? 0;

    return {
      id: `${wt.subjectId}_${wt.topicId}`,
      subjectId: wt.subjectId,
      subject: wt.subjectName,
      subjectColor: wt.subjectColor,
      gradientFrom: subject?.gradientFrom ?? 'from-neutral-400',
      gradientTo: subject?.gradientTo ?? 'to-neutral-600',
      topicId: wt.topicId,
      topic: wt.topicName,
      subtopics: wt.subtopics,
      priority: wt.priority,
      weaknessScore: wt.weaknessScore,
      signals: wt.signals,
      resources,
      estimatedMinutes: estimateMinutes(wt.weaknessScore, wt.subtopics.length),
      xp: calcXP(wt.weaknessScore),
      progress,
      deadline: calcDeadline(wt.priority),
      avgGrade: wt.avgGrade,
      gradeTrend: wt.gradeTrend,
    };
  });
}

/** Update in-memory training progress for a topic (call on card interactions). */
export function updateTopicProgress(
  studentId: string,
  topicId: string,
  progress: number,
) {
  const { studentRecords } = require('./database') as typeof import('./database');
  const record = studentRecords.find((r) => r.studentId === studentId);
  if (record) {
    record.trainingProgress[topicId] = Math.min(100, Math.max(0, progress));
  }
}
