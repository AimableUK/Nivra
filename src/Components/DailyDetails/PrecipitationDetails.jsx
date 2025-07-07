import React from "react";
import useSettingsStore from "../../Store/useSettingsStore";

const PrecipitationDetails = ({ hourly = [] }) => {
  const precipUnit = useSettingsStore((state) => state.settings.precip_Unit);

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

  const mmToInches = (mm) => (mm / 25.4).toFixed(2);

  return (
    <div className="flex overflow-x-auto scrollbar-hide whitespace-nowrap w-full">
      {hourly.map((h) => {
        // Pick precipitation value based on unit
        const precipValue =
          precipUnit === "mm"
            ? h.precip_mm
            : h.precip_mm != null
            ? mmToInches(h.precip_mm)
            : null;

        const precipText =
          precipValue != null
            ? `${precipValue} ${precipUnit}`
            : `<0.25 ${precipUnit}`;

        return (
          <div key={h.time} className="daily-cards mx-1 mb-2 inline-block">
            <div className="text-sm text-[#444] font-bold">{precipText}</div>

            <img
              src={`https:${h.condition.icon}`}
              alt={h.condition?.text ?? "precip"}
              className="weather m-auto"
            />

            <div className="font-bold text-sm text-[#202020]">
              {h.chance_of_rain != null ? `${h.chance_of_rain}%` : "-"}
            </div>

            <div className="text-sm text-[#444] font-bold">{getHourLabel(h)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default PrecipitationDetails;
