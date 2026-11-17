import { useState, useEffect} from "react";
import TermSelector from "./TermSelector";
import CourseList from "./CourseList";
import Modal from "./Modal";
import { doc, onSnapshot } from "firebase/firestore";
import Calendar from "./Calendar";

import {
  firestore,
  useAuthState,
  saveSelectedCourses
} from "../utilities/firebase";


import {checkTimeConflict} from "../utilities/time-conflicts";


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
    const {user, isAuthenticated} = useAuthState();
    const [view, setView] = useState<"list" | "calendar">("list");
    useEffect(() => {
        setSelectedCourse([]);

        if (!isAuthenticated || !user) return;
        return onSnapshot(doc(firestore, `coursePlans`, user.uid), (snapshot) => {
            setSelectedCourse(snapshot.data()?.selectedCourses || []);
        });
    }

, [user?.uid, isAuthenticated]);


const toggleSelected = async (key: string) => {
  const isSelected = selectedCourses.includes(key);

  if (!isSelected) {
    const conflictingCourses = selectedCourses.some(
      selectedKey =>
        checkTimeConflict(courses[selectedKey], courses[key])
    );

    if (conflictingCourses) return;
  }

  setSelectedCourse(current =>
    current.includes(key)
      ? current.filter(id => id !== key)
      : [...current, key]
  );

  if (user && isAuthenticated) {
    try {
      await saveSelectedCourses(user.uid, key, !isSelected);
    } catch (error) {
      console.error("failed to save courses:", error);
    }
  }
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

        <div className="flex gap-3 mb-4">
            <button
            onClick={() => setView("list")}
            className={`px-4 py-2 rounded-lg ${
                view === "list"
                ? "bg-blue-500 text-white"
                : "bg-gray-100"
            }`}
            >
            List View
            </button>

            <button
            onClick={() => setView("calendar")}
            className={`px-4 py-2 rounded-lg ${
                view === "calendar"
                ? "bg-blue-500 text-white"
                : "bg-gray-100"
            }`}
            >
            Calendar View
            </button>
        </div>

        {view === "list" ? (
            selectedCourses.length === 0 ? (
            <>
                <p className="text-gray-600">No courses selected.</p>
                <p className="text-gray-600">
                Click on a course to add it to your plan.
                </p>
            </>
            ) : (
            <ul>
                {selectedCourses
                .filter(id => courses[id])
                .map(id => (
                    <li key={id} className="text-blue-500 mb-2">
                    {courses[id].term} CS {courses[id].number}:{" "}
                    {courses[id].title}

                    <div className="text-gray-600 text-sm">
                        {courses[id].meets}
                    </div>
                    </li>
                ))}
            </ul>
            )
        ) : (
            <Calendar
            courses={courses}
            selectedCourses={selectedCourses}
            selectedTerm={selectedTerm}
            />
        )}
        </Modal>
            </div>
        </div>
    );
}   
export default TermPage;
