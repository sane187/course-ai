import { X, BookOpen, Hash } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

type ViewModalProps = {
  courseTitle: string;
  chapter: any;
  chapterIndex: number;
  onClose: () => void;
}

const ViewModal: React.FC<ViewModalProps> = ({
  courseTitle,
  chapter,
  chapterIndex,
  onClose,
}) => {





  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; }
  }, []);

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

  const validImageUrl = generateGradientImage(chapter.title, chapterIndex);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-[#030712]/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative z-10 w-full max-w-4xl max-h-[90vh] flex flex-col rounded-[2rem] bg-[#090e1a] border border-slate-800 shadow-[0_0_50px_-12px_rgba(16,185,129,0.15)] overflow-hidden"
      >
        {/* Close Button Floating Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/40 backdrop-blur-md hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-white/10 shadow-lg cursor-pointer"
        >
          <X size={24} />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-grow" style={{ scrollbarWidth: 'thin', scrollbarColor: '#1e293b transparent' }}>

          {/* Header Image inside scroll so it moves out of the way */}
          <div className="relative h-48 sm:h-56 w-full flex-shrink-0 border-b border-slate-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={validImageUrl} alt={chapter.title} className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090e1a] to-transparent"></div>
          </div>

          {/* Header Content inside scroll */}
          <div className="px-6 sm:px-10 pt-8 pb-6 relative -mt-16 z-10">
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold tracking-widest uppercase mb-3">
              <BookOpen size={16} /> Chapter {chapterIndex + 1}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight pr-12">{chapter.title}</h2>
            <p className="mt-4 text-slate-400 text-lg leading-relaxed">{chapter.description}</p>
          </div>

          <div className="px-6 sm:px-10 pb-10">
            {chapter.topics && chapter.topics.length > 0 ? (
              <div className="space-y-12">
                {chapter.topics.map((topic: any, tIndex: number) => (
                  <div key={tIndex} className="relative">
                    {/* Topic Title */}
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm border border-emerald-500/20">
                        {tIndex + 1}
                      </span>
                      {topic.title}
                    </h3>

                    {/* Topic Content */}
                    <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                      {topic.content}
                    </p>

                    {/* Subtopics */}
                    {topic.subTopics && topic.subTopics.length > 0 && (
                      <div className="pl-4 md:pl-11 space-y-6 border-l-2 border-slate-800/80">
                        {topic.subTopics.map((sub: any, sIndex: number) => (
                          <div key={sIndex} className="relative">
                            <div className="absolute -left-[19px] md:-left-[47px] top-2.5 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
                            <h4 className="text-xl font-semibold text-emerald-400 mb-2 flex items-center gap-2">
                              <Hash size={16} className="text-emerald-500/50" /> {sub.title}
                            </h4>
                            <p className="text-slate-400 leading-relaxed text-base">
                              {sub.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-lg leading-relaxed text-slate-300 whitespace-pre-wrap">{chapter.content}</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800 bg-[#090e1a] flex justify-between items-center flex-shrink-0">
          <span className="text-sm text-slate-500 font-medium hidden sm:block">{courseTitle}</span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#030712] font-bold transition-colors w-full sm:w-auto text-center"
          >
            Close Chapter
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default ViewModal
