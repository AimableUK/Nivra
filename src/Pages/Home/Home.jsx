import React from "react";
import cloudyday3 from "../../weatherCondition/animated/cloudy-day-3.svg";

const Home = () => {
  return (
    <div className="flex flex-col p-8 w-full items-center">
      {/* search */}
      <div className="flex flex-row items-center justify-between mb-3">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Location Search"
            className="glass-card relative rounded-2xl px-5 py-1 min-w-80 outline-none pr-10 border-2 focus:border-[#4ade80] shadow-2xl"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-6 absolute right-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
        <div className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
            />
          </svg>
        </div>
      </div>
      {/* weather */}
      <div className="flex flex-col md:flex-row justify-between gap-10 items-end mb-10">
        {/* location */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-row">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
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
            <p className="text-xl font-semibold">kigali, Rwanda</p>
          </div>

          <div>
            <p className="text-3xl font-bold">January 8</p>
            <p className="text-2xl font-bold">Sunday</p>
          </div>
        </div>
        {/* weather condition */}
        <div>
          <img src={cloudyday3} alt="cloudyday3" className="size-64" />
        </div>
        {/* Details */}
        <div className="">
          <p className="">
            Pressure, mm <span className="font-bold">764</span>
          </p>
          <p className="">
            Humidity, % <span className="font-bold">69</span>
          </p>
          <p className="">
            Probabilty of Precipition, %<span className="font-bold">5</span>
          </p>
          <p className="">Wind, m/s 2.1</p>
        </div>
      </div>
      {/* next days */}
      <div className="flex flex-row">
        <div class="glass-cards mx-1">
          <img src={cloudyday3} alt="cloudyday3" className="weather m-auto" />
          <div class="font-bold text-3xl text-[#000] relative z-10">-1°</div>
          <div class="text-sm text-[#333] relative z-10">January 9</div>
          <div className="font-bold text-sm text-[#444] relative z-10">Mon</div>
        </div>
        <div class="glass-cards mx-1">
          <img src={cloudyday3} alt="cloudyday3" className="weather m-auto" />
          <div class="font-bold text-3xl text-[#000] relative z-10">-1°</div>
          <div class="text-sm text-[#333] relative z-10">January 9</div>
          <div className="font-bold text-sm text-[#444] relative z-10">Tue</div>
        </div>
        <div class="glass-cards mx-1">
          <img src={cloudyday3} alt="cloudyday3" className="weather m-auto" />
          <div class="font-bold text-3xl text-[#000] relative z-10">-1°</div>
          <div class="text-sm text-[#333] relative z-10">January 9</div>
          <div className="font-bold text-sm text-[#444] relative z-10">Wed</div>
        </div>
        <div class="glass-cards mx-1">
          <img src={cloudyday3} alt="cloudyday3" className="weather m-auto" />
          <div class="font-bold text-3xl text-[#000] relative z-10">-1°</div>
          <div class="text-sm text-[#333] relative z-10">January 9</div>
          <div className="font-bold text-sm text-[#444] relative z-10">Thurs</div>
        </div>
        <div class="glass-cards mx-1">
          <img src={cloudyday3} alt="cloudyday3" className="weather m-auto" />
          <div class="font-bold text-3xl text-[#000] relative z-10">-1°</div>
          <div class="text-sm text-[#333] relative z-10">January 9</div>
          <div className="font-bold text-sm text-[#444] relative z-10">Fri</div>
        </div>
        <div class="glass-cards mx-1">
          <img src={cloudyday3} alt="cloudyday3" className="weather m-auto" />
          <div class="font-bold text-3xl text-[#000] relative z-10">-1°</div>
          <div class="text-sm text-[#333] relative z-10">January 9</div>
          <div className="font-bold text-sm text-[#444] relative z-10">Sat</div>
        </div>
        <div class="glass-cards mx-1">
          <img src={cloudyday3} alt="cloudyday3" className="weather m-auto" />
          <div class="font-bold text-3xl text-[#000] relative z-10">-1°</div>
          <div class="text-sm text-[#333] relative z-10">January 9</div>
          <div className="font-bold text-sm text-[#444] relative z-10">Sun</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
