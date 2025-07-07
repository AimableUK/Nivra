const PrecipitationDetails = ({ hourly = [] }) => {
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
        return (
          <div key={h.time} className="daily-cards mx-1 mb-2 inline-block">
            {/* Precipitation in mm (fallback <0.25) */}
            <div className="text-sm text-[#444] font-bold">
              {h.precip_mm != null ? `${h.precip_mm} mm` : "<0.25 mm"}
            </div>

            {/* Weather icon */}
            <img
              src={`https:${h.condition.icon}`}
              alt={h.condition?.text ?? "precip"}
              className="weather m-auto"
            />

            {/* Chance of rain */}
            <div className="font-bold text-sm text-[#202020]">
              {h.chance_of_rain != null ? `${h.chance_of_rain}%` : "-"}
            </div>

            {/* Time label */}
            <div className="text-sm text-[#444] font-bold">
              {getHourLabel(h)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PrecipitationDetails;
