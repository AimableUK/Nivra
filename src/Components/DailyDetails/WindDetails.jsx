const WindDetails = ({ hourly = [] }) => {
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
            {/* Wind speed (kph) */}
            <div className="text-sm text-[#444] font-bold">
              {h.wind_kph != null ? `${h.wind_kph} km/h` : "—"}
            </div>

            {/* Weather icon */}
            <img
              src={`https:${h.condition.icon}`}
              alt={h.condition?.text ?? "wind"}
              className="weather m-auto"
            />

            {/* Time label */}
            <div className="text-sm text-[#444] font-bold">{hourLabel}</div>
          </div>
        );
      })}
    </div>
  );
};

export default WindDetails;
