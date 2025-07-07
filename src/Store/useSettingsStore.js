import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSettingsStore = create(
  persist(
    (set) => ({
      settings: {
        defaultCity: "kigali",
        myLocation: false,

        temp_Unit: "c",
        pres_Unit: "mb",
        wind_Unit: "kph",
        precip_Unit: "mm",

        weather_Alerts: false,
      },

      updateSettings: (partial) =>
        set((state) => ({
          settings: { ...state.settings, ...partial },
        })),
    }),
    {
      name: "nivra-settings",
    }
  )
);

export default useSettingsStore;
