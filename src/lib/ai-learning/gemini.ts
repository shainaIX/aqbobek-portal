import type {
  GeminiAnalysisRequest,
  GeminiAnalysisResponse,
  SubjectSummary,
  WeakTopic,
} from "@/lib/ai-learning/types";

const GEMINI_BASE_URL =
  "https://generativelanguage.googleapis.com/v1beta/models";

const DEFAULT_MODEL = "gemini-2.0-flash";

export class GeminiApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "GeminiApiError";
    this.status = status;
  }
}

export function isGeminiConfigured(): boolean {
  if (typeof window !== "undefined") {
    return true;
  }

  return !!getServerGeminiApiKey();
}

function getServerGeminiApiKey(): string | null {
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  if (!apiKey || apiKey.includes("...")) {
    return null;
  }

  return apiKey;
}

function normalizeJsonResponse(text: string) {
  const trimmed = text.trim();

  if (trimmed.startsWith("```")) {
    return trimmed
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/, "");
  }

  return trimmed;
}

function extractRetryDelay(raw: string) {
  const secondsMatch = raw.match(/retry in\s+([\d.]+)s/i);

  if (secondsMatch) {
    const seconds = Math.max(1, Math.ceil(Number(secondsMatch[1])));
    return `${seconds} сек.`;
  }

  const delayMatch = raw.match(/"retryDelay"\s*:\s*"(\d+)s"/i);
  if (delayMatch) {
    return `${delayMatch[1]} сек.`;
  }

  return null;
}

function extractGeminiErrorMessage(raw: string) {
  try {
    const parsed = JSON.parse(raw) as {
      error?: { message?: string };
    };

    return parsed.error?.message?.trim() || null;
  } catch {
    return raw.trim() || null;
  }
}

function formatGeminiError(status: number, raw: string) {
  const detailedMessage = extractGeminiErrorMessage(raw);

  if (status === 429) {
    const retryDelay = extractRetryDelay(raw);
    return retryDelay
      ? `Лимит Gemini API исчерпан. Повторите через ${retryDelay} или увеличьте квоту в Google AI Studio.`
      : "Лимит Gemini API исчерпан. Подождите немного или увеличьте квоту в Google AI Studio.";
  }

  if (status === 401 || status === 403) {
    return "Gemini API отклонил ключ. Проверьте GEMINI_API_KEY и доступ к модели.";
  }

  if (status === 400 && detailedMessage) {
    return `Gemini отклонил запрос: ${detailedMessage}`;
  }

  if (detailedMessage) {
    return detailedMessage;
  }

  return `Gemini API error ${status}`;
}

async function analyzeWithGeminiServer(
  request: GeminiAnalysisRequest,
  model = DEFAULT_MODEL,
): Promise<GeminiAnalysisResponse> {
  const apiKey = getServerGeminiApiKey();

  if (!apiKey) {
    throw new GeminiApiError("GEMINI_API_KEY не настроен на сервере", 500);
  }

  const prompt = buildPrompt(request);

  const res = await fetch(
    `${GEMINI_BASE_URL}/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 2048,
          responseMimeType: "application/json",
        },
      }),
    },
  );

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new GeminiApiError(formatGeminiError(res.status, errText), res.status);
  }

  const data = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new GeminiApiError("Gemini вернул пустой ответ", 502);
  }

  return JSON.parse(normalizeJsonResponse(text)) as GeminiAnalysisResponse;
}

export async function analyzeWithGemini(
  request: GeminiAnalysisRequest,
  _apiKey?: string,
  model = DEFAULT_MODEL,
): Promise<GeminiAnalysisResponse> {
  if (typeof window !== "undefined") {
    const res = await fetch("/api/ai/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    if (!res.ok) {
      let message = "Ошибка Gemini API";

      try {
        const data = (await res.json()) as { error?: string };
        if (data.error) {
          message = data.error;
        }
      } catch {
        // Ignore JSON parse failures and use the default message.
      }

      throw new Error(message);
    }

    return (await res.json()) as GeminiAnalysisResponse;
  }

  return analyzeWithGeminiServer(request, model);
}

export function buildGeminiRequest(
  studentName: string,
  weakTopics: WeakTopic[],
  subjectSummaries: SubjectSummary[],
): GeminiAnalysisRequest {
  return { studentName, weakTopics, subjectSummaries };
}

function buildPrompt(request: GeminiAnalysisRequest): string {
  const subjectBlock = request.subjectSummaries
    .map(
      (s: SubjectSummary) =>
        `  • ${s.name}: средняя оценка ${s.grade}/5, прогресс ${s.progress}%, тренд ${
          s.trend === "up" ? "растет" : s.trend === "down" ? "падает" : "стабильно"
        }`,
    )
    .join("\n");

  const topicsBlock = request.weakTopics
    .map(
      (t: WeakTopic) =>
        `  • [${t.priority.toUpperCase()}] ${t.subjectName} / ${t.topicName}
      - Оценка риска: ${t.weaknessScore}/100
      - Средняя оценка: ${t.avgGrade.toFixed(1)}/5
      - Посещаемость: ${t.attendanceRate}%
      - Последний экзамен: ${t.lastExamScore !== null ? `${t.lastExamScore}%` : "нет данных"}
      - Сигналы: ${t.signals.join("; ")}
      - Подтемы: ${t.subtopics.join(", ")}`,
    )
    .join("\n\n");

  return `Ты образовательный AI-ассистент школьного портала Aqbobek Lyceum.
Проанализируй данные успеваемости ученика и верни персональные рекомендации.

Ученик: ${request.studentName}

Успеваемость по предметам:
${subjectBlock}

Слабые темы (отсортированы по приоритету):
${topicsBlock}

Верни ТОЛЬКО валидный JSON в точно таком формате, без markdown и пояснений вне JSON:
{
  "enhancedCards": [
    {
      "topicId": "<точный topicId из данных выше>",
      "aiInsight": "<2-3 предложения: почему эта тема сложна и на что обратить внимание>",
      "suggestedApproach": "<конкретная стратегия изучения>",
      "estimatedDays": <целое число дней для освоения темы>
    }
  ],
  "overallInsight": "<2-3 предложения с общей оценкой успеваемости и главным приоритетом>"
}

Сгенерируй enhancedCards для КАЖДОЙ слабой темы. Язык ответа: русский.`;
}
