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
    const [searchQuery, setSearchQuery] = useState("");
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
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <TermSelector 
                selected={selectedTerm}
                setSelected={setSelectedTerm}
                
                />
              <button 
                onClick={() => setModalOpen(true)}
                    className="rounded-lg border border-blue-700 dark:border-blue-600 bg-blue-700 dark:bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:border-blue-800 dark:hover:border-blue-700 hover:bg-blue-800 dark:hover:bg-blue-700"
                >
                    Course Plan
                </button>
            </div>
            <div className="mt-6">
            <div className="mb-4 flex items-center justify-between gap-4">
            <input
                type="search"
                placeholder="Search courses by number or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-500 dark:bg-slate-900 dark:placeholder:text-slate-400 px-4 py-2.5"
                />
            </div>
            <CourseList
                courses={courses}
                selectedTerm={selectedTerm}
                selectedCourses={selectedCourses}
                toggleSelected={toggleSelected}
                searchQuery={searchQuery}
                />
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="mb-5 pr-10 text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Course Plan</h2>

        <div className="mb-6 flex w-fit max-w-full gap-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-1">
            <button
            onClick={() => setView("list")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                view === "list"
                ? "bg-blue-700 dark:bg-blue-600 text-white shadow-sm hover:bg-blue-800 dark:hover:bg-blue-700"
                : "text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
            }`}
            >
            List View
            </button>

            <button
            onClick={() => setView("calendar")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                view === "calendar"
                ? "bg-blue-700 dark:bg-blue-600 text-white shadow-sm hover:bg-blue-800 dark:hover:bg-blue-700"
                : "text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
            }`}
            >
            Calendar View
            </button>
        </div>

        {view === "list" ? (
            selectedCourses.length === 0 ? (
            <>
                <p className="text-sm font-medium leading-6 text-slate-700 dark:text-slate-200">No courses selected.</p>
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                Click on a course to add it to your plan.
                </p>
            </>
            ) : (
            <ul className="space-y-3">
                {selectedCourses
                .filter(id => courses[id])
                .map(id => (
                    <li key={id} className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-4 text-sm font-semibold leading-relaxed text-slate-900 dark:text-slate-100">
                    {courses[id].term} CS {courses[id].number}:{" "}
                    {courses[id].title}

                    <div className="mt-1 text-sm font-normal text-slate-600 dark:text-slate-300">
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
