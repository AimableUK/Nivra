import { create } from "zustand";
import { persist } from "zustand/middleware";

const defaultSettings = {
  defaultCity: null,
  myLocation: false,

  temp_Unit: "c",
  pres_Unit: "mb",
  wind_Unit: "kph",
  precip_Unit: "mm",

  weather_Alerts: false,
};

const useSettingsStore = create(
  persist(
    (set) => ({
      settings: defaultSettings,

      updateSettings: (partial) =>
        set((state) => ({
          settings: { ...state.settings, ...partial },
        })),

      resetSiteData: () =>
        set(() => ({
          settings: { ...defaultSettings },
        })),
    }),
    {
      name: "nivra-settings",
    }
  )
);

export default useSettingsStore;
