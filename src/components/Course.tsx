interface CourseProps {
    term: string;
    number: string;
    meets: string;
    title: string;
  } 

  const Course = ({term, number, title }: CourseProps) => (
    <div>{term} CS {number}: {title}</div>
  );

  export default Course;