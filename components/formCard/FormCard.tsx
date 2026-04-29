"use client";

import React from 'react';
import Form from '../form/Form';
import CourseDetail from '../courseDetail/CourseDetail';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, BookOpen, Layers } from 'lucide-react';

const FormCard: React.FC = () => {
  const [resultData, setResultData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#030712] selection:bg-emerald-500/30 text-slate-200 relative overflow-hidden font-sans pt-20 pb-24">
      
      {/* Abstract Ambient Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-teal-500/20 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="inline-flex items-center justify-center p-3 mb-6 rounded-2xl bg-gradient-to-br from-emerald-400/10 to-cyan-400/10 border border-emerald-500/20 shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]"
          >
            <Bot className="text-emerald-400" size={28} />
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6">
            Generate <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Smarter Courses.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light">
            Harness the power of AI to instantly forge structured curriculums, immersive chapters, and precise assessments.
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="relative group"
        >
          {/* Animated border glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/50 to-cyan-500/50 rounded-[2.5rem] blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative bg-[#090e1a]/90 backdrop-blur-3xl border border-slate-800/80 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
            <Form setResultData={setResultData} setLoading={setLoading} />
          </div>
        </motion.div>

        {/* Features / Badges below form */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex flex-wrap justify-center gap-6 mt-12"
        >
          <Badge icon={<Sparkles size={16} />} text="Instant AI Generation" />
          <Badge icon={<BookOpen size={16} />} text="Structured Chapters" />
          <Badge icon={<Layers size={16} />} text="Automated Quizzes" />
        </motion.div>

        {/* Results Section */}
        <AnimatePresence>
          {resultData && Object.keys(resultData).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              className="mt-24 relative"
            >
              <div className="absolute -inset-10 bg-emerald-500/5 blur-[100px] -z-10 rounded-full" />
              <CourseDetail data={resultData} />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

const Badge = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800/50 text-slate-400 text-sm font-medium">
    <span className="text-emerald-500">{icon}</span>
    {text}
  </div>
);

export default FormCard;