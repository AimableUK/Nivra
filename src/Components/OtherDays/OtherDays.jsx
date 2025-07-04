import React from "react";
import cloudyday3 from "../../weatherCondition/static/cloudy-day-3.svg";

const OtherDays = () => {
  return (
    <div className="flex md:flex-row flex-wrap md:justify-center gap-x-2 md:gap-4 px-1 md:px-2">
      {[
        { day: "Mon", date: "January 9" },
        { day: "Tue", date: "January 9" },
        { day: "Wed", date: "January 9" },
        { day: "Thurs", date: "January 9" },
        { day: "Fri", date: "January 9" },
        { day: "Sat", date: "January 9" },
        { day: "Sun", date: "January 9" },
      ].map((item, idx) => (
        <div
          key={idx}
          className="glass-cards mb-2 px-3 py-2 flex flex-col items-center min-w-[110px]"
        >
          <img
            src={cloudyday3}
            alt="cloudyday3"
            className="weather m-auto w-16 h-16"
          />
          <div className="font-bold text-3xl text-[#000] relative z-10">
            -1°
          </div>
          <div className="text-sm text-[#333] relative z-10">{item.date}</div>
          <div className="font-bold text-sm text-[#444] relative z-10">
            {item.day}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OtherDays;
