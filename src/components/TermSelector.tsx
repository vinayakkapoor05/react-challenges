import type { Dispatch, SetStateAction } from "react"

interface TermSelectorProps {
    selected: string;
    setSelected:  Dispatch<SetStateAction<string>>;
}

const TermSelector = ({ selected, setSelected }: TermSelectorProps) => (
      <div className="flex w-full gap-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-1 sm:w-auto">
        { ["Fall", "Winter", "Spring"].map(option  => (
            <button 
            key={option}
            type="button"
            onClick={() => setSelected(option)}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold sm:flex-none ${
                selected === option ? "bg-blue-700 dark:bg-blue-600 text-white shadow-sm hover:bg-blue-800 dark:hover:bg-blue-700" : "text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white"
            }`}
            >
            {option}
            </button>
            ))
        }
  </div>
);

export default TermSelector;

