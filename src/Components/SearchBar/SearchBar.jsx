import React, { useEffect, useState } from "react";
import { useSearchStore } from "../../Store/useSearchStore";

const SearchBar = ({ onSelect }) => {
  const { query, suggestions, setQuery, setSuggestions } = useSearchStore();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const mockSuggestions = [
      { id: "kigali-rw", name: "Kigali, Rwanda" },
      { id: "nairobi-ke", name: "Nairobi, Kenya" },
      { id: "addis-et", name: "Addis Ababa, Ethiopia" },
      { id: "kampala-ug", name: "Kampala, Uganda" },
    ].filter((loc) => loc.name.toLowerCase().includes(query.toLowerCase()));

    setSuggestions(mockSuggestions);
    setShowDropdown(true);
  }, [query, setSuggestions]);

  const handleSelect = (item) => {
    setQuery(item.name);
    setShowDropdown(false);
    if (onSelect) onSelect(item);
  };

  return (
    <div className="relative">
      {/* Searh Box */}
      <div className="relative flex items-center md:w-[160%]">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          placeholder="Search for a location..."
          className="group search active glass-card w-full rounded-2xl focus:rounded-b-none px-5 py-1 outline-none pr-10 border-2 shadow-2xl"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-6 absolute right-2 cursor-pointer group-focus:rounded-b-none"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>

      {/* Search Body */}
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-50 w-[160%] border search rounded-b-md shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((item) => (
            <li
              key={item.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex flex-row items-center"
              onClick={() => handleSelect(item)}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-5 text-[#333]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
              </span>
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
