import React from "react";

const FavoritesList = ({ favorites, addFavorite, onRemove, onSelect }) => {
  if (!favorites.length)
    return (
      <p className="text-center text-gray-500">
        No favorite locations saved yet.
      </p>
    );

  return (
    <div className="flex flex-col my-2 px-1 h-fit">
      {favorites.map((fav) => (
        <div
          key={fav.id}
          className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center hover:shadow-lg transition"
        >
          <div onClick={() => onSelect(fav)} className="cursor-pointer">
            <div className="flex flex-row justify-between">
              <h3 className="text-lg font-semibold text-[#1e1e1e]">
                {fav.name}, {fav.country}
              </h3>
              <button
                onClick={() => onRemove(fav.id)}
                className="text-red-500 hover:text-red-700 text-2xl ml-4"
                title="Remove from favorites"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-5 md:size-6 text-[#2d2d2d] cursor-pointer self-start items"
                  //   onClick={() => handleAddFavorite(dailyData)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row items-center">
                <img
                  src={`https:${fav.condition?.icon}`}
                  alt={fav.condition?.text}
                  className="w-10 h-10"
                />
                <p className="text-xl font-bold text-[#333]">{fav.temp_c}°C</p>
              </div>
              <p className="text-sm text-[#666] mt-1 capitalize">
                {fav.condition?.text}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;
