/**
 * Gemini API infrastructure.
 *
 * To activate: add  NEXT_PUBLIC_GEMINI_API_KEY=your_key  to .env.local
 * The model used is gemini-2.0-flash (fast & cheap for educational use).
 *
 * The functions here are intentionally kept decoupled from the UI —
 * they receive typed inputs and return typed outputs so you can swap
 * the underlying model later without touching any page code.
 */

import type {
  GeminiAnalysisRequest,
  GeminiAnalysisResponse,
  SubjectSummary,
  WeakTopic,
} from './types';

const GEMINI_BASE_URL =
  'https://generativelanguage.googleapis.com/v1beta/models';

const DEFAULT_MODEL = 'gemini-2.0-flash';

// ─── Public helpers ───────────────────────────────────────────────────────────

export function isGeminiConfigured(): boolean {
  return !!(
    typeof process !== 'undefined' &&
    process.env.NEXT_PUBLIC_GEMINI_API_KEY
  );
}

export function getGeminiApiKey(): string | null {
  return process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? null;
}

// ─── Main analysis call ───────────────────────────────────────────────────────

/**
 * Sends student performance data to Gemini and returns per-topic insights
 * plus an overall learning recommendation.
 *
 * Throws if the API key is missing or the request fails.
 */
export async function analyzeWithGemini(
  request: GeminiAnalysisRequest,
  apiKey: string,
  model = DEFAULT_MODEL,
): Promise<GeminiAnalysisResponse> {
  const prompt = buildPrompt(request);

  const res = await fetch(
    `${GEMINI_BASE_URL}/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 2048,
          responseMimeType: 'application/json',
        },
      }),
    },
  );

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Gemini API error ${res.status}: ${errText}`);
  }

  const data = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Gemini returned an empty response');

  // Gemini with responseMimeType=application/json should return valid JSON
  return JSON.parse(text) as GeminiAnalysisResponse;
}

// ─── Prompt builder ───────────────────────────────────────────────────────────

function buildPrompt(request: GeminiAnalysisRequest): string {
  const subjectBlock = request.subjectSummaries
    .map(
      (s: SubjectSummary) =>
        `  • ${s.name}: средняя оценка ${s.grade}/5, прогресс ${s.progress}%, тренд ${
          s.trend === 'up' ? 'растёт' : s.trend === 'down' ? 'падает' : 'стабильно'
        }`,
    )
    .join('\n');

  const topicsBlock = request.weakTopics
    .map(
      (t: WeakTopic) =>
        `  • [${t.priority.toUpperCase()}] ${t.subjectName} / ${t.topicName}
      - Оценка риска: ${t.weaknessScore}/100
      - Средняя оценка: ${t.avgGrade.toFixed(1)}/5
      - Посещаемость: ${t.attendanceRate}%
      - Последний экзамен: ${t.lastExamScore !== null ? t.lastExamScore + '%' : 'нет данных'}
      - Сигналы: ${t.signals.join('; ')}
      - Подтемы: ${t.subtopics.join(', ')}`,
    )
    .join('\n\n');

  return `Ты — образовательный AI-ассистент школьного портала Aqbobek Lyceum.
Проанализируй данные успеваемости ученика и верни персональные рекомендации.

Ученик: ${request.studentName}

Успеваемость по предметам:
${subjectBlock}

Слабые темы (отсортированы по приоритету):
${topicsBlock}

Верни ТОЛЬКО валидный JSON в точно таком формате (без markdown, без пояснений вне JSON):
{
  "enhancedCards": [
    {
      "topicId": "<точный topicId из данных выше>",
      "aiInsight": "<2–3 предложения: почему эта тема сложна, на что конкретно обратить внимание>",
      "suggestedApproach": "<конкретная стратегия изучения: например, начни с видео про X, затем реши 5 задач на Y>",
      "estimatedDays": <целое число дней для освоения темы>
    }
  ],
  "overallInsight": "<2–3 предложения: общая оценка успеваемости ученика и главный приоритет>"
}

Сгенерируй enhancedCards для КАЖДОЙ слабой темы. Язык ответа — русский.`;
}

// ─── Request builder (convenience) ───────────────────────────────────────────

/**
 * Builds a GeminiAnalysisRequest from pre-computed data.
 * Call this right before invozeAnalyzeWithGemini.
 */
export function buildGeminiRequest(
  studentName: string,
  weakTopics: WeakTopic[],
  subjectSummaries: SubjectSummary[],
): GeminiAnalysisRequest {
  return { studentName, weakTopics, subjectSummaries };
}
