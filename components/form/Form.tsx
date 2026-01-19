"use client";
import React, { useState } from 'react'
import { submitCourseForm, CourseFormData } from '../../app/actions/courseAction';
import CourseDetail from '../courseDetail/CourseDetail';
import QuizModal from '../ui/QuizModal';




type FormCardProps = {
  setResultData: React.Dispatch<React.SetStateAction<any>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const FormCard: React.FC<FormCardProps> = ({ setResultData, setLoading }) => {
 


     const emptyData:CourseFormData = { 
        course:"",
        targetAudience:"",
          chapters:0,
          quiz:false
      }

     const [formData, setFormData] = React.useState<CourseFormData>(emptyData);
     const [loading, setLoadingState] = React.useState<boolean>(false);



     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {  
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: name === "quiz" ? (e.target as HTMLInputElement).checked : value,
        }));


      }

       const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoadingState(true)
    setLoading(true)
     console.log(formData,"form data")
    try {

      const result = await submitCourseForm(formData);
       setResultData(result.outline)
      console.log(result,'result from server action')
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoadingState(false)
      setLoading(false)
    }
  }
   

  return (
    <div>
     
    <form
  onSubmit={handleSubmit}
  className="max-w-xl space-y-4 rounded-2xl border border-gray-200  dark:border-gray-800 pt-3"
>
  {/* Course */}
  <div className="space-y-2">
    <label
      htmlFor="course"
      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      Course Topic
    </label>

    <input
      id="course"
      name="course"
      type="text"
      required
      value={formData.course}
      onChange={handleChange}
      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
      placeholder="e.g. Introduction to AI"
    />
  </div>

  {/* Target Audience */}
  <div className="space-y-2">
    <label
      htmlFor="targetAudience"
      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      Target Audience
    </label>

    <input
      id="targetAudience"
      name="targetAudience"
      type="text"
      required
      value={formData.targetAudience}
      onChange={handleChange}
      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
      placeholder="Beginners, Developers, Students"
    />
  </div>

  {/* Chapters */}
  <div className="space-y-2">
    <label
      htmlFor="chapters"
      className="block text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      Number of Chapters
    </label>

    <input
      id="chapters"
      name="chapters"
      type="number"
      min={1}
      value={formData.chapters}
      onChange={handleChange}
      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none"
    />
  </div>

  {/* Quiz */}
  <div className="flex items-center gap-3">
    <input
      type="checkbox"
      name="quiz"
      checked={formData.quiz}
      onChange={handleChange}
      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/40"
    />
    <span className="text-sm text-gray-700 dark:text-gray-300">
      Include Quiz
    </span>
  </div>

  {/* Submit */}
  <button
  type="submit"
  disabled={loading}
  className=" 
    relative w-full overflow-hidden rounded-xl mt-2
    bg-[#0f172a] text-white
    px-4 py-2.5 text-sm font-semibold
    transition-all duration-300 ease-out
    cursor-pointer
    /* motion */
    hover:scale-[1.03]
    active:scale-[0.96]

    /* glow */
    shadow-[0_0_0_0_rgba(15,23,42,0.6)]
    hover:shadow-[0_0_6px_2px_rgba(15,23,42,0.75)]

    /* focus */
    focus:outline-none focus:ring-2 focus:ring-[#0f172a]/50

    /* disabled */
    disabled:cursor-not-allowed
    disabled:opacity-50
    disabled:hover:scale-100
    disabled:hover:shadow-none
  "
>
  {/* animated sheen */}
  <span
    className="
      pointer-events-none absolute inset-0
      before:absolute before:inset-y-0 before:-left-1/2
      before:w-1/2 before:skew-x-[-20deg]
      before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
      before:animate-[sheen_2.5s_linear_infinite]
    "
  />

  {/* pulse ring */}
  <span
    className="
      pointer-events-none absolute inset-0 rounded-xl
      animate-pulse
      ring-1 ring-[#0f172a]/30
    "
  />

  <span className="relative z-10">
    {loading ? 'Generating...' : 'Generate Course'}
  </span>
</button>


</form>
 

 


    </div>
  )
}

export default FormCard