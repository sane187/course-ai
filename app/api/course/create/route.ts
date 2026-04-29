import { groq } from "@/lib/openai";
import { NextResponse } from "next/server";

interface CreateCourseRequest {
  topic: string;
  audience: string;
  chapters: number;
  includeQuiz: boolean;
}

interface OutlineResponse {
  title: string;
  description: string;
  chapters: {
    title: string;
    content: string;
  }[];
}

function extractJSON(text: string): string {
  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No JSON found");

  return match[0];
}

export async function POST(req: Request) {
  try {
    const body: CreateCourseRequest = await req.json();
    const { topic, audience, chapters, includeQuiz } = body;

    const prompt = `
Create a school-level course.

Topic: ${topic}
Audience: ${audience}
Number of chapters: ${chapters}
include quiz: ${includeQuiz}

STRICT REQUIREMENTS:
- Each chapter MUST have an array of "topics".
- Each topic MUST have "title", "content" (at least 150 words), and an array of "subTopics".
- Each subTopic MUST have a "title" and "content".
- Each chapter MUST also include an "imagePrompt" field containing exactly 2 to 3 visual keywords describing the chapter (e.g., "quantum computer glowing", "ancient rome colosseum").
- Use simple, engaging, school-appropriate language.
- Chapter descriptions should be short (30-40 words).

QUIZ RULES (ONLY if Include quiz is true):
- Create exactly 5 quiz questions.
- Each question must have exactly 4 options.
- One correct answer only, matching the exact option string.
- If include quiz is false, DO NOT include the "quiz" field.

Respond ONLY with valid JSON.
No markdown. No explanation. No extra text.

{
  "title": "",
  "description": "",
  "chapters": [
    {
      "title": "",
      "description": "",
      "imagePrompt": "",
      "topics": [
        {
          "title": "",
          "content": "",
          "subTopics": [
            {
              "title": "",
              "content": ""
            }
          ]
        }
      ]
    }
  ],
  "quiz": [
    {
      "question": "",
      "options": ["", "", "", ""],
      "correctAnswer": ""
    }
  ]
}
`;


    const res = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 2500
    });
    const raw = res.choices[0].message.content ?? "{}";
    const outline: OutlineResponse = JSON.parse(extractJSON(raw));

    return NextResponse.json({ outline });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Course generation failed" },
      { status: 500 }
    );
  }
}
