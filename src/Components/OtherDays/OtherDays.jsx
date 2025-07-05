import React from "react";
import useDaysWeather from "../../Data/useDaysWeatherData";

const OtherDays = () => {
  const { isLoading, error, forecastdays } = useDaysWeather("Kigali");

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>Failed to load data</p>;

  return (
    <div className="flex scrollbar-hide whitespace-nowrap overflow-x-auto gap-x-1 md:gap-2 px-1">
      {forecastdays.map((item, idx) => {
        const dateObj = new Date(item.date);
        const dayName = dateObj.toLocaleDateString("en-US", {
          weekday: "short",
        });
        const monthDay = dateObj.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        });

        return (
          <div
            key={idx}
            className="glass-cards mb-2 px-3 py-2 flex flex-col items-center min-w-[110px]"
          >
            <img
              src={`https:${item.day.condition.icon}`}
              alt={item.day.condition.text}
              className="weather m-auto w-16 h-16"
            />
            <div className="font-bold text-3xl text-[#000] relative z-10">
              {Math.round(item.day.avgtemp_c)}°
            </div>
            <div className="text-sm text-[#333] relative z-10">{monthDay}</div>
            <div className="font-bold text-sm text-[#444] relative z-10">
              {dayName}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OtherDays;
