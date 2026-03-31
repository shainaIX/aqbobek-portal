import { NextResponse } from "next/server";
import { analyzeWithGemini, GeminiApiError } from "@/lib/ai-learning/gemini";
import type { GeminiAnalysisRequest } from "@/lib/ai-learning/types";

function isGeminiRequest(value: unknown): value is GeminiAnalysisRequest {
  if (!value || typeof value !== "object") {
    return false;
  }

  const payload = value as Partial<GeminiAnalysisRequest>;

  return (
    typeof payload.studentName === "string" &&
    Array.isArray(payload.weakTopics) &&
    Array.isArray(payload.subjectSummaries)
  );
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as unknown;

    if (!isGeminiRequest(body)) {
      return NextResponse.json(
        { error: "Некорректный запрос для Gemini" },
        { status: 400 },
      );
    }

    const response = await analyzeWithGemini(body);
    return NextResponse.json(response);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Не удалось выполнить Gemini-анализ";
    const status = error instanceof GeminiApiError ? error.status : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
