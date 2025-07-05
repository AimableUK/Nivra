import React, { useState } from "react";
import temp from "../../assets/temp.png";
import nivraLogo from "../../assets/Nivra.png";
import { Link } from "react-router-dom";
import useWeatherDetailStore from "../../Store/useWeatherDetailStore";
import TemperatureDetails from "../../Components/DailyDetails/TemperatureDetails";
import PrecipitationDetails from "../../Components/DailyDetails/PrecipitationDetails";
import WindDetails from "../../Components/DailyDetails/WindDetails";
import OtherDays from "../../Components/OtherDays/OtherDays";
import useWeather from "../../Data/useWeatherData";
import DateHeader from "../../Components/DateHeader/DateHeader";

const Home = () => {
  const [menu, setMenu] = useState(false);
  const [menuItemClick, setMenuItemClick] = useState("");
  const [showTips, setShowTips] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const filterDetail = useWeatherDetailStore((state) => state.filterDetail);
  const setFilterDetail = useWeatherDetailStore(
    (state) => state.setFilterDetail
  );

  const { location, hourly24, isLoading, error } = useWeather("london");

  if (isLoading) return <p>Loading…</p>;
  if (error) return <p>Failed to load weather.</p>;

  const currentHour = new Date().getHours();
  const dailyData = hourly24?.[currentHour];

  // Menu
  const displayMenu = () => setMenu((prev) => !prev);

  const menuItemfilter = (item) => {
    if (item === "tips") {
      setMenuItemClick("tips");
      setShowTips((prev) => !prev);
    } else if (item === "favorites") {
      setMenuItemClick("favorites");
      setShowFavorites((prev) => !prev);
    } else if (item === "about") {
      setMenuItemClick("about");
      setMenu("false");
    } else if (item === "settings") {
      setMenuItemClick("settings");
      setMenu("false");
    } else {
      setMenuItemClick(null);
    }
  };

  // weather details
  const handleFilter = (detail) => setFilterDetail(detail);

  return (
    <div className="flex flex-col py-4 px-3 md:px-14 lg:px-20 min-w-0">
      {/* Top NavBar */}
      <div className="flex flex-row items-center justify-between gap-2 w-full mb-1">
        <div className="relative flex items-center w-full md:w-[50%]">
          <Link to="/">
            <img src={nivraLogo} alt="" className="size-10" />
          </Link>
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
              menuItemClick === "favorites" && "menuItem"
            } px-2 cursor-pointer transition-all duration-100 ease-in-out rounded-xl text-[#232323]`}
            onClick={() => menuItemfilter("favorites")}
          >
            Favorites
          </p>
          <Link to="/aboutus">
            <p
              className={`text-sm md:text-[17px] font-semibold ${
                menuItemClick === "about" && "menuItem"
              } px-2 cursor-pointer transition-all duration-100 ease-in-out rounded-xl text-[#232323]`}
              onClick={() => menuItemfilter("about")}
            >
              About Us
            </p>
          </Link>
          <Link to="/settings">
            <p
              className={`text-sm md:text-[17px] font-semibold ${
                menuItemClick === "settings" && "menuItem"
              } px-2 cursor-pointer transition-all duration-100 ease-in-out rounded-xl text-[#232323]`}
              onClick={() => menuItemfilter("settings")}
            >
              Settings
            </p>
          </Link>
        </div>
      </div>

      {/* Daily tips */}
      <div
        className={`menu overflow-hidden transition-all duration-300 p-2 px-4 ease-in-out ${
          showTips
            ? "max-h-40 opacity-100 mb-3 mt-1"
            : "max-h-0 opacity-0 -mb-1"
        }`}
      >
        <h3 className="font-semibold text-sm">Your Personalized Tips:</h3>
        <p className="text-sm text-[#232323] font-medium">
          🧥 It’s cold in Kigali today — consider wearing a warm jacket!
        </p>
        <p className="text-sm text-[#232323] font-medium">
          ☔ Light rain expected. Carry an umbrella just in case.
        </p>
      </div>

      {/* Favorites */}
      <div
        className={`menu overflow-hidden transition-all duration-300 p-2 px-4 ease-in-out ${
          showFavorites
            ? "max-h-40 opacity-100 mb-3 -mt-1"
            : "max-h-0 opacity-0 -mb-4 "
        }`}
      >
        <h3 className="font-semibold text-sm">Your Favorites:</h3>
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
        <div className="flex flex-col justify-between">
          <img
            src={`https:${dailyData.condition.icon}`}
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

        {/* Details */}
        <div className="clima flex flex-col text-start md:text-end justify-between">
          <div className="flex flex-col">
            <div className="flex flex-row self-end items-center">
              <img
                src={temp}
                alt="Templature"
                className="hidden md:block size-16 md:size-16"
              />
              <p className="text-2xl md:text-3xl font-bold text-[#333]">
                {dailyData?.temp_c}&#176;C
              </p>
            </div>
            <div className="Clima text-end">
              <p className="text-[12px] md:font-semibold text-[#232323] text-nowrap">
                {dailyData?.condition.text}
              </p>
              <p className="text-[13px] md:font-semibold text-[#232323] text-nowrap">
                Feels like:&nbsp;
                <span className="text-[13px] font-semibold md:font-bold">
                  {dailyData?.feelslike_c} &#176;C
                </span>
              </p>
              <p className="text-[13px] md:font-semibold text-[#232323] text-nowrap">
                Pressure:&nbsp;
                <span className="text-[13px] font-semibold md:font-bold">
                  {dailyData?.precip_mm} mm
                </span>
              </p>
              <p className="text-[13px] md:font-semibold text-[#232323] text-nowrap">
                Humidity:&nbsp;
                <span className="font-semibold md:font-bold">
                  {dailyData?.humidity}%
                </span>
              </p>
              <p className="text-[13px] md:font-semibold text-[#232323] text-nowrap">
                Precipition:&nbsp;
                <span className="font-semibold md:font-bold">
                  {dailyData?.precip_mm} mm
                </span>
              </p>
              <p className="text-[13px] md:font-semibold text-[#232323] text-nowrap">
                Wind:&nbsp;
                <span className="font-semibold md:font-bold">
                  {dailyData?.wind_kph} kph
                </span>
              </p>
            </div>
          </div>
          <DateHeader />
          <div className="flex flex-row items-center space-x-1 md:hidden text-end">
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
            <p className="text-[11px] md:text-xl font-semibold text-[#232323] md:text-black whitespace-nowrap">
              {location?.name + ", " + location?.country}
            </p>
          </div>
        </div>
      </div>

      {/* Overview */}
      <div className="main mb-3 flex flex-col py-4 px-3">
        {/* Filter Details */}
        <div className="flex flex-col md:flex-row gap-1 dailyfilter px-2 py-1 w-full md:w-fit mb-2">
          {["temperature", "precipitation", "wind"].map((detail) => (
            <p
              key={detail}
              className={`text-sm md:text-[17px] font-semibold ${
                filterDetail === detail ? "dailyfilter" : ""
              } px-2 cursor-pointer transition-all duration-100 ease-in-out rounded-xl text-[#232323]`}
              onClick={() => handleFilter(detail)}
            >
              {detail.charAt(0).toUpperCase() + detail.slice(1)}
            </p>
          ))}
        </div>

        {filterDetail === "temperature" && (
          <TemperatureDetails hourly={hourly24} />
        )}
        {filterDetail === "precipitation" && (
          <PrecipitationDetails hourly={hourly24} />
        )}
        {filterDetail === "wind" && <WindDetails hourly={hourly24} />}
      </div>

      {/* next days */}
      <div className="other mb-3 flex flex-col py-4 px-3">
        <OtherDays />
      </div>
    </div>
  );
};

export default Home;
