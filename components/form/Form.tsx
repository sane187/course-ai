"use client";
import React, { useState } from 'react'
import { submitCourseForm, CourseFormData } from '../../app/actions/courseAction';
import CourseDetail from '../courseDetail/CourseDetail';




type FormCardProps = {
  setResultData: React.Dispatch<React.SetStateAction<any>>
}

const FormCard: React.FC<FormCardProps> = ({ setResultData }) => {
 


     const emptyData:CourseFormData = { 
        course:"",
        targetAudience:"",
          chapters:0,
          quiz:false
      }

     const [formData, setFormData] = React.useState<CourseFormData>(emptyData);
     const [loading, setLoading] = React.useState<boolean>(false);


     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {  
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: name === "quiz" ? (e.target as HTMLInputElement).checked : value,
        }));


      }

       const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
     console.log(formData,"form data")
    try {

      const result = await submitCourseForm(formData);
       setResultData(result.outline)
      console.log(result,'result from server action')
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }
   

  return (
    <div>
     
    <form
  onSubmit={handleSubmit}
  className="max-w-xl mx-auto space-y-6 rounded-2xl border border-gray-200 dark:bg-gray-900 dark:border-gray-800 bg-[rgb(var(--background))] p-6 shadow-lg"
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
    className=" w-max cursor-pointer w-full rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-50"
  >
    {loading ? 'Generating...' : 'Generate Course'}
  </button>
</form>

    


    </div>
  )
}

export default FormCard