import type { Dispatch, SetStateAction } from "react"

interface TermSelectorProps {
    selected: string;
    setSelected:  Dispatch<SetStateAction<string>>;
}

const TermSelector = ({ selected, setSelected }: TermSelectorProps) => (
      <div className="flex w-full gap-1 rounded-xl border border-slate-200 bg-slate-100 p-1 sm:w-auto">
        { ["Fall", "Winter", "Spring"].map(option  => (
            <button 
            key={option}
            type="button"
            onClick={() => setSelected(option)}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold sm:flex-none ${
                selected === option ? "bg-blue-700 text-white shadow-sm hover:bg-blue-800" : "text-slate-600 hover:bg-white hover:text-slate-900"
            }`}
            >
            {option}
            </button>
            ))
        }
  </div>
);

export default TermSelector;

