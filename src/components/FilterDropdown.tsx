import { useState, useEffect, useRef } from "react";

const FilterDropdown = ({
  id,
  label,
  value,
  options,
  onChange,
  openDropdown,
  setOpenDropdown,
}: {
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  openDropdown: string | null;
  setOpenDropdown: (id: string | null) => void;
}) => {
  const isOpen = openDropdown === id;
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    if (isOpen) {
      setSearchTerm("");
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen]);

  return (
    <div className="relative w-48">
      <button
        onClick={() => setOpenDropdown(isOpen ? null : id)}
        className="w-full bg-card border border-gray-200 rounded-lg px-3 py-2 text-sm text-left"
      >
        {value || label}
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-1 w-full bg-card border border-gray-200 rounded-lg shadow-md max-h-60 overflow-y-auto bg-background">
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type to search..."
            className="w-full px-3 py-2 border-b border-gray-200 text-sm outline-none"
          />
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <div
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpenDropdown(null);
                }}
                className="px-3 py-2 text-sm hover:bg-secondary cursor-pointer"
              >
                {opt}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-muted-foreground">
              No options found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
