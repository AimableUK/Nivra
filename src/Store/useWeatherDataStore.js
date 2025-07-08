import { create } from "zustand";

export const useWeatherDataStore = create((set) => ({
  weatherData: null,

  setWeatherData: (data) => set({ weatherData: data }),
  clearWeatherData: () => set({ weatherData: null }),
}));
