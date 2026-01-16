'use server'

export interface CourseFormData {
  course: string
  targetAudience: string
  chapters: number
  quiz: boolean
}

export async function submitCourseForm(data: CourseFormData) {
  if (!data.course) {
    throw new Error("Course is required");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/course/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      topic: data.course,
      audience: data.targetAudience,
      chapters: data.chapters,
      includeQuiz: data.quiz,
    }),
  });

  if (!res.ok) {
    console.log(res,'status not ok')
    throw new Error("Failed to generate course");
  }

  const result = await res.json();
  return { success: true, outline: result.outline };
}
