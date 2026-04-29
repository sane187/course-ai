"use client";
import React from 'react';
import { submitCourseForm, CourseFormData } from '../../app/actions/courseAction';
import { Target, ListOrdered, GraduationCap, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

type FormCardProps = {
  setResultData: React.Dispatch<React.SetStateAction<any>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const Form: React.FC<FormCardProps> = ({ setResultData, setLoading }) => {
  const emptyData: CourseFormData = { 
    course: "",
    targetAudience: "",
    chapters: 0,
    quiz: false
  }

  const [formData, setFormData] = React.useState<CourseFormData>(emptyData);
  const [loadingState, setLoadingState] = React.useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {  
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "quiz" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingState(true);
    setLoading(true);
    
    try {
      const result = await submitCourseForm(formData);
      setResultData(result.outline);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoadingState(false);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Course Topic */}
        <div className="space-y-3 md:col-span-2">
          <label htmlFor="course" className="flex items-center gap-2 text-sm font-semibold text-slate-300 uppercase tracking-wider">
            <GraduationCap size={16} className="text-emerald-400" /> Course Topic
          </label>
          <input
            id="course"
            name="course"
            type="text"
            required
            value={formData.course}
            onChange={handleChange}
            className="w-full bg-[#030712]/50 border border-slate-800 rounded-2xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-lg"
            placeholder="e.g. Advanced Quantum Computing"
          />
        </div>

        {/* Target Audience */}
        <div className="space-y-3">
          <label htmlFor="targetAudience" className="flex items-center gap-2 text-sm font-semibold text-slate-300 uppercase tracking-wider">
            <Target size={16} className="text-emerald-400" /> Audience
          </label>
          <input
            id="targetAudience"
            name="targetAudience"
            type="text"
            required
            value={formData.targetAudience}
            onChange={handleChange}
            className="w-full bg-[#030712]/50 border border-slate-800 rounded-2xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
            placeholder="e.g. University Students"
          />
        </div>

        {/* Chapters */}
        <div className="space-y-3">
          <label htmlFor="chapters" className="flex items-center gap-2 text-sm font-semibold text-slate-300 uppercase tracking-wider">
            <ListOrdered size={16} className="text-emerald-400" /> Chapters
          </label>
          <input
            id="chapters"
            name="chapters"
            type="number"
            min={1}
            value={formData.chapters}
            onChange={handleChange}
            className="w-full bg-[#030712]/50 border border-slate-800 rounded-2xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
            placeholder="Number of chapters"
          />
        </div>

        {/* Quiz Toggle */}
        <div className="md:col-span-2 flex items-center justify-between p-5 rounded-2xl border border-slate-800 bg-[#030712]/30">
          <div>
            <h4 className="text-white font-medium mb-1">Include Assessment</h4>
            <p className="text-slate-500 text-sm">Generate 5 multiple-choice questions for the end of the course.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              name="quiz" 
              checked={formData.quiz} 
              onChange={handleChange} 
              className="sr-only peer" 
            />
            <div className="w-14 h-7 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-500"></div>
          </label>
        </div>

      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loadingState}
        className="relative w-full overflow-hidden rounded-2xl bg-white text-[#030712] py-4 text-lg font-bold transition-all disabled:opacity-70 disabled:cursor-not-allowed group mt-4 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)]"
      >
        {/* Animated sheen */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent group-hover:animate-[sheen_1.5s_ease-in-out_infinite]" />
        
        <div className="relative z-10 flex items-center justify-center gap-2">
          {loadingState ? (
            <>
              <div className="w-5 h-5 border-2 border-[#030712] border-t-transparent rounded-full animate-spin" />
              Synthesizing AI Core...
            </>
          ) : (
            <>
              <Zap size={20} className="text-emerald-500" />
              Initialize Generation
            </>
          )}
        </div>
      </motion.button>
    </form>
  )
}

export default Form;