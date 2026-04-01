/**
 * Response Parser – Validates and parses Groq AI responses.
 *
 * Handles:
 * - JSON extraction from markdown/plain text
 * - Schema validation with fallbacks
 * - Graceful degradation on missing fields
 */

import { z } from 'zod';
import type { AIAnalysisResult } from './types';

// Zod schemas for strict validation
const ResourceSchema = z.object({
  type: z.enum(['video', 'theory', 'practice']),
  title: z.string(),
  searchQuery: z.string(),
  platform: z.enum(['youtube', 'khan-academy', 'wikipedia']).optional(),
});

const TrainingCardSchema = z.object({
  id: z.string(),
  subjectId: z.string(),
  subject: z.string(),
  subjectColor: z.string(),
  gradientFrom: z.string(),
  gradientTo: z.string(),
  topicId: z.string(),
  topic: z.string(),
  subtopics: z.array(z.string()),
  priority: z.enum(['critical', 'high', 'medium', 'low']),
  weaknessScore: z.number().min(0).max(100),
  signals: z.array(z.string()),
  resources: z.array(ResourceSchema),
  estimatedMinutes: z.number().min(15).max(180),
  xp: z.number().min(25).max(250),
  deadline: z.string(),
  avgGrade: z.number().min(0).max(5),
  gradeTrend: z.enum(['improving', 'stable', 'declining']),
  aiInsight: z.string(),
  suggestedApproach: z.string(),
});

const AnalysisResultSchema = z.object({
  studentId: z.string(),
  studentName: z.string(),
  trainingCards: z.array(TrainingCardSchema),
  overallInsight: z.string(),
  analysisTimestamp: z.string(),
});

/** Extract JSON object from text (handles markdown code blocks) */
function extractJSON(text: string): unknown {
  // Try to find JSON in markdown code block
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[1]);
    } catch {
      // Fall through to full text parsing
    }
  }

  // Try parsing full text as JSON
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

/** Parse and validate AI response */
export async function parseAnalysisResponse(
  responseText: string,
): Promise<AIAnalysisResult | null> {
  try {
    const extracted = extractJSON(responseText);

    if (!extracted) {
      console.error('Failed to extract JSON from response');
      return null;
    }

    // Validate against schema
    const validated = AnalysisResultSchema.parse(extracted);
    return validated as AIAnalysisResult;
  } catch (error) {
    console.error('Response validation failed:', error);
    return null;
  }
}

/** Ensure all training cards have required fields, with sensible defaults */
export function sanitizeAnalysisResult(
  result: AIAnalysisResult,
): AIAnalysisResult {
  return {
    ...result,
    trainingCards: result.trainingCards
      .map((card) => ({
        ...card,
        priority: (
          ['critical', 'high', 'medium', 'low'] as const
        ).includes(card.priority)
          ? card.priority
          : 'medium',
        gradeTrend: (['improving', 'stable', 'declining'] as const).includes(
          card.gradeTrend,
        )
          ? card.gradeTrend
          : 'stable',
        resources: card.resources.filter((r) => r.searchQuery && r.title),
        signals: card.signals.slice(0, 3), // Limit to 3 signals
      }))
      .sort((a, b) => {
        // Sort by priority
        const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }),
  };
}
