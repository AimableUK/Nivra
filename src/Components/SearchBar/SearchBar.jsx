import React, { useEffect, useRef, useState } from "react";
import { useSearchStore } from "../../Store/useSearchStore";

const SearchBar = ({ onSelect }) => {
  const { query, suggestions, setQuery, setSuggestions } = useSearchStore();
  const [showDropdown, setShowDropdown] = useState(false);

  const containerRef = useRef();

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
    onSelect?.(item);
  };

  const handleSearchClick = () => {
    setShowDropdown(false);
    if (query.length >= 2) {
      console.log("Search clicked with:", query);
    }
  };

  return (
    <div className="relative">
      {/* Searh Box */}
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
            className="size-6 absolute z-10 left-1 cursor-pointer text-[#222222]"
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
          onFocus={() => query.length >= 2 && setShowDropdown(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setShowDropdown(false);
              onSelect?.({
                id: query.toLowerCase().replace(/\s+/g, "-"),
                name: query,
              });
            }
          }}
          placeholder="Search for a location..."
          className="search active glass-card w-full rounded-2xl focus:rounded-b-none px-5 py-1 outline-none pl-7 pr-15 border-2 shadow-2xl placeholder:text-[#444]"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-6 absolute right-2 cursor-pointer text-[#222222]"
          onClick={handleSearchClick}
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
              onClick={() => {
                handleSelect(item);
              }}
            >
              <span>
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
