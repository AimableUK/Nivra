import React from "react";
import tempIcon from "../../assets/temp.png";
import useSettingsStore from "../../Store/useSettingsStore";

const WeatherDetails = ({
  dailyData,
  location,
  selectedDate,
  handleAddFavorite
}) => {
  const settings = useSettingsStore((state) => state.settings);

  let dayName = "";
  let monthDay = "";
  const date = dailyData?.date ? new Date(dailyData.date) : new Date();
  dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  monthDay = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const tempValue =
    settings.temp_Unit === "c"
      ? dailyData?.temp_c ?? dailyData?.avgtemp_c
      : dailyData?.temp_f ?? dailyData?.avgtemp_f;

  const feelsLikeValue =
    settings.temp_Unit === "c"
      ? dailyData?.feelslike_c
      : dailyData?.feelslike_f;

  const pressureValue =
    settings.pres_Unit === "mb"
      ? dailyData?.pressure_mb
      : dailyData?.pressure_in;

  const precipValue =
    settings.precip_Unit === "mm" ? dailyData?.precip_mm : dailyData?.precip_in;

  const windValue =
    settings.wind_Unit === "kph" ? dailyData?.wind_kph : dailyData?.wind_mph;

  // Symbols for display
  const tempSymbol = settings.temp_Unit === "c" ? "C" : "F";
  const pressureSymbol = settings.pres_Unit === "mb" ? "mb" : "in";
  const precipSymbol = settings.precip_Unit === "mm" ? "mm" : "in";
  const windSymbol = settings.wind_Unit === "kph" ? "kph" : "mph";

  return (
    <div className="main flex md:flex-row justify-between gap-10 mb-3 p-4 md:px-20 lg:px-10">
      {/* Weather icon */}
      <div className="flex flex-col justify-between">
        <img
          src={`https:${dailyData?.condition?.icon}`}
          alt={dailyData?.condition?.text}
          className="size-24 sm:size-36 md:size-40"
        />
        <div className="flex-row items-center hidden md:flex">
          <div className="items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-5 md:size-6 text-[#2d2d2d] cursor-pointer self-start items"
              onClick={() => handleAddFavorite(dailyData)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
            </svg>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-3 md:size-6 text-[#333]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          <p className="text-sm md:text-lg lg:text-xl font-semibold text-start text-[#333]">
            {location?.name}, {location?.country}
          </p>
        </div>
      </div>
      {/* Temperature and metrics */}
      <div className="clima flex flex-col text-start md:text-end justify-between">
        <div className="flex flex-col">
          <div className="flex flex-row self-end items-center">
            <img
              src={tempIcon}
              alt="Temperature"
              className="hidden md:block size-16"
            />
            <p className="text-2xl md:text-3xl font-bold text-[#333]">
              {tempValue} &#176;{tempSymbol}
            </p>
          </div>
          <div className="Clima text-end">
            <p className="text-[12px] md:font-semibold text-[#2d2d2d]">
              {dailyData?.condition?.text}
            </p>
            {feelsLikeValue && (
              <p className="text-[13px] md:font-semibold text-[#2d2d2d]">
                Feels like:&nbsp;
                <strong>
                  {feelsLikeValue}&#176;{tempSymbol}
                </strong>
              </p>
            )}

            {pressureValue && (
              <p className="text-[13px] md:font-semibold text-[#2d2d2d]">
                Pressure:&nbsp;
                <strong>
                  {pressureValue} {pressureSymbol}
                </strong>
              </p>
            )}
            <p className="text-[13px] md:font-semibold text-[#2d2d2d]">
              Humidity: <strong>{dailyData?.humidity ?? "—"}%</strong>
            </p>
            <p className="text-[13px] md:font-semibold text-[#2d2d2d]">
              Precipitation:&nbsp;
              <strong>
                {precipValue ?? "—"} {precipSymbol}
              </strong>
            </p>
            <p className="text-[13px] md:font-semibold text-[#2d2d2d]">
              Wind:&nbsp;
              <strong>
                {windValue ?? "—"} {windSymbol}
              </strong>
            </p>
            <p className="text-[11px] md:text-sm lg:text-xl font-semibold items-end text-end text-[#2d2d2d] mt-1 md:mt-0">
              {dayName}, {monthDay}
            </p>
            <div className="flex-row items-center md:hidden flex justify-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-5 md:size-7 text-[#2d2d2d] cursor-pointer self-start items"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-4 text-[#333]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
              <p className="text-sm md:text-lg lg:text-xl font-semibold text-start text-[#333]">
                {location?.name}, {location?.country}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
