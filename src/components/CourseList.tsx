import Course from './Course';

interface CourseListProps {
   courses: {
        [key: string]: {
        term: string;
        number: string;
        meets: string;
        title: string;
        };
        };
    }   
    const CourseList = ({ courses }: CourseListProps) => (
        <ul className="grid w-full grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4 px-4">
            {Object.entries(courses).map(([key, course]) => (
            <li key={key} className="h-full"> 
                <Course
                    term={course.term}
                    number={course.number}
                    meets={course.meets}
                    title={course.title}
                />
            </li>
            ))}
        </ul>
);  

export default CourseList;