/**
 * Prompt Builder – Constructs structured prompts for Groq AI analysis.
 *
 * Sends raw student performance data to Groq and asks it to:
 * 1. Identify weaknesses and priorities
 * 2. Generate learning strategies
 * 3. Suggest resources and timelines
 * 4. Allocate XP rewards
 */

import type { AIInputData } from './types';

export function buildAnalysisPrompt(input: AIInputData): string {
  const performanceBySubject = input.topicPerformances
    .map((tp) => {
      const subject = input.subjects.find((s) => s.id === tp.subjectId);
      const topic = subject?.topics.find((t) => t.id === tp.topicId);
      const recentGrades = input.recentGrades.filter((g) => g.topic === topic?.name);
      const avgGrade =
        tp.gradeHistory.length > 0
          ? (
              tp.gradeHistory.reduce((sum, g) => sum + g.score, 0) /
              tp.gradeHistory.length
            ).toFixed(2)
          : '0';

      return `
Subject: ${subject?.name || 'Unknown'}
Topic: ${topic?.name || 'Unknown'}
Average Grade: ${avgGrade}/5
Recent Grades: ${recentGrades.map((g) => g.grade).join(', ') || 'None'}
Attendance: ${tp.attendanceRate}%
Last Exam Score: ${tp.lastExamScore}%
Grade Trend: ${tp.gradeHistory.length > 0 ? 'declining' : 'unknown'}
`;
    })
    .join('\n');

  return `You are an expert education analyst. Analyze the following student's performance and generate personalized learning recommendations.

Student Name: ${input.studentName}

PERFORMANCE DATA:
${performanceBySubject}

TASK:
For each weak topic (average grade < 3.5 or declining trend), generate a training card with:

1. **Weakness Score** (0-100): How critical is improvement in this area?
2. **Signals**: 2-3 specific improvement signals (e.g., "Missed 3 tests on quadratic equations")
3. **Priority**: 'critical' (exam-critical, average <2.5), 'high' (average 2.5-3), 'medium' (average 3-3.5), 'low'
4. **Suggested Approach**: A 1-2 sentence learning strategy tailored to this student
5. **Resources**: List 3-5 learning resources as search queries:
   - For YouTube: "search query for khan academy"
   - For Theory: "wikipedia article about [topic]"
   - For Practice: "interactive practice exercises [topic]"
6. **Estimated Minutes**: How long to master this topic (30-180 min)
7. **XP Reward**: Points for completing (50-200, higher for critical)
8. **Deadline**: Days from today to complete (1-14)
9. **AI Insight**: A personalized insight about why this student is struggling (1 sentence)

OUTPUT FORMAT:
Return a valid JSON object with this structure:
{
  "studentId": "student_id",
  "studentName": "${input.studentName}",
  "trainingCards": [
    {
      "id": "unique_id",
      "subjectId": "subject_id",
      "subject": "subject_name",
      "subjectColor": "bg-color-500",
      "gradientFrom": "from-color-400",
      "gradientTo": "to-color-600",
      "topicId": "topic_id",
      "topic": "topic_name",
      "subtopics": ["subtopic1", "subtopic2"],
      "priority": "critical|high|medium|low",
      "weaknessScore": 85,
      "signals": ["signal1", "signal2"],
      "resources": [
        {
          "type": "video|theory|practice",
          "title": "Resource title",
          "searchQuery": "Search query",
          "platform": "youtube|khan-academy|wikipedia"
        }
      ],
      "estimatedMinutes": 90,
      "xp": 150,
      "deadline": "2026-04-15",
      "avgGrade": 2.5,
      "gradeTrend": "declining",
      "aiInsight": "This student struggles with quadratic equations due to weak algebra fundamentals.",
      "suggestedApproach": "Start with algebra review, then progress to quadratic formula applications."
    }
  ],
  "overallInsight": "This student shows strong attendance but struggles with abstract math concepts. Focus on concrete examples and visual representations.",
  "analysisTimestamp": "2026-04-01T12:00:00Z"
}

Ensure JSON is valid and complete. Prioritize weak topics first (critical > high > medium > low).`;
}
