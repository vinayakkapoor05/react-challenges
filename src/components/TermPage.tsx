import { useState } from "react";
import TermSelector from "./TermSelector";
import CourseList from "./CourseList";

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
    return (
        <div>
            <TermSelector
                selected={selectedTerm}
                setSelected={setSelectedTerm}
                />
            <div className="h-4"></div>
            <CourseList
                courses={courses}
                selectedTerm={selectedTerm}
                />
        </div>
    );
}   
export default TermPage;
