import { useState } from "react";
import TermSelector from "./TermSelector";
import CourseList from "./CourseList";
import Modal from "./Modal";


const toggleList = <T,>(x: T, lst: T[]): T[] => (
  lst.includes(x) ? lst.filter(y => y !== x) : [...lst, x]
);


interface TermPageProps {
    courses: {
        [key: string]: {
            term: string;
            number: string;
            meets: string;
            title: string;
        };
    };
}

const TermPage = ({ courses }: TermPageProps) => {
    const [selectedTerm, setSelectedTerm] = useState("Fall");
    const [selectedCourses, setSelectedCourse] = useState<string[]>([]);
    const [modalOpen, setModalOpen] = useState(false);

    const toggleSelected = (key: string) => {
        setSelectedCourse(selectedCourses => toggleList(key, selectedCourses));
    };

    return (
        <div>
            <div className="flex justify-between items-center">
            <TermSelector 
                selected={selectedTerm}
                setSelected={setSelectedTerm}
                
                />
              <button 
                onClick={() => setModalOpen(true)}
                    className="rounded-lg border-2 border-gray-400 px-4 py-2 font-bold"
                >
                    Course Plan
                </button>
            </div>
            <div className="mt-4">

            <CourseList
                courses={courses}
                selectedTerm={selectedTerm}
                selectedCourses={selectedCourses}
                toggleSelected={toggleSelected}
                />
                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                    <h2 className="text-lg font-bold mb-4">Course Plan</h2> 
                    {selectedCourses.length === 0 ? (
                        <>
                            <p className="text-gray-600">No courses selected.</p>
                            <p className="text-gray-600">Click on a course to add it to your plan.</p>
                        </>
                    ) : (
                        <ul>
                            {selectedCourses.map((course) => (
                                <li key={course} className="text-blue-500 mb-2">
                                    {courses[course].term + " CS " + courses[course].number + ": " + courses[course].title}
                                    <div className="text-gray-600 text-sm" >
                                    {courses[course].meets}
                                </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </Modal>
            </div>
        </div>
    );
}   
export default TermPage;
