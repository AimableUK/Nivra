import React from "react";
import useDaysWeather from "../../api/useDaysWeatherData";
import useSettingsStore from "../../Store/useSettingsStore";

const OtherDays = ({ onSelectDay, selectedDate, searchlocation }) => {
  const { isLoading, error, forecastdays } = useDaysWeather(searchlocation);
  const tempUnit = useSettingsStore((state) => state.settings.temp_Unit);

  if (isLoading)
    return (
      <div className="absolute inset-0 flex justify-center items-center z-50">
        <span className="loader loading"></span>
      </div>
    );
  if (error)
    return (
      <div className="absolute inset-0 flex flex-col justify-center items-center z-50">
        <span className="loader error"></span>
        <p className="text-lg md:text-xl font-semibold text-slate-700">
          Error Loading Weather Data
        </p>
      </div>
    );

  return (
    <div className="flex scrollbar-hide whitespace-nowrap overflow-x-auto gap-x-1 md:gap-2 px-1">
      {forecastdays.map((dayData) => {
        const dateObj = new Date(dayData.date);
        const dayName = dateObj.toLocaleDateString("en-US", {
          weekday: "short",
        });
        const monthDay = dateObj.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        });

        const isActive =
          selectedDate &&
          new Date(selectedDate).toDateString() ===
            new Date(dayData.date).toDateString();

        const temp =
          tempUnit === "f"
            ? Math.round(dayData.day.avgtemp_f)
            : Math.round(dayData.day.avgtemp_c);

        return (
          <div
            key={dayData.date}
            onClick={() => onSelectDay(dayData)}
            className={`glass-cards mb-2 px-3 py-2 mt-1 flex flex-col items-center min-w-[110px] cursor-pointer
              hover:scale-95 active:scale-90 transition-all duration-200 ease-in-out
              ${isActive ? "active" : ""}`}
          >
            <img
              src={`https:${dayData.day.condition.icon}`}
              alt={dayData.day.condition.text}
              className="weather m-auto w-16 h-16"
            />
            <div className="font-bold text-3xl text-[#202020]">
              {temp}&#176;
            </div>
            <div className="text-sm text-[#333]">{monthDay}</div>
            <div className="font-bold text-sm text-[#444]">{dayName}</div>
          </div>
        );
      })}
    </div>
  );
};

export default OtherDays;
