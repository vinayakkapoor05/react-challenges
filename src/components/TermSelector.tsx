import type { Dispatch, SetStateAction } from "react"

interface TermSelectorProps {
    selected: string;
    setSelected:  Dispatch<SetStateAction<string>>;
}

const TermSelector = ({ selected, setSelected }: TermSelectorProps) => (
      <div className="flex w-full gap-1 rounded-xl border border-divider bg-raised p-1 sm:w-auto">
        { ["Fall", "Winter", "Spring"].map(option  => (
            <button 
            key={option}
            type="button"
            onClick={() => setSelected(option)}
            className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold sm:flex-none ${
                selected === option ? "bg-accent text-on-accent shadow-sm hover:bg-accent-hover" : "text-muted hover:bg-panel hover:text-ink"
            }`}
            >
            {option}
            </button>
            ))
        }
  </div>
);

export default TermSelector;

