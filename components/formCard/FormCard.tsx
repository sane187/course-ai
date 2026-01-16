import Image from 'next/image'
import React from 'react'
import Form from '../form/Form';
import CourseDetail from '../courseDetail/CourseDetail';

const FormCard: React.FC = () => {

         const [resultData, setResultData] = React.useState<any>({});
    
 
  return (
    <div>

        <div className='flex gap-2 justify-between px-4 pt-10 max-w-6xl mx-auto'>
     <div className='flex-col '>
    <h3>Create an AI-Generated Course</h3>
    <p>Enter a topic and let our AI create a course outline, content and quiz for you </p>

   


     </div>

            <div>  
           <Image src={'/images/ai-course.png'} alt="AI Course" width={80} height={5} /> 
          </div>
   
 </div>
        <div className="relative max-w-6xl mx-auto px-4 ">

  


  <div className="bg-white rounded-xl shadow-xl p-6 w-full lg:w-[45%] relative z-30">
    <h3 className="font-semibold mb-4">Course Details</h3>
    <Form setResultData={setResultData} />
  </div>
{/* 
  <div
    className="bg-white rounded-xl shadow-lg p-6 w-full lg:w-[38%]
           mt-6 lg:mt-0
           lg:absolute lg:top-0 lg:right-0
           lg:translate-y-8 z-20">
    <h3 className="font-semibold mb-4">Examples</h3>
  </div> */}

  {/* <div
    className="bg-white rounded-xl shadow-md p-6 w-full lg:w-[45%]
           mt-6
           lg:absolute lg:right-[10%] lg:bottom-0
           lg:translate-y-1/2 z-10">
    <h3 className="font-semibold mb-4">Generating Course</h3>
  </div> */}

      </div>
  
      <CourseDetail data={resultData} />

    </div>
  )
}

export default FormCard