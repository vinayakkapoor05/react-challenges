import { Link } from '@tanstack/react-router';
import { Pencil } from 'lucide-react';
import { useProfile } from '../utilities/profile';


interface CourseProps {
  id: string;
  term: string;
  number: string;
  meets: string;
  title: string;
  professor?: string;
  selected: boolean;
  onClick: () => void;
}

const Course = ({
  id, term, number, title, professor, meets, selected, onClick
}: CourseProps) => {
  const[profile] = useProfile();

  return (
<div
  className={`flex h-full w-full flex-col rounded-xl border p-5 shadow-sm transition-colors ${
    selected ? "border-accent bg-selection ring-1 ring-accent" : "border-divider bg-panel hover:border-muted"
  }`}
>
    <button
  type="button"
  onClick={onClick}
  aria-pressed={selected}
  className="flex w-full flex-grow flex-col rounded-lg text-left"
>
    <div className="flex items-center justify-between w-full mb-3">
      <div className="pr-3 text-base font-semibold text-ink">
        {term} CS {number}
      </div>

      <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
        selected
          ? "bg-accent border-accent text-on-accent"
          : "border-control bg-panel"
      }`}>
        {selected && <span className="text-sm">✓</span>}
      </div>
    </div>

    <div className="flex-grow text-sm leading-relaxed text-ink">
      {title}
      {professor && <div className="mt-1 text-muted">{professor}</div>}
    </div>

   <div className="mt-5 flex w-full items-center justify-between border-t border-divider pt-3">
  <span className="text-sm leading-relaxed text-muted">
   {meets}
  </span>
{profile.isAdmin && (
  <Link
    to="/course/edit/$id"
    params={{ id }}
    aria-label={`Edit CS ${number}`}
    title="Edit course"
    className="ml-2 shrink-0 rounded-lg p-2 text-muted hover:bg-raised hover:text-accent"
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
