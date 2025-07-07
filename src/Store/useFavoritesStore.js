import { create } from "zustand";
import { persist } from "zustand/middleware";

const favoritesList = [
  {
    id: "kigali-rw",
    name: "Kigali",
    country: "Rwanda",
    temp_c: 23,
    condition: {
      text: "Partly Cloudy",
      icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
    },
  },
  {
    id: "nairobi-ke",
    name: "Nairobi",
    country: "Kenya",
    temp_c: 27,
    condition: {
      text: "Sunny",
      icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
    },
  },
  {
    id: "addis-ababa-et",
    name: "Addis Ababa",
    country: "Ethiopia",
    temp_c: 20,
    condition: {
      text: "Cloudy",
      icon: "//cdn.weatherapi.com/weather/64x64/day/119.png",
    },
  },
  {
    id: "kampala-ug",
    name: "Kampala",
    country: "Uganda",
    temp_c: 25,
    condition: {
      text: "Showers",
      icon: "//cdn.weatherapi.com/weather/64x64/day/176.png",
    },
  },
];

const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: favoritesList,

      // Add a favorite (avoid duplicates by id)
      addFavorite: (location) => {
        const exists = get().favorites.some((fav) => fav.id === location.id);
        if (!exists) {
          set((state) => ({
            favorites: [...state.favorites, location],
          }));
        }
      },

      // Remove a favorite by id
      removeFavorite: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== id),
        }));
      },

      // Clear all favorites
      clearFavorites: () => {
        set({ favorites: [] });
      },
    }),
    {
      name: "weather-favorites-storage", // key in localStorage
    }
  )
);

export default useFavoritesStore;
