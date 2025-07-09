import React, { useEffect, useRef, useState } from "react";
import { useSearchStore } from "../../Store/useSearchStore";
import useSearchSuggestions from "../../api/useSearchSuggestions";

const SearchBar = ({ onSelect }) => {
  const { query, suggestions, setQuery, setSuggestions } = useSearchStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const [manualSearch, setManualSearch] = useState("");
  const containerRef = useRef();

  const { suggests, isLoading, error } = useSearchSuggestions(manualSearch);

  useEffect(() => {
    if (!manualSearch || suggests.length === 0) return;
    setSuggestions(suggests.slice(0, 7));
    setShowDropdown(true);
  }, [manualSearch, suggests, setSuggestions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleTriggerSearch = () => {
    if (query.length >= 2) {
      setManualSearch(query);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleTriggerSearch();
    }
  };

  const handleSelect = (item) => {
    setQuery(item.name);
    setShowDropdown(false);
    onSelect?.(item);
  };

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="relative flex items-center md:w-[160%]"
      >
        {query.length > 0 && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-5 md:size-6 absolute z-10 left-1 cursor-pointer text-[#222222]"
            onClick={() => setQuery("")}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        )}

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for a location..."
          onFocus={() => query.length >= 2 && showDropdown}
          className="search glass-card w-full rounded-2xl focus:rounded-b-none px-5 py-1 outline-none pl-7 pr-15 border-2 shadow-2xl placeholder:text-[#333] placeholder:text-sm"
        />

        <svg
          onClick={handleTriggerSearch}
          className="size-5 absolute right-2 cursor-pointer text-[#222]"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </div>

      {/* Suggestions Dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full md:w-[160%] border search rounded-b-md shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((item) => (
            <li
              key={item.id}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center"
              onClick={() => handleSelect(item)}
            >
              <span className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-5 text-[#222222]"
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
