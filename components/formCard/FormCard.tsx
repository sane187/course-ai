import Image from 'next/image'
import React from 'react'
import Form from '../form/Form';
import CourseDetail from '../courseDetail/CourseDetail';
import { FileText,Check,Settings  } from 'lucide-react';
import ProgressBar from '../ui/ProgressBar';

const FormCard: React.FC = () => {

         const [resultData, setResultData] = React.useState<any>({});
         const [loading, setLoading] = React.useState<boolean>(false);
    
 
  return (  <div>
    <div className='relative h-[100vh]'>

        <div className='flex gap-2 justify-between px-4 pt-10 max-w-7xl mx-auto'>
     <div className=''>
    <h3 className='text-4xl mb-1 text-gray-900 dark:text-white'>Create an AI-Generated Course</h3>
    <p className='text-gray-500 dark:text-gray-400 text-xl mb-4.5' >Enter a topic and let our AI create a course outline, content <br />
       and quiz for you </p>

    
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-[90%] relative z-9">
    <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Course Details</h3>
    <Form setResultData={setResultData} setLoading={setLoading} />
  </div>


     </div>

     
  {/* soft background glow */}
  <div className="relative w-[45%] h-[60vh] overflow-hidden rounded-xl">
  <Image
    src="/images/ai-course.png"
    alt="AI Course"
    fill
    className="object-cover p-1 rounded-xl"
  />
</div>
</div>

        <div className="absolute flex gap-3 items-center w-max mx-auto px-4 bottom-25 right-30 z-20">

  



  <div
    className="bg-blue-50 dark:bg-gray-800 rounded-xl shadow-lg p-4 w-full 
           lg:mt-0">
    <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Examples</h3>
    
    <div className='flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300'>    <FileText className="text-purple-700 dark:text-purple-400"/>  Cybersecurity Basics for Small Businesses   </div>
    <div className='flex items-center gap-2 my-2.5 text-sm text-gray-700 dark:text-gray-300'>    <FileText className="text-purple-700 dark:text-purple-400" />  Understanding Climate Change for Kids </div>
    <div className='flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300'>    <FileText className="text-purple-700 dark:text-purple-400"/> Introduction to Artificial Intelligence for Beginners</div>


  </div>

  <div
    className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 w-full">
    <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">{loading?'Generating Course':'Ready to Generate Your Course'}</h3>
    <ProgressBar loading={loading}/>
    <div className='flex items-center gap-2 mb-1 text-sm text-gray-700 dark:text-gray-300'>    {!loading?<Check className="text-green-600 dark:text-green-400" />:<Settings className="text-gray-600 dark:text-gray-400" />} Your AI will create </div>
    <div className='flex items-center gap-2 mb-1 text-sm text-gray-700 dark:text-gray-300'>    {!loading?<Check className="text-green-600 dark:text-green-400" />:<Settings className="text-gray-600 dark:text-gray-400" />} Chapter-wise content (2 chapters) </div>
    <div className='flex items-center gap-2 mb-1 text-sm text-gray-700 dark:text-gray-300'>    {!loading?<Check className="text-green-600 dark:text-green-400" />:<Settings className="text-gray-600 dark:text-gray-400" />} Quiz-questions included (5 questions) </div>
    <div className='flex items-center gap-2 mb-1 text-sm text-gray-700 dark:text-gray-300'>    {!loading?<Check className="text-green-600 dark:text-green-400" />:<Settings className="text-gray-600 dark:text-gray-400" />} Tailored for (Target Audience) </div>
  
    
  </div>

      </div>
  
     

    </div>

    <CourseDetail data={resultData} />

    </div>
  )
}

export default FormCard