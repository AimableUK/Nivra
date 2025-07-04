import cloudyday3 from "../../weatherCondition/static/cloudy-day-3.svg";

const PrecipitationDetails = () => {
  return (
    <div className="flex overflow-x-auto scrollbar-hide whitespace-nowrap w-full">
      {Array.from({ length: 24 }).map((_, hour) => (
        <div key={hour} className="daily-cards mx-1 mb-2 inline-block">
          <div className="text-sm text-[#444] font-bold">&lt;0.25</div>
          <img src={cloudyday3} alt="cloudy" className="weather m-auto" />
          <div className="font-bold text-sm text-[#000]">10%</div>
          <div className="text-sm text-[#444] font-bold">
            {hour === 0 ? "Now" : `${hour.toString().padStart(2, "0")}:00`}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PrecipitationDetails;
