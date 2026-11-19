import { useState, useEffect} from "react";
import TermSelector from "./TermSelector";
import CourseList from "./CourseList";
import Modal from "./Modal";
import { doc, onSnapshot } from "firebase/firestore";
import Calendar from "./Calendar";
import { downloadICS } from "../utilities/export-calendar";

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
            professor?: string;
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
    const handleExport = () => {
    const coursesToExport = selectedCourses
        .filter(id => courses[id]?.term === selectedTerm)
        .map(id => courses[id]);

    try {
        downloadICS(coursesToExport, selectedTerm);
    } catch (error) {
        console.error("calendar export failed:", error);
        alert("no valid courses available to export.");
    }
    };
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
                    className="rounded-lg border border-accent bg-accent px-4 py-2.5 text-sm font-semibold text-on-accent shadow-sm hover:border-accent-hover hover:bg-accent-hover"
                >
                    Course Plan
                </button>
            </div>
            <div className="mt-6">
            <div className="mb-4 flex items-center justify-between gap-4">
            <input
                type="search"
                placeholder="Search by course number, title, or professor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-control bg-panel placeholder:text-muted px-4 py-2.5"
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
        <h2 className="mb-5 pr-10 text-xl font-bold tracking-tight text-ink">Course Plan</h2>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex w-fit max-w-full gap-1 rounded-xl border border-divider bg-raised p-1">
            <button
            type="button"
            onClick={() => setView("list")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                view === "list"
                ? "bg-accent text-on-accent shadow-sm hover:bg-accent-hover"
                : "text-muted hover:bg-panel hover:text-ink"
            }`}
            >
            List View
            </button>

            <button
            type="button"
            onClick={() => setView("calendar")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                view === "calendar"
                ? "bg-accent text-on-accent shadow-sm hover:bg-accent-hover"
                : "text-muted hover:bg-panel hover:text-ink"
            }`}
            >
            Calendar View
            </button>
        </div>

        <button
            type="button"
            onClick={handleExport}
            disabled={!selectedCourses.some(
            id => courses[id]?.term === selectedTerm
            )}
            className="rounded-lg border border-accent bg-accent px-4 py-2.5 text-sm font-semibold text-on-accent shadow-sm enabled:hover:border-accent-hover enabled:hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
            Export Calendar (.ics)
        </button>
        </div>

        {view === "list" ? (
            selectedCourses.length === 0 ? (
            <>
                <p className="text-sm font-medium leading-6 text-ink">No courses selected.</p>
                <p className="text-sm leading-6 text-muted">
                Click on a course to add it to your plan.
                </p>
            </>
            ) : (
            <ul className="space-y-3">
                {selectedCourses
                .filter(id => courses[id])
                .map(id => (
                    <li key={id} className="rounded-xl border border-divider bg-raised p-4 text-sm font-semibold leading-relaxed text-ink">
                    {courses[id].term} CS {courses[id].number}:{" "}
                    {courses[id].title}
                    {courses[id].professor && (
                        <div className="mt-1 font-normal text-muted"> {courses[id].professor}</div>
                    )}

                    <div className="mt-1 text-sm font-normal text-muted">
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
