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
    const { topic, audience, chapters } = body;

const prompt = `
Create a school-level course.

Topic: ${topic}
Audience: ${audience}
Number of chapters: ${chapters}

STRICT REQUIREMENTS:
- Each chapter MUST include a detailed explanatory paragraph
- Each chapter content MUST be at least 120–150 words
- Use simple, school-appropriate language
- Include examples where helpful
- chapter description should be small like max 50-60 words

Respond ONLY with valid JSON.
No markdown.
No explanation.
No extra text.

{
  "title": "",
  "description": "",
  "chapters": [
    {
      "title": "",
      "description": "",
      "content": ""
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
