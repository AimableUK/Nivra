import React, { useEffect, useState } from "react";
import nivraLogo from "../../assets/Nivra.png";
import { Link } from "react-router-dom";
import useWeatherDetailStore from "../../Store/useWeatherDetailStore";
import TemperatureDetails from "../../Components/DailyDetails/TemperatureDetails";
import PrecipitationDetails from "../../Components/DailyDetails/PrecipitationDetails";
import WindDetails from "../../Components/DailyDetails/WindDetails";
import OtherDays from "../../Components/OtherDays/OtherDays";
import useWeather from "../../api/useWeatherData";
import WeatherDetails from "../../Components/WeatherDetails.jsx/WeatherDetails";
import getDailyTips from "../../utils/getDailyTips";
import SearchBar from "../../Components/SearchBar/SearchBar";
import useSettingsStore from "../../Store/useSettingsStore";

const Home = () => {
  const [menu, setMenu] = useState(false);
  const [menuItemClick, setMenuItemClick] = useState("");
  const [showTips, setShowTips] = useState(false);

  const filterDetail = useWeatherDetailStore((state) => state.filterDetail);
  const setFilterDetail = useWeatherDetailStore(
    (state) => state.setFilterDetail
  );

  const settings = useSettingsStore((s) => s.settings);
  const defaultLocation = settings.defaultCity || "kigali";

  const [searchLocation, setSearchLocation] = useState(defaultLocation);

  // ✅ Watch for changes in defaultCity and update searchLocation
  useEffect(() => {
    setSearchLocation(settings.defaultCity || "kigali");
  }, [settings.defaultCity]);

  const { location, hourly24, current, isLoading, error } =
    useWeather(searchLocation);

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

  useEffect(() => {
    document.title = `${searchLocation} ForeCast - Nivra`;
  });

  if (isLoading || !dailyData)
    return (
      <div className="absolute inset-0 flex justify-center items-center z-50">
        <span className="loader loading"></span>
      </div>
    );
  if (error)
    return (
      <div className="absolute inset-0 flex flex-col justify-center items-center z-50">
        <span className="loader error"></span>
        <p className="text-lg md:text-xl font-semibold text-slate-700">
          Error Loading Weather Data
        </p>
      </div>
    );

  const onSelectDay = (dayData) => {
    const d = dayData.day;
    const h = dayData.hour;

    setDailyData({
      temp_c: d.avgtemp_c,
      temp_f: d.avgtemp_f,
      feelslike_c: h.avgfeelslike_c,
      feelslike_f: h.avgfeelslike_f,
      pressure_mb: h.pressure_mb,
      pressure_in: h.pressure_in,
      humidity: d.avghumidity,
      precip_mm: d.totalprecip_mm,
      precip_in: d.totalprecip_in,
      wind_kph: d.maxwind_kph,
      wind_mph: d.maxwind_mph,
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

  const tips = getDailyTips(showTips, dailyData, location?.name);

  const handleSelect = (location) => setSearchLocation(location.name);

  return (
    <div className="relative flex flex-col py-4 px-3 md:px-14 lg:px-20 min-w-0">
      {/* Top NavBar */}
      <div className="flex flex-row items-center justify-between gap-2 w-full mb-1">
        <div className="relative flex items-center w-full">
          <Link to="/">
            <img src={nivraLogo} alt="" className="size-10" />
          </Link>
          <SearchBar onSelect={handleSelect} />
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
            ? "max-h-60 opacity-100 mb-3 mt-1"
            : "max-h-0 opacity-0 -mb-1"
        }`}
      >
        <h3 className="font-semibold text-sm mb-1">Your Personalized Tips:</h3>
        {tips.map((tip, index) => (
          <p key={index} className="text-sm text-[#232323] font-medium">
            {tip}
          </p>
        ))}
      </div>

      {/* weather */}
      <WeatherDetails
        dailyData={dailyData}
        location={location}
      />

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
        <OtherDays
          selectedDate={selectedDate}
          onSelectDay={onSelectDay}
          searchlocation={searchLocation}
        />
      </div>
    </div>
  );
};

export default Home;
