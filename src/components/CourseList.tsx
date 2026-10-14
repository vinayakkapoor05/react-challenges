import { useState } from 'react';
import Course from './Course';

const toggleList = <T,>(x: T, lst: T[]): T[] => (
  lst.includes(x) ? lst.filter(y => y !== x) : [...lst, x]
);


interface CourseListProps {
   courses: {
        [key: string]: {
        term: string;
        number: string;
        meets: string;
        title: string;
        };
        };
        selectedTerm: string;
    }   

    const CourseList = ({ courses, selectedTerm }: CourseListProps) => {
          const [selectedCourses, setSelectedCourse] = useState<string[]>([]);

            const toggleSelected = (key: string) => {
                setSelectedCourse(selectedCourses => toggleList(key, selectedCourses));
            };

            return (
 
        <ul className="grid w-full auto-rows-fr grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4 px-4">
            {Object.entries(courses).filter(([, course]) => course.term === selectedTerm).map(([key, course]) => (
            <li key={key} className="h-full"> 
                <Course
                    term={course.term}
                    number={course.number}
                    meets={course.meets}
                    title={course.title}
                    selected={selectedCourses.includes(key)}
                    onClick={() => toggleSelected(key)}
                />
            </li>
            ))}
        </ul>
      );
    };  

export default CourseList;