'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, XCircle, BrainCircuit } from 'lucide-react';

export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
  selectedAnswer?: string | null;
};

type QuizModalProps = {
  isOpen: boolean;
  onClose: () => void;
  questions: QuizQuestion[];
};

const QuizModal: React.FC<QuizModalProps> = ({
  isOpen, 
  onClose,
  questions,
}) => {
  const [questionsClonedArray, setQuestionsClonedArray] = useState<QuizQuestion[]>([]);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    if (questions && questions.length > 0) {
      const cloned = questions.map(q => ({
        ...q,
        selectedAnswer: null,
      }));
      setQuestionsClonedArray(cloned);
      setScore(null);
    }
  }, [questions]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  const handleClickAnswer = (selectedAnswer: string, index: number) => {
    setQuestionsClonedArray(prev => {
      const cloned = [...prev];
      cloned[index] = {
        ...cloned[index],
        selectedAnswer,
      };
      
      // Calculate score if all questions are answered
      const allAnswered = cloned.every(q => q.selectedAnswer !== null);
      if (allAnswered) {
        const correctCount = cloned.filter(q => q.selectedAnswer === q.correctAnswer).length;
        setScore(correctCount);
      }
      
      return cloned;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-[#030712]/90 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative z-10 w-full max-w-3xl max-h-[90vh] flex flex-col rounded-[2rem] bg-[#090e1a] border border-slate-800 shadow-[0_0_50px_-12px_rgba(16,185,129,0.15)] overflow-hidden"
      >
        <div className="p-6 border-b border-slate-800/50 bg-slate-900/50 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3 text-emerald-400">
            <div className="p-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
              <BrainCircuit size={24} />
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">Final Assessment</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700/50 flex-shrink-0 cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto flex-grow" style={{ scrollbarWidth: 'thin', scrollbarColor: '#1e293b transparent' }}>
          
          {score !== null && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-6 rounded-2xl border mb-8 flex items-center justify-between ${
                score >= questions.length / 2 
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                  : 'bg-red-500/10 border-red-500/20 text-red-400'
              }`}
            >
              <div>
                <h3 className="text-xl font-bold mb-1">Assessment Complete</h3>
                <p className="text-slate-300">You scored {score} out of {questions.length} correctly.</p>
              </div>
              <div className="text-4xl font-black">{Math.round((score / questions.length) * 100)}%</div>
            </motion.div>
          )}

          <div className="space-y-10">
            {questionsClonedArray.map((q, index) => (
              <div key={index} className="relative">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-slate-300 font-bold text-sm border border-slate-700">
                    {index + 1}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white leading-relaxed pt-0.5">
                    {q.question}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-0 sm:pl-12">
                  {q.options.map(option => {
                    const isSelected = q.selectedAnswer === option;
                    const isCorrect = option === q.correctAnswer;
                    const isWrong = isSelected && !isCorrect;
                    const showCorrect = q.selectedAnswer !== null && isCorrect;

                    let optionClass = "bg-slate-800/50 border-slate-700 hover:border-slate-500 hover:bg-slate-800 text-slate-300";
                    let Icon = null;

                    if (q.selectedAnswer !== null) {
                      if (showCorrect) {
                        optionClass = "bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)]";
                        Icon = <CheckCircle2 size={18} className="text-emerald-400" />;
                      } else if (isWrong) {
                        optionClass = "bg-red-500/10 border-red-500/30 text-red-400";
                        Icon = <XCircle size={18} className="text-red-400" />;
                      } else {
                        optionClass = "bg-slate-900/50 border-slate-800/50 text-slate-600 opacity-50";
                      }
                    }

                    return (
                      <button
                        key={option}
                        onClick={() => !q.selectedAnswer && handleClickAnswer(option, index)}
                        disabled={q.selectedAnswer !== null}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left font-medium ${optionClass} ${q.selectedAnswer === null ? 'cursor-pointer hover:-translate-y-1' : 'cursor-default'}`}
                      >
                        <span className="leading-snug">{option}</span>
                        {Icon && <span className="flex-shrink-0 ml-3">{Icon}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-slate-800 bg-[#090e1a] flex justify-end flex-shrink-0">
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#030712] font-bold transition-colors w-full sm:w-auto text-center shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            {score !== null ? 'Finish & Close' : 'Close Quiz'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default QuizModal;
