import type { Dispatch, SetStateAction } from "react"

interface TermSelectorProps {
    selected: string;
    setSelected:  Dispatch<SetStateAction<string>>;
}

const TermSelector = ({ selected, setSelected }: TermSelectorProps) => (
      <div className="flex justify-center gap-1">
        { ["Fall", "Winter", "Spring"].map(option  => (
            <button 
            key={option}
            type="button"
            onClick={() => setSelected(option)}
            className={`rounded-lg border-2 border-gray-400 px-4 py-2 font-bold transition-colors ${
                selected === option ? "bg-gray-500 text-white" : "bg-white text-black"
            }`}
            >
            {option}
            </button>
            ))
        }
  </div>
);

export default TermSelector;

