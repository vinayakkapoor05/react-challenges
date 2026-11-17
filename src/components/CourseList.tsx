import Course from './Course';
import { checkTimeConflict } from '../utilities/time-conflicts';

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
        selectedCourses: string[];
        toggleSelected: (key: string) => void;
    }   

    const CourseList = ({ courses, selectedTerm, selectedCourses, toggleSelected }: CourseListProps) => {
        return (
        <ul className="grid w-full auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Object.entries(courses).filter(([, course]) => course.term === selectedTerm).sort(([,a], [,b]) => a.number.localeCompare(b.number, undefined, {numeric: true})).
            map(([key, course]) => {
                        const conflictingCourses = selectedCourses.some(selectedKey => checkTimeConflict(courses[selectedKey], course));

                return (
            <li key={key} className={'h-full ' + (conflictingCourses ? 'opacity-50' : '')}> 
                <Course
                    id={key}
                    term={course.term}
                    number={course.number}
                    meets={course.meets}
                    title={course.title}
                    selected={selectedCourses.includes(key)}
                    onClick={() => toggleSelected(key)}
                />
            </li>
                );
            })}     
        </ul>
    );
};       

export default CourseList;
