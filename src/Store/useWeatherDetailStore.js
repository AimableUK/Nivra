import { create } from "zustand";

const useWeatherDetailStore = create((set) => ({
  filterDetail: "temperature",

  // detail setter
  setFilterDetail: (detail) =>
    set(() => ({
      filterDetail: detail,
    })),
}));

export default useWeatherDetailStore;
