import React from "react";
import useSettingsStore from "../../Store/useSettingsStore";

export default function TemperatureDetails({ hourly = [] }) {
  const tempUnit = useSettingsStore((state) => state.settings.temp_Unit);

  if (!hourly.length) return null;

  function getHourLabel(h) {
    const currentDateTime = new Date();
    const currentDateStr = currentDateTime.toISOString().split("T")[0];
    const currentHour = currentDateTime.getHours();

    const hourTime = new Date(h.time);
    const hourDateStr = h.time.split(" ")[0];
    const hourHour = hourTime.getHours();

    if (hourDateStr === currentDateStr && hourHour === currentHour) {
      return "Now";
    }

    const hr12 = hourHour % 12 || 12;
    const ampm = hourHour < 12 ? "AM" : "PM";
    return `${hr12} ${ampm}`;
  }

  return (
    <div className="flex overflow-x-auto scrollbar-hide whitespace-nowrap w-full">
      {hourly.map((h) => {
        const tempValue = tempUnit === "c" ? h.temp_c ?? "-" : h.temp_f ?? "-";

        return (
          <div key={h.time} className="daily-cards mx-1 mb-2 inline-block">
            <div className="text-sm text-[#444] font-bold">
              {tempValue !== "-"
                ? `${tempValue}°${tempUnit.toUpperCase()}`
                : "-"}
            </div>

            <img
              src={`https:${h.condition.icon}`}
              alt={h.condition?.text ?? "temperature"}
              className="weather m-auto"
            />

            <div className="font-bold text-xl text-[#202020]">
              {tempValue !== "-" ? `${tempValue}°` : "-"}
            </div>

            <div className="text-sm text-[#444] font-bold">
              {getHourLabel(h)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
