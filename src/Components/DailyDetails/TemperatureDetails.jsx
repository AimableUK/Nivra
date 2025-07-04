export default function TemperatureDetails({ hourly }) {
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
            <div className="text-sm text-[#444] font-bold">{h.temp_c}°</div>
            <img
              src={`https:${h.condition.icon}`}
              alt={h.condition.text}
              className="weather m-auto"
            />
            <div className="font-bold text-xl text-[#000]">{h.temp_c}°</div>
            <div className="text-sm text-[#444] font-bold">{hourLabel}</div>
          </div>
        );
      })}
    </div>
  );
}
