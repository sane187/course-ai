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
   <div  className="max-w-6xl mx-auto mt-10 mb-20">

    <h2>AI-Generated Course Preview</h2>

     <h4>{data.title}</h4> 
       <p>{data.description}</p>

    <div className="border-gray-300 p-4 rounded-lg">
        {
          data?.chapters?.length && data.chapters.map((chapter:any, index:number) => (  
         <div key={index} className="p-1 ">
         <div className="flex gap-1 rounded-lg" >
             <h3> {`Chapter ${index + 1}:`} {chapter.title}</h3>
         </div>
             <p>{chapter.description}</p>
            </div> ))
        }
    </div>

    </div>
   )

}


export default CourseDetail;