import { create } from "zustand";

const useWeatherDetailStore = create((set) => ({
  filterDetail: "temperature",
  settings: [
    {
      defaultCity: "kigali",
      myLocation: null,

      temp_Unit: ["c", "f"],
      pres_Unit: ["mb", "in"],
      wind_Unit: ["kph", "mph"],
      precip_Unit: ["mm", "in"],

      weather_Alerts: null,
    },
  ],

  // detail setter
  setFilterDetail: (detail) =>
    set(() => ({
      filterDetail: detail,
    })),
}));

export default useWeatherDetailStore;
