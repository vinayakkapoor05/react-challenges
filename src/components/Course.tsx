
interface CourseProps {
  term: string;
  number: string;
  meets: string;
  title: string;
  selected: boolean;
  onClick: () => void;
}

const Course = ({
  term, number, title, meets, selected, onClick
}: CourseProps) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    className={`flex flex-col h-full w-full p-5 rounded-xl border-2
      bg-white text-left cursor-pointer ${
      selected ? "border-blue-500" : "border-gray-200"
    }`}
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

    <div className="mt-5 pt-3 border-t border-gray-200 w-full text-sm text-gray-500">
      {meets}
    </div>
  </button>
);

export default Course;
