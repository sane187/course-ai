import { useState } from 'react';
import QuizModal from '../ui/QuizModal';
import { Eye, ChevronRight, BrainCircuit } from 'lucide-react';
import ViewModal from '../ui/ViewModal';
import { motion } from 'framer-motion';

interface CourseDetailProps {
  data: any;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ data }) => {
  const [quizOpen, setQuizOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleView = (index: number) => {
    setSelectedIndex(index);
  }

  const generateGradientImage = (title: string, index: number) => {
    const gradients = [
      ['#10b981', '#06b6d4'], // emerald-cyan
      ['#3b82f6', '#8b5cf6'], // blue-violet
      ['#f43f5e', '#ec4899'], // rose-pink
      ['#f59e0b', '#ef4444'], // amber-red
      ['#8b5cf6', '#d946ef'], // purple-fuchsia
    ];
    
    const [color1, color2] = gradients[index % gradients.length];
    const safeTitle = title.replace(/[<>&"']/g, '');
    
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400">
      <defs>
        <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="800" height="400" fill="url(#grad${index})" />
      <circle cx="700" cy="100" r="150" fill="#ffffff" opacity="0.1" />
      <circle cx="100" cy="350" r="200" fill="#000000" opacity="0.1" />
      <path d="M-100,400 L800,-100 L900,-100 L-100,500 Z" fill="#ffffff" opacity="0.05" />
      <text x="400" y="200" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="900" fill="white" text-anchor="middle" dominant-baseline="middle">${safeTitle}</text>
    </svg>`;

    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  };

  if (!data?.title) return null;

  return (
    <div className="w-full relative z-20">
      {quizOpen && (
        <QuizModal
          isOpen={quizOpen}
          onClose={() => setQuizOpen(false)}
          questions={data.quiz || []}
        />
      )}

      {selectedIndex !== null && (
        <ViewModal
          onClose={() => setSelectedIndex(null)}
          courseTitle={data.title}
          chapter={data.chapters[selectedIndex]}
          chapterIndex={selectedIndex}
        />
      )}

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
            <BrainCircuit size={16} />
            Course Generation Complete
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">{data.title}</h2>
          <p className="mt-4 text-slate-400 max-w-2xl text-lg leading-relaxed">{data.description}</p>
        </div>

        {data.quiz && data.quiz.length > 0 && (
          <button
            onClick={() => setQuizOpen(true)}
            className="group relative px-6 py-4 bg-slate-900 hover:bg-[#030712] text-white font-bold rounded-2xl transition-all border border-slate-700 hover:border-emerald-500/50 shadow-2xl flex-shrink-0"
          >
            <div className="absolute inset-0 bg-emerald-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none"></div>
            <span className="relative flex items-center gap-2 text-emerald-400">
              Start Final Assessment <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {data?.chapters?.length && data.chapters.map((chapter: any, index: number) => {
          const generatedImage = generateGradientImage(chapter.title, index);

          return (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              className="group flex flex-col bg-[#090e1a]/80 backdrop-blur-2xl border border-slate-800 hover:border-emerald-500/40 rounded-[2rem] overflow-hidden transition-all shadow-xl hover:shadow-emerald-500/10"
            >
              <div className="relative h-56 w-full bg-slate-900 overflow-hidden border-b border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-t from-[#090e1a] via-[#090e1a]/40 to-transparent z-10"></div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={generatedImage} alt={chapter.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105" />

                <div className="absolute top-5 left-5 z-20">
                  <span className="px-4 py-1.5 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-xs font-bold text-emerald-400 uppercase tracking-widest shadow-xl">
                    Chapter {index + 1}
                  </span>
                </div>
              </div>

              <div className="p-6 md:p-8 flex flex-col flex-grow relative z-20">
                <h3 className="text-2xl font-bold text-white mb-3 line-clamp-2 group-hover:text-emerald-400 transition-colors">{chapter.title}</h3>
                <p className="text-slate-400 text-sm mb-8 line-clamp-3 flex-grow leading-relaxed">{chapter.description}</p>

                <button
                  onClick={() => handleView(index)}
                  className="w-full py-3.5 rounded-xl bg-slate-800/50 hover:bg-emerald-500/10 text-slate-300 hover:text-emerald-400 font-semibold text-sm transition-all flex items-center justify-center gap-2 border border-slate-700/50 hover:border-emerald-500/30 cursor-pointer"
                >
                  <Eye size={18} /> Explore Chapter
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  );
}

export default CourseDetail;