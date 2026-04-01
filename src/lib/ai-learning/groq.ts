import type {
  AIAnalysisRequest,
  AIAnalysisResponse,
  SubjectSummary,
  WeakTopic,
} from "@/lib/ai-learning/types";

const GROQ_BASE_URL = "https://api.groq.com/openai/v1/chat/completions";

const DEFAULT_MODEL = "llama-3.3-70b-versatile";

export class AIApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AIApiError";
    this.status = status;
  }
}

export function isAIConfigured(): boolean {
  if (typeof window !== "undefined") {
    return true;
  }

  return !!getGroqApiKey();
}

function getGroqApiKey(): string | null {
  const apiKey = process.env.GROQ_API_KEY?.trim();

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

function extractErrorMessage(raw: string) {
  try {
    const parsed = JSON.parse(raw) as {
      error?: { message?: string };
    };

    return parsed.error?.message?.trim() || null;
  } catch {
    return raw.trim() || null;
  }
}

function formatApiError(status: number, raw: string) {
  const detailedMessage = extractErrorMessage(raw);

  if (status === 429) {
    const retryDelay = extractRetryDelay(raw);
    return retryDelay
      ? `Лимит AI API исчерпан. Повторите через ${retryDelay} или проверьте квоту Groq.`
      : "Лимит AI API исчерпан. Подождите немного или проверьте квоту Groq.";
  }

  if (status === 401 || status === 403) {
    return "AI API отклонил ключ. Проверьте GROQ_API_KEY и доступ к модели.";
  }

  if (status === 400 && detailedMessage) {
    return `AI отклонил запрос: ${detailedMessage}`;
  }

  if (detailedMessage) {
    return detailedMessage;
  }

  return `AI API error ${status}`;
}

async function analyzeOnServer(
  request: AIAnalysisRequest,
  model = DEFAULT_MODEL,
): Promise<AIAnalysisResponse> {
  const apiKey = getGroqApiKey();

  if (!apiKey) {
    throw new AIApiError("GROQ_API_KEY не настроен на сервере", 500);
  }

  const prompt = buildPrompt(request);

  const res = await fetch(GROQ_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 2048,
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new AIApiError(formatApiError(res.status, errText), res.status);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };

  const text = data.choices?.[0]?.message?.content;
  if (!text) {
    throw new AIApiError("AI вернул пустой ответ", 502);
  }

  return JSON.parse(normalizeJsonResponse(text)) as AIAnalysisResponse;
}

export async function analyzeWithAI(
  request: AIAnalysisRequest,
  model = DEFAULT_MODEL,
): Promise<AIAnalysisResponse> {
  if (typeof window !== "undefined") {
    const res = await fetch("/api/ai/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    if (!res.ok) {
      let message = "Ошибка AI API";

      try {
        const data = (await res.json()) as { error?: string };
        if (data.error) {
          message = data.error;
        }
      } catch {}

      throw new Error(message);
    }

    return (await res.json()) as AIAnalysisResponse;
  }

  return analyzeOnServer(request, model);
}

export function buildAIRequest(
  studentName: string,
  weakTopics: WeakTopic[],
  subjectSummaries: SubjectSummary[],
): AIAnalysisRequest {
  return { studentName, weakTopics, subjectSummaries };
}

function buildPrompt(request: AIAnalysisRequest): string {
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
