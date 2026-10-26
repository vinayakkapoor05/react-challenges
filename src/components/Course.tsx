import { Link } from '@tanstack/react-router';
import { Pencil } from 'lucide-react';

interface CourseProps {
  id: string;
  term: string;
  number: string;
  meets: string;
  title: string;
  selected: boolean;
  onClick: () => void;
}

const Course = ({
  id, term, number, title, meets, selected, onClick
}: CourseProps) => (
<div
  className={`flex flex-col h-full w-full p-5 rounded-xl border-2 bg-white ${
    selected ? "border-blue-500" : "border-gray-200"
  }`}
>
    <button
  type="button"
  onClick={onClick}
  aria-pressed={selected}
  className="flex flex-col flex-grow w-full text-left cursor-pointer"
>
    <div className="flex items-center justify-between w-full mb-3">
      <div className="text-lg font-bold text-gray-800">
        {term} CS {number}
      </div>

      <div className={`flex items-center justify-center w-6 h-6 rounded-full border-2 ${
        selected
          ? "bg-blue-500 border-blue-500 text-white"
          : "border-gray-300"
      }`}>
        {selected && <span className="text-sm">✓</span>}
      </div>
    </div>

    <div className="flex-grow text-sm text-gray-600 leading-relaxed">
      {title}
    </div>

   <div className="flex items-center justify-between mt-5 pt-3 border-t border-gray-200 w-full">
  <span className="text-sm text-gray-500">
    {meets}
  </span>

  <Link
    to="/course/edit/$id"
    params={{ id }}
    aria-label={`Edit CS ${number}`}
    title="Edit course"
    className="ml-2 rounded-lg p-2 text-gray-400"
  >
    <Pencil size={18} />
  </Link>
</div>
  </button>
   
  </div>
);

export default Course;
