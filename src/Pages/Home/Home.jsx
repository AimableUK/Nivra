import React, { useEffect, useState } from "react";
import nivraLogo from "../../assets/Nivra.png";
import { Link } from "react-router-dom";
import useWeatherDetailStore from "../../Store/useWeatherDetailStore";
import TemperatureDetails from "../../Components/DailyDetails/TemperatureDetails";
import PrecipitationDetails from "../../Components/DailyDetails/PrecipitationDetails";
import WindDetails from "../../Components/DailyDetails/WindDetails";
import OtherDays from "../../Components/OtherDays/OtherDays";
import useWeather from "../../Data/useWeatherData";
import WeatherDetails from "../../Components/WeatherDetails.jsx/WeatherDetails";

const Home = () => {
  const [menu, setMenu] = useState(false);
  const [menuItemClick, setMenuItemClick] = useState("");
  const [showTips, setShowTips] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const filterDetail = useWeatherDetailStore((state) => state.filterDetail);
  const setFilterDetail = useWeatherDetailStore(
    (state) => state.setFilterDetail
  );

  const { location, hourly24, current, isLoading, error } =
    useWeather("kigali");

  const [dailyData, setDailyData] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);

  const todayDateStr = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(todayDateStr);

  useEffect(() => {
    if (current && hourly24.length) {
      setDailyData(current);
      setHourlyData(hourly24);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  if (isLoading || !dailyData) return <p>Loading…</p>;
  if (error) return <p>Failed to load weather.</p>;

  const onSelectDay = (dayData) => {
    const d = dayData.day;
    setDailyData({
      temp_c: d.avgtemp_c,
      feelslike_c: d.avgtemp_c,
      pressure_mb: d.pressure_mb ?? "—",
      humidity: d.avghumidity,
      precip_mm: d.totalprecip_mm,
      wind_kph: d.maxwind_kph,
      condition: d.condition,
      date: dayData.date,
    });
    setHourlyData(dayData.hour);
    setSelectedDate(dayData.date);
  };

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
      <WeatherDetails dailyData={dailyData} location={location} />

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
          <TemperatureDetails hourly={hourlyData} />
        )}
        {filterDetail === "precipitation" && (
          <PrecipitationDetails hourly={hourlyData} />
        )}
        {filterDetail === "wind" && <WindDetails hourly={hourlyData} />}
      </div>

      {/* next days */}
      <div className="other mb-3 flex flex-col py-4 px-3">
        <OtherDays selectedDate={selectedDate} onSelectDay={onSelectDay} />
      </div>
    </div>
  );
};

export default Home;
