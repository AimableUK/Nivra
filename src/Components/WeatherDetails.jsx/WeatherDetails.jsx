import temp from "../../assets/temp.png";

const WeatherDetails = ({ dailyData, location }) => {
  let dayName = "";
  let monthDay = "";

  if (dailyData?.date) {
    const today = new Date(dailyData.date);
    dayName = today.toLocaleDateString("en-US", { weekday: "long" });
    monthDay = today.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  } else {
    const today = new Date();
    dayName = today.toLocaleDateString("en-US", { weekday: "long" });
    monthDay = today.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div className="main flex md:flex-row justify-between gap-10 mb-3 p-4 md:px-20 lg:px-10">
      {/* weather icon */}
      <div className="flex flex-col justify-between">
        <img
          src={`https:${dailyData?.condition?.icon}`}
          alt={dailyData?.condition?.text}
          className="size-24 sm:size-36 md:size-40"
        />
        <div className="flex-row items-center hidden md:flex">
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
            {location?.name + ", " + location?.country}
          </p>
        </div>
      </div>

      {/* temperature and metrics */}
      <div className="clima flex flex-col text-start md:text-end justify-between">
        <div className="flex flex-col">
          <div className="flex flex-row self-end items-center">
            <img
              src={temp}
              alt="Temperature"
              className="hidden md:block size-16"
            />
            <p className="text-2xl md:text-3xl font-bold text-[#333]">
              {dailyData?.temp_c ?? dailyData?.avgtemp_c}&#176;C
            </p>
          </div>
          <div className="Clima text-end">
            <p className="text-[12px] md:font-semibold text-[#2d2d2d]">
              {dailyData?.condition?.text}
            </p>
            <p className="text-[13px] md:font-semibold text-[#2d2d2d]">
              Feels like:&nbsp;
              <strong>{dailyData?.feelslike_c ?? "—"}&#176;C</strong>
            </p>
            <p className="text-[13px] md:font-semibold text-[#2d2d2d]">
              Pressure: <strong>{dailyData?.pressure_mb ?? "—"} mb</strong>
            </p>
            <p className="text-[13px] md:font-semibold text-[#2d2d2d]">
              Humidity: <strong>{dailyData?.humidity}%</strong>
            </p>
            <p className="text-[13px] md:font-semibold text-[#2d2d2d]">
              Precipitation: <strong>{dailyData?.precip_mm} mm</strong>
            </p>
            <p className="text-[13px] md:font-semibold text-[#2d2d2d]">
              Wind: <strong>{dailyData?.wind_kph} kph</strong>
            </p>
            <p className="text-[11px] md:text-sm lg:text-xl font-semibold items-end text-end text-[#2d2d2d] mt-1 md:mt-0">
              {dayName}, {monthDay}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
