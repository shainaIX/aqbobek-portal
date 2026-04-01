import { NextResponse } from "next/server";
import { analyzeWithAI, AIApiError } from "@/lib/ai-learning/groq";
import type { AIAnalysisRequest } from "@/lib/ai-learning/types";

function isAnalysisRequest(value: unknown): value is AIAnalysisRequest {
  if (!value || typeof value !== "object") {
    return false;
  }

  const payload = value as Partial<AIAnalysisRequest>;

  return (
    typeof payload.studentName === "string" &&
    Array.isArray(payload.weakTopics) &&
    Array.isArray(payload.subjectSummaries)
  );
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as unknown;

    if (!isAnalysisRequest(body)) {
      return NextResponse.json(
        { error: "Некорректный запрос для AI-анализа" },
        { status: 400 },
      );
    }

    const response = await analyzeWithAI(body);
    return NextResponse.json(response);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Не удалось выполнить AI-анализ";
    const status = error instanceof AIApiError ? error.status : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
