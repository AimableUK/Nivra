const PrecipitationDetails = ({ hourly = [] }) => {
  if (!hourly.length) return null;

  return (
    <div className="flex overflow-x-auto scrollbar-hide whitespace-nowrap w-full">
      {hourly.map((h, idx) => {
        const hourLabel =
          idx === 0
            ? "Now"
            : new Date(h.time).getHours().toString().padStart(2, "0") + ":00";

        return (
          <div key={h.time} className="daily-cards mx-1 mb-2 inline-block">
            {/* Precipitation in mm (fallback <0.25) */}
            <div className="text-sm text-[#444] font-bold">
              {h.precip_mm != null ? `${h.precip_mm} mm` : "<0.25 mm"}
            </div>

            {/* Weather icon */}
            <img
              src={`https:${h.condition.icon}`}
              alt={h.condition?.text ?? "precip"}
              className="weather m-auto"
            />

            {/* Chance of rain */}
            <div className="font-bold text-sm text-[#202020]">
              {h.chance_of_rain != null ? `${h.chance_of_rain}%` : "–"}
            </div>

            {/* Time label */}
            <div className="text-sm text-[#444] font-bold">{hourLabel}</div>
          </div>
        );
      })}
    </div>
  );
};

export default PrecipitationDetails;
