interface CourseProps {
    term: string;
    number: string;
    meets: string;
    title: string;
  } 

  const Course = ({term, number, title, meets }: CourseProps) => (
     <div className="flex flex-col h-full p-4 border border-gray-400 rounded-lg">
      <div className="text-xl mb-2 font-bold">
        { term } CS {number}
      </div>
      <div className="flex-grow italic">
        { title}
      </div>
      <div className="mt-4 pt-1 border-t border-gray-300 text-center">
        {meets}
      </div>
    </div>

  );

  export default Course;