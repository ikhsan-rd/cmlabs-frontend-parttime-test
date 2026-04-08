/* ── Filter Dropdown ── */
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
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpenDropdown(null); // auto close setelah pilih
              }}
              className="px-3 py-2 text-sm hover:bg-secondary cursor-pointer"
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
