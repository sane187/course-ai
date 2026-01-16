import styles from './styles.module.css'
// type CourseData = {

//   title: string
//   description: string 
//   chapters:any

// }
interface CourseDetailProps {
  data: any;
}

const CourseDetail: React.FC<CourseDetailProps> = ({data}) => {
 
  return (  
    data?.title && <div className="max-w-6xl mx-auto mt-10 mb-20 py-4 px-5 bg-white rounded-lg shadow-md ">

    <h2 className="text-xl font-semibold mb-3">AI-Generated Course Preview</h2>


    <div className="inline-flex items-baseline gap-2 text-sm">
  <h4 className="text-base font-semibold ">{data.title}</h4>
  {/* <span>has been generated based on your input</span> */}
</div>  

       <p className="text-sm mb-4">{data.description}</p>

    <div className="border border-gray-300 rounded-lg">


        {
          data?.chapters?.length && data.chapters.map((chapter:any, index:number) => (  
         <div key={index} className="p-1 bg-white-100 rounded-md px-3 py-3 hover:bg-gray-100 ">
         <div className="flex gap-1 rounded-lg mb-1.5" >
             <h3> {`Chapter ${index + 1}:`} {chapter.title}</h3>
         </div>
             <p>{chapter.description}</p>
            </div>
            
        ))
        }

    </div>

    <div className="flex justify-between align-center mt-7 ">

       <div>  
    <div className="flex items-center gap-2 text-sm font-medium">  
       <p> Quiz </p>    
   </div>  
     <p className="text-xs text-gray-500">Test your knowledge with short quiz based on the course.</p>
    </div>

            <button className={`cursor-pointer py-1.5 px-6 rounded-xl ${styles.startQuiz}`}>Start Quiz</button> 

    </div>


    </div>
   )

}


export default CourseDetail