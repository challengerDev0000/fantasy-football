import { useState } from "react";

interface DropdownProps {
  options: string[];
  selected: string;
  onSelect: (selected: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative text-left">
      <button
        type="button"
        className="inline-flex justify-between text-[24px] w-72 rounded-md bg-[#1D1D1D] text-white px-6 py-3 focus:outline-none overflow-hidden max-w-full truncate"
        onClick={toggleDropdown}
      >
        <div className=" max-w-64 overflow-hidden">
          {selected || "Select Option"}
        </div>
        <svg
          className={`-mr-1 ml-2 h-8 w-8 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.23a1 1 0 011.415 0L10 10.085l3.354-3.354a1 1 0 111.413 1.413l-4 4a1 1 0 01-1.413 0l-4-4a1 1 0 010-1.413z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 min-w-72 w-fit origin-top-right rounded-md bg-[#1D1D1D] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
                className="flex justify-start w-full px-6 py-3 text-[24px] text-white bg-[#1D1D1D] hover:bg-[#807B0F] focus:bg-gray-200 focus:outline-none truncate"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
