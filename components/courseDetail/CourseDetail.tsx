import { useState } from 'react';
import QuizModal from '../ui/QuizModal';
import styles from './styles.module.css'
import { Eye } from 'lucide-react';
import ViewModal from '../ui/ViewModal';
// type CourseData = {

//   title: string
//   description: string 
//   chapters:any

// }
interface CourseDetailProps {
  data: any;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ data }) => {
  const [quizOpen, setQuizOpen] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);


  const handleView = (index: number) => {

    setSelectedIndex(index);
    setQuizOpen(true);
  }




  return (
    data?.title && <div className="max-w-6xl mx-auto mt-10 mb-20 py-4 px-5 bg-white dark:bg-gray-800 rounded-lg shadow-md ">

      {quizOpen && <QuizModal
        isOpen={selectedIndex == null}
        onClose={() => setQuizOpen(false)}
        questions={data.quiz || []}
      />}
      {quizOpen && selectedIndex !== null && <ViewModal
        onClose={() => { setQuizOpen(false), setSelectedIndex(null) }}
        title={data.title}
        description={data.description}
        content={data.chapters[selectedIndex].content}
      />}

      <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">AI-Generated Course Preview</h2>

      <div className="inline-flex items-baseline gap-2 text-sm">
        <h4 className="text-base font-semibold text-gray-900 dark:text-white">{data.title}</h4>
        {/* <span>has been generated based on your input</span> */}
      </div>

      <p className="text-sm mb-4 text-gray-700 dark:text-gray-300">{data.description}</p>

      <div className="border border-gray-300 dark:border-gray-700 rounded-lg">


        {
          data?.chapters?.length && data.chapters.map((chapter: any, index: number) => (
            <div key={index} className="p-1 bg-gray-50 dark:bg-gray-700 rounded-md px-3 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 flex justify-between items-center">

              <div>
                <div className="flex items-center gap-2 rounded-lg mb-1.5" >
                  <svg width="8" height="8" viewBox="0 0 8 8">
                    <defs>
                      <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#9333EA" />
                        <stop offset="50%" stopColor="#C026D3" />
                        <stop offset="100%" stopColor="#E879F9" />
                      </linearGradient>
                    </defs>

                    <circle cx="4" cy="4" r="4" fill="url(#purpleGradient)" />
                  </svg>

                  <h3 className="text-gray-900 dark:text-white"> {`Chapter ${index + 1}:`} {chapter.title}</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{chapter.description}</p>
              </div>

              <Eye color="purple" className="cursor-pointer" onClick={() => handleView(index)} />

            </div>

          ))
        }

      </div>

      <div className="flex justify-between items-center mt-7 ">

        <div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <p className="text-gray-900 dark:text-white"> Quiz </p>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Test your knowledge with short quiz based on the course.</p>
        </div>

        <button className={`cursor-pointer py-1.5 px-6 rounded-xl ${styles.startQuiz} outline-none shadow-none text-xxl`} onClick={() => setQuizOpen(prev => !prev)}>Start Quiz</button>

      </div>


    </div>
  )

}


export default CourseDetail