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
        <ul>
            {Object.entries(courses).map(([key, course]) => (
            <li key={key}>
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