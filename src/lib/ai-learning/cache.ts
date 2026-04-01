

import { createClient } from '@/lib/supabase/client';
import { createHash } from 'crypto';
import type { AIAnalysisResult, CachedAnalysis } from './types';
import type { GradeEntry } from './types';

export function generateGradesHash(grades: GradeEntry[]): string {
  const gradeData = grades
    .map((g) => `${g.topicId}:${g.score}:${g.date}:${g.type}`)
    .join('|');
  return createHash('sha256').update(gradeData).digest('hex');
}

export async function getCachedAnalysis(
  studentId: string,
  gradesHash: string,
): Promise<AIAnalysisResult | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('ai_analysis_cache')
    .select('analysis, gradesHash, expiresAt')
    .eq('student_id', studentId)
    .single();

  if (error || !data) {
    return null;
  }

  if (data.gradesHash !== gradesHash) {
    return null;
  }

  if (new Date(data.expiresAt) < new Date()) {
    return null;
  }

  return data.analysis as AIAnalysisResult;
}

export async function setCachedAnalysis(
  studentId: string,
  analysis: AIAnalysisResult,
  gradesHash: string,
): Promise<void> {
  const supabase = createClient();

  const now = new Date();
  const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  await supabase
    .from('ai_analysis_cache')
    .upsert({
      student_id: studentId,
      analysis,
      grades_hash: gradesHash,
      created_at: now.toISOString(),
      expires_at: expiresAt.toISOString(),
    });
}

export async function invalidateCache(studentId: string): Promise<void> {
  const supabase = createClient();

  await supabase
    .from('ai_analysis_cache')
    .delete()
    .eq('student_id', studentId);
}
