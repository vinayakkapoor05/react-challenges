import { Link } from '@tanstack/react-router';
import { Pencil } from 'lucide-react';
import { useProfile } from '../utilities/profile';


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
}: CourseProps) => {
  const[profile] = useProfile();

  return (
<div
  className={`flex h-full w-full flex-col rounded-xl border p-5 shadow-sm transition-colors ${
    selected ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600" : "border-slate-200 bg-white hover:border-slate-400"
  }`}
>
    <button
  type="button"
  onClick={onClick}
  aria-pressed={selected}
  className="flex w-full flex-grow flex-col rounded-lg text-left"
>
    <div className="flex items-center justify-between w-full mb-3">
      <div className="pr-3 text-base font-semibold text-slate-900">
        {term} CS {number}
      </div>

      <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
        selected
          ? "bg-blue-700 border-blue-700 text-white"
          : "border-slate-300 bg-white"
      }`}>
        {selected && <span className="text-sm">✓</span>}
      </div>
    </div>

    <div className="flex-grow text-sm leading-relaxed text-slate-700">
      {title}
    </div>

   <div className="mt-5 flex w-full items-center justify-between border-t border-slate-200 pt-3">
  <span className="text-sm leading-relaxed text-slate-600">
   {meets}
  </span>
{profile.isAdmin && (
  <Link
    to="/course/edit/$id"
    params={{ id }}
    aria-label={`Edit CS ${number}`}
    title="Edit course"
    className="ml-2 shrink-0 rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-blue-700"
  >
    <Pencil size={18} />
  </Link>
)}
</div>
  </button>
  </div>
  );
};
export default Course;
