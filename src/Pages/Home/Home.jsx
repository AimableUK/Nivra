import React, { useState } from "react";
import cloudyday3 from "../../weatherCondition/animated/cloudy-day-3.svg";
import temp from "../../assets/temp.png";
import nivroLogo from "../../assets/Nivra.png";

const Home = () => {
  const [filterDetail, setFilterDetail] = useState("templature");
  const [menu, setMenu] = useState(false);
  const [menuItemClick, setMenuItemClick] = useState("");
  const [showTips, setShowTips] = useState(false);

  // Menu
  const displayMenu = () => setMenu((prev) => !prev);

  const menuItemfilter = (item) => {
    if (item === "tips") {
      setMenuItemClick("tips");
      setShowTips((prev) => !prev);
    } else {
      setMenuItemClick("about");
    }
  };

  // weather details
  const filterDetails = (detail) => {
    if (detail === "templature") {
      setFilterDetail("templature");
    } else if (detail === "precipitation") {
      setFilterDetail("precipitation");
    } else {
      setFilterDetail("wind");
    }
  };

  return (
    <div className="flex flex-col py-8 px-3 md:px-14 lg:px-20 min-w-0">
      {/* Top NavBar */}
      <div className="flex flex-row items-center justify-between gap-2 w-full mb-1">
        <div className="relative flex items-center w-full md:w-[50%]">
          <img src={nivroLogo} alt="" className="size-10" />
          <input
            type="text"
            placeholder="Location Search"
            className="search glass-card w-full rounded-2xl px-5 py-1 outline-none pr-10 border-2 focus:border-[#4ade80] shadow-2xl"
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

        <div className="mr-1 md:mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-8 p-1 cursor-pointer rounded-full border search active:scale-75 transition-all ease-in duration-150"
            onClick={displayMenu}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </div>

      {/* Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          menu ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        <div className="flex flex-col md:flex-row gap-1 menu px-2 py-1 w-full mb-2">
          <p
            className={`text-sm md:text-[17px] font-semibold ${
              menuItemClick === "tips" && "menuItem"
            } px-2 cursor-pointer transition-all duration-100 ease-in-out rounded-xl text-[#232323]`}
            onClick={() => menuItemfilter("tips")}
          >
            Daily Tips
          </p>
          <p
            className={`text-sm md:text-[17px] font-semibold ${
              menuItemClick === "about" && "menuItem"
            } px-2 cursor-pointer transition-all duration-100 ease-in-out rounded-xl text-[#232323]`}
            onClick={() => menuItemfilter("about")}
          >
            About
          </p>
        </div>
      </div>

      <div
        className={`menu overflow-hidden transition-all duration-300 p-2 px-4 ease-in-out ${
          showTips ? "max-h-40 opacity-100 mb-3 mt-1" : "max-h-0 opacity-0 -mb-1"
        }`}
      >
        <p className="text-sm text-[#232323] font-medium">
          🧥 It’s cold in Kigali today — consider wearing a warm jacket!
        </p>
        <p className="text-sm text-[#232323] font-medium">
          ☔ Light rain expected. Carry an umbrella just in case.
        </p>
      </div>

      {/* weather */}
      <div className="main flex md:flex-row justify-between gap-10 mb-3 p-4 md:px-20 lg:px-10">
        {/* weather condition */}
        <div>
          <img
            src={cloudyday3}
            alt="cloudyday3"
            className="size-40 md:size-64"
          />
          <div className="flex-row items-center hidden md:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-4 md:size-6"
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
            <p className="text-sm md:text-xl font-semibold text-start">
              kigali, Rwanda
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="clima flex flex-col text-start md:text-end justify-between">
          <div className="flex flex-col">
            <div className="flex flex-row items-center">
              <img
                src={temp}
                alt="Templature"
                className="hidden md:block size-20 md:size-24"
              />
              <p className="text-3xl md:text-4xl font-bold text-[#333]">
                -3&#176;
              </p>
            </div>
            <div className="Clima text-end">
              <p className="text-[13px] md:font-semibold text-[#232323] text-nowrap">
                Pressure:&nbsp;
                <span className="text-[13px] font-semibold md:font-bold">
                  764 mm
                </span>
              </p>
              <p className="text-[13px] md:font-semibold text-[#232323] text-nowrap">
                Humidity:&nbsp;
                <span className="font-semibold md:font-bold">69 %</span>
              </p>
              <p className="text-[13px] md:font-semibold text-[#232323] text-nowrap">
                Precipition:&nbsp;
                <span className="font-semibold md:font-bold">5%</span>
              </p>
              <p className="text-[13px] md:font-semibold text-[#232323] text-nowrap">
                Wind:&nbsp;
                <span className="font-semibold md:font-bold">2.1 m/s</span>
              </p>
            </div>
          </div>
          <p className="text-[12px] md:text-xl font-semibold items-end text-[#232323] mt-2 md:mt-0">
            January 8, <span>Sunday</span>
          </p>
          <div className="flex-row items-center flex md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-4 md:size-6"
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
            <p className="text-[12px]  md:text-xl font-semibold text-start text-[#232323] md:text-black">
              kigali, Rwanda
            </p>
          </div>
        </div>
      </div>

      {/* Overview */}
      <div className="main mb-3 flex flex-col py-4 px-3">
        <div className="flex flex-col  md:flex-row gap-1 dailyfilter px-2 py-1 w-full md:w-fit mb-2">
          <p
            className={`text-sm md:text-[17px] font-semibold ${
              filterDetail === "templature" && "dailyfilter"
            } px-2 cursor-pointer transition-all duration-100 ease-in-out rounded-xl text-[#232323]`}
            onClick={() => {
              filterDetails("templature");
            }}
          >
            Templature
          </p>
          <p
            className={`text-sm md:text-[17px] font-semibold ${
              filterDetail === "precipitation" && "dailyfilter"
            } px-2 cursor-pointer transition-all duration-100 ease-in-out rounded-xl text-[#232323]`}
            onClick={() => {
              filterDetails("precipitation");
            }}
          >
            Precipitation
          </p>
          <p
            className={`text-sm md:text-[17px] font-semibold ${
              filterDetail === "wind" && "dailyfilter"
            } px-2 cursor-pointer  transition-all duration-100 ease-in-out rounded-xl text-[#232323]`}
            onClick={() => {
              filterDetails("wind");
            }}
          >
            Wind
          </p>
        </div>

        {/* Templature */}
        {filterDetail === "templature" && (
          <div className="flex flex-row overflow-x-auto w-full">
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                Now
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="font-bold text-xl text-[#000] relative z-10">
                -1°
              </div>
            </div>
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                Now
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="font-bold text-xl text-[#000] relative z-10">
                -1°
              </div>
            </div>
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                Now
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="font-bold text-xl text-[#000] relative z-10">
                -1°
              </div>
            </div>
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                Now
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="font-bold text-xl text-[#000] relative z-10">
                -1°
              </div>
            </div>
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                Now
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="font-bold text-xl text-[#000] relative z-10">
                -1°
              </div>
            </div>
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                Now
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="font-bold text-xl text-[#000] relative z-10">
                -1°
              </div>
            </div>
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                Now
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="font-bold text-xl text-[#000] relative z-10">
                -1°
              </div>
            </div>
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                Now
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="font-bold text-xl text-[#000] relative z-10">
                -1°
              </div>
            </div>
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                Now
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="font-bold text-xl text-[#000] relative z-10">
                -1°
              </div>
            </div>
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                Now
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="font-bold text-xl text-[#000] relative z-10">
                -1°
              </div>
            </div>
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                Now
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="font-bold text-xl text-[#000] relative z-10">
                -1°
              </div>
            </div>
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                Now
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="font-bold text-xl text-[#000] relative z-10">
                -1°
              </div>
            </div>
          </div>
        )}

        {/* Precipitation */}
        {filterDetail === "precipitation" && (
          <div className="flex flex-row overflow-x-auto w-full">
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                &lt;0.25
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="font-bold text-sm text-[#000] relative z-10">
                10%
              </div>
              <div className="text-sm text-[#444] relative z-10 font-bold">
                16:00
              </div>
            </div>
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                &lt;0.25
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="font-bold text-sm text-[#000] relative z-10">
                10%
              </div>
              <div className="text-sm text-[#444] relative z-10 font-bold">
                16:00
              </div>
            </div>
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                &lt;0.25
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="font-bold text-sm text-[#000] relative z-10">
                10%
              </div>
              <div className="text-sm text-[#444] relative z-10 font-bold">
                16:00
              </div>
            </div>
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                &lt;0.25
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="font-bold text-sm text-[#000] relative z-10">
                10%
              </div>
              <div className="text-sm text-[#444] relative z-10 font-bold">
                16:00
              </div>
            </div>
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                &lt;0.25
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="font-bold text-sm text-[#000] relative z-10">
                10%
              </div>
              <div className="text-sm text-[#444] relative z-10 font-bold">
                16:00
              </div>
            </div>
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                &lt;0.25
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="font-bold text-sm text-[#000] relative z-10">
                10%
              </div>
              <div className="text-sm text-[#444] relative z-10 font-bold">
                16:00
              </div>
            </div>
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                &lt;0.25
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="font-bold text-sm text-[#000] relative z-10">
                10%
              </div>
              <div className="text-sm text-[#444] relative z-10 font-bold">
                16:00
              </div>
            </div>
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                &lt;0.25
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="font-bold text-sm text-[#000] relative z-10">
                10%
              </div>
              <div className="text-sm text-[#444] relative z-10 font-bold">
                16:00
              </div>
            </div>
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                &lt;0.25
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="font-bold text-sm text-[#000] relative z-10">
                10%
              </div>
              <div className="text-sm text-[#444] relative z-10 font-bold">
                16:00
              </div>
            </div>
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                &lt;0.25
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="font-bold text-sm text-[#000] relative z-10">
                10%
              </div>
              <div className="text-sm text-[#444] relative z-10 font-bold">
                16:00
              </div>
            </div>
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                &lt;0.25
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="font-bold text-sm text-[#000] relative z-10">
                10%
              </div>
              <div className="text-sm text-[#444] relative z-10 font-bold">
                16:00
              </div>
            </div>
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                &lt;0.25
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="font-bold text-sm text-[#000] relative z-10">
                10%
              </div>
              <div className="text-sm text-[#444] relative z-10 font-bold">
                16:00
              </div>
            </div>
          </div>
        )}

        {/* Wind */}
        {filterDetail === "wind" && (
          <div className="flex flex-row overflow-x-auto w-full">
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                3
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="text-sm text-[#444] relative z-10 font-bold">
                16:00
              </div>
            </div>
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                3
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="text-sm text-[#444] relative z-10 font-bold">
                16:00
              </div>
            </div>
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                3
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="text-sm text-[#444] relative z-10 font-bold">
                16:00
              </div>
            </div>
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                3
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="text-sm text-[#444] relative z-10 font-bold">
                16:00
              </div>
            </div>
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                3
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="text-sm text-[#444] relative z-10 font-bold">
                16:00
              </div>
            </div>
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                3
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="text-sm text-[#444] relative z-10 font-bold">
                16:00
              </div>
            </div>
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                3
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="text-sm text-[#444] relative z-10 font-bold">
                16:00
              </div>
            </div>
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                3
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="text-sm text-[#444] relative z-10 font-bold">
                16:00
              </div>
            </div>
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                3
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="text-sm text-[#444] relative z-10 font-bold">
                16:00
              </div>
            </div>
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                3
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="text-sm text-[#444] relative z-10 font-bold">
                16:00
              </div>
            </div>
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                3
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="text-sm text-[#444] relative z-10 font-bold">
                16:00
              </div>
            </div>
            <div className="daily-cards mx-1 mb-2">
              <div className="text-sm text-[#444] relative z-10 font-bold">
                3
              </div>
              <img
                src={cloudyday3}
                alt="cloudyday3"
                className="weather m-auto"
              />
              <div className="text-sm text-[#444] relative z-10 font-bold">
                16:00
              </div>
            </div>
          </div>
        )}
      </div>

      {/* next days */}
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
    </div>
  );
};

export default Home;
