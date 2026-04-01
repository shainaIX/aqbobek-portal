

import type { TrainingCard } from './types';
import { analyzeStudent, analyzeStudentAsync } from './analyzer';
import { getResources } from './resourceMapper';
import { getStudentRecord, getSubjectById, fetchTrainingCards, fetchSubjects, fetchStudentRecord } from './database';

function estimateMinutes(weaknessScore: number, subtopicCount: number): number {
  const base = weaknessScore >= 70 ? 90 : weaknessScore >= 50 ? 60 : 40;
  return base + subtopicCount * 10;
}

function calcXP(weaknessScore: number): number {
  return Math.round((50 + weaknessScore) / 10) * 10;
}

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

export function generateCards(studentId: string): TrainingCard[] {
  const weakTopics = analyzeStudent(studentId, true);
  const record = getStudentRecord(studentId);

  return weakTopics.map((wt) => {
    const subject = getSubjectById(wt.subjectId);
    const resources = getResources(wt.topicId, wt.topicName);

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

export async function generateCardsAsync(studentId: string): Promise<TrainingCard[]> {

  await Promise.all([
    fetchSubjects(),
    fetchStudentRecord(studentId),
  ]);

  const trainingProgress = await fetchTrainingCards(studentId);

  const weakTopics = await analyzeStudentAsync(studentId);
  const record = getStudentRecord(studentId);

  return weakTopics.map((wt) => {
    const subject = getSubjectById(wt.subjectId);
    const resources = getResources(wt.topicId, wt.topicName);

    const progress = trainingProgress[wt.topicId] ?? record?.trainingProgress[wt.topicId] ?? 0;

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

export function updateTopicProgress(
  studentId: string,
  topicId: string,
  progress: number,
) {
  const { getStudentRecord } = require('./database') as typeof import('./database');
  const record = getStudentRecord(studentId);
  if (record) {
    record.trainingProgress[topicId] = Math.min(100, Math.max(0, progress));
  }
}
