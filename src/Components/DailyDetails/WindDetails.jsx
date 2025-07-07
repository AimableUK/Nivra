import React from "react";
import useSettingsStore from "../../Store/useSettingsStore";

const WindDetails = ({ hourly = [] }) => {
  const windUnit = useSettingsStore((state) => state.settings.wind_Unit);

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
      {hourly.map((h, idx) => {
        const windSpeed =
          windUnit === "mph" ? h.wind_mph ?? "-" : h.wind_kph ?? "-";

        return (
          <div key={h.time} className="daily-cards mx-1 mb-2 inline-block">
            <div className="text-sm text-[#444] font-bold">
              {windSpeed !== "-"
                ? `${windSpeed} ${windUnit === "mph" ? "mph" : "km/h"}`
                : "—"}
            </div>

            <img
              src={`https:${h.condition.icon}`}
              alt={h.condition?.text ?? "wind"}
              className="weather m-auto"
            />

            <div className="text-sm text-[#444] font-bold">
              {getHourLabel(h)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WindDetails;
