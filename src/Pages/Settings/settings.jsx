import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSettingsStore from "../../Store/useSettingsStore";

const SiteSettings = () => {
  const [resetSiteDataDialogOpen, setResetSiteDataDialogOpen] = useState(false);
  const [deleteDetails, setDeleteDetails] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");

  const [dataUpdateDisplay, setDataUpdateDisplay] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");

  const [showAddress, setShowAddress] = useState(false);
  const [viewPrecaution, setViewPrecaution] = useState(false);

  const settings = useSettingsStore((s) => s.settings);
  const updateSettings = useSettingsStore((s) => s.updateSettings);
  const resetSiteData = useSettingsStore((s) => s.resetSiteData);
  const clearWeatherData = useSettingsStore((s) => s.clearWeatherData);

  const [formData, setFormData] = useState(settings);

  const navigate = useNavigate();

  useEffect(() => setFormData(settings), [settings]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
      updateSettings(updated);
      return updated;
    });
    setTimeout(() => {
      setDataUpdateDisplay(true);
      setUpdateMessage("Data Updated Successfully");
    }, 500);

    setTimeout(() => {
      setDataUpdateDisplay(false);
      setUpdateMessage("");
    }, 3000);
  };

  //   delete dialog
  const resetSiteDataDialog = () => {
    setResetSiteDataDialogOpen((prev) => !prev);
  };

  //   delete button click
  const deleteData = () => {
    setDeleteDetails(true);
    setDeleteMessage("Data Erased Successfully!!");

    resetSiteData();
    localStorage.removeItem("nivra-settings");

    setTimeout(() => {
      setDeleteMessage("");
      navigate("/");
      onCancel();
    }, 100);
  };

  //   Closing delete dialog
  const onCancel = () => {
    setResetSiteDataDialogOpen(false);
  };

  const handleMyLocation = (e) => {
    const checked = e.target.checked;

    if (checked) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

          fetch(url)
            .then((res) => res.json())
            .then((data) => {
              const address = data.address;

              const city =
                address.city ||
                address.town ||
                address.village ||
                address.county ||
                address.state_district ||
                address.state;

              const country = address.country || "";

              if (city && country) {
                const locationName = `${city}, ${country}`;

                updateSettings({
                  defaultCity: locationName,
                  myLocation: true,
                  address: address,
                });
              } else {
                alert(
                  "We couldn't detect your city. Please try again or search manually."
                );
              }
            })
            .catch(() => {
              console.log("Error getting your Current Location");
            });
        },
        () => alert("Please allow location access.")
      );
    } else {
      updateSettings({
        myLocation: false,
        defaultCity: "kigali",
      });
      clearWeatherData();
    }
  };

  return (
    <div className="relative min-h-screen pb-2">
      {/* Setting Update  */}
      <section
        className={`z-50 fixed bg-[#33a7ce] p-2 px-3 rounded-md right-4 top-4 text-white font-semibold shadow-lg
          transition-all duration-300 ease-in-out
          ${
            dataUpdateDisplay
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }
        `}
      >
        <p className="text-sm md:text-xl">{updateMessage}</p>
      </section>

      <div className="m-2 md:m-4 md:mx-10">
        {/* Top One */}
        <div className="settingsmain flex flex-row justify-between items-center pr-4 pl-2 py-1">
          <div>
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="back size-8 p-1 cursor-pointer active:scale-75 transition-all ease-in duration-150"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
                />
              </svg>
            </Link>
          </div>
          <p className="font-semibold">Settings - Nivra</p>
        </div>

        {/* About Main */}
        <section className="settingsmain p-3 px-4">
          <div className="max-w-4xl mx-auto px-4 py-8 space-y-3">
            <h1 className="text-xl md:text-3xl font-bold text-gray-800 flex flex-row flex-nowrap items-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-6 md:size-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
                  />
                </svg>
              </span>
              &nbsp;Site Settings
            </h1>

            <form autoComplete="off">
              {/* Location Preferences */}
              <section className="mb-3">
                <h2 className="text-sm md:text-xl font-semibold mb-2 flex flex-row flex-nowrap items-center">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="size-5 md:size-6"
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
                  </span>
                  &nbsp;Location Preferences
                </h2>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-gray-700">Default City</label>
                    <input
                      placeholder="e.g. Kigali"
                      name="defaultCity"
                      value={formData.defaultCity}
                      onChange={handleChange}
                      className="border-2 focus:border-[#086bae] shadow-xl focus:shadow-inner rounded px-4 py-1 w-1/2 outline-none"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-gray-700 flex">
                      <span className="group relative">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={3}
                          stroke="currentColor"
                          className="group size-5 md:size-6 text-gray-800 cursor-pointer"
                          onClick={() => setShowAddress((prev) => !prev)}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                        <p className="hidden group-hover:flex flex-row whitespace-nowrap absolute z-10 bg-slate-300 top-7 left-2 rounded-md px-2">
                          {showAddress ? "Hide Address" : "View Address"}
                        </p>
                      </span>
                      Use My Location
                    </label>
                    <input
                      type="checkbox"
                      name="myLocation"
                      checked={formData.myLocation}
                      onChange={handleChange}
                      className="h-4 w-4 shadow-md"
                      onClick={handleMyLocation}
                    />
                  </div>

                  {/* Current Location */}
                  {showAddress && (
                    <div className="flex flex-col gap-1 bg-slate-400 p-2 rounded-md pl-3 overflow-hidden transform animate-slide-down transition-all duration-300 ease-in-out">
                      {settings.address ? (
                        <>
                          <p className="font-semibold flex">
                            Current Address:
                            <span className="group relative">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="size-6 cursor-pointer"
                                onClick={() =>
                                  setViewPrecaution((prev) => !prev)
                                }
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                                />
                              </svg>
                              <p className="hidden group-hover:flex flex-row whitespace-nowrap absolute z-10 bg-slate-300 top-7 left-2 rounded-md px-2">
                                {viewPrecaution ? "Hide Info" : "View Info"}
                              </p>
                            </span>
                          </p>

                          {/* Precaution */}
                          {viewPrecaution && (
                            <div className="animate-slide-down">
                              <p className="mt-1 italic text-yellow-700">
                                Please verify if this location is still
                                accurate. If not, re-enable location access or
                                search for your city manually.
                              </p>
                            </div>
                          )}

                          {settings.address.city && (
                            <p>
                              City:&nbsp;
                              <span className="text-gray-800">
                                {settings.address.city}
                              </span>
                            </p>
                          )}
                          {settings.address.town && (
                            <p>
                              Town:&nbsp;
                              <span className="text-gray-800">
                                {settings.address.town}
                              </span>
                            </p>
                          )}
                          {settings.address.village && (
                            <p>
                              Village:&nbsp;
                              <span className="text-gray-800">
                                {settings.address.village}
                              </span>
                            </p>
                          )}
                          {settings.address.county && (
                            <p>
                              District/County:&nbsp;
                              <span className="text-gray-800">
                                {settings.address.county}
                              </span>
                            </p>
                          )}
                          {settings.address.state_district && (
                            <p>
                              State District:&nbsp;
                              <span className="text-gray-800">
                                {settings.address.state_district}
                              </span>
                            </p>
                          )}
                          {settings.address.state && (
                            <p>
                              State:&nbsp;
                              <span className="text-gray-800">
                                {settings.address.state}
                              </span>
                            </p>
                          )}
                          {settings.address.country && (
                            <p>
                              Country:&nbsp;
                              <span className="text-gray-800">
                                {settings.address.country}
                              </span>
                            </p>
                          )}
                        </>
                      ) : (
                        <p>
                          ⚠️ To use this feature, you must allow location access
                          first.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </section>

              {/* Units */}
              <section className="mb-3">
                <h2 className="text-sm md:text-xl font-semibold mb-2 flex flex-row flex-nowrap items-center">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.7}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z"
                      />
                    </svg>
                  </span>
                  &nbsp;Units & Measurements
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-gray-700">Temperature Unit</label>
                    <select
                      name="temp_Unit"
                      value={formData.temp_Unit}
                      onChange={handleChange}
                      className="outline-none cursor-pointer shadow-md rounded-md border px-3 py-1"
                    >
                      <option value="c">&#176;C</option>
                      <option value="f">&#176;F</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-gray-700">Wind Speed</label>
                    <select
                      name="wind_Unit"
                      value={formData.wind_Unit}
                      onChange={handleChange}
                      className="outline-none cursor-pointer shadow-md rounded-md border px-3 py-1"
                    >
                      <option value="kph">kph</option>
                      <option value="mph">mph</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-gray-700">Pressure</label>
                    <select
                      name="pres_Unit"
                      value={formData.pres_Unit}
                      onChange={handleChange}
                      className="border px-3 py-1 outline-none cursor-pointer shadow-md rounded-md"
                    >
                      <option value="mb">mb</option>
                      <option value="in">in</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-gray-700">Precipitation</label>
                    <select
                      name="precip_Unit"
                      value={formData.precip_Unit}
                      onChange={handleChange}
                      className="border px-3 py-1 outline-none cursor-pointer shadow-md rounded-md"
                    >
                      <option>mm</option>
                      <option>in</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Notifications */}
              <section className="mb-3">
                <h2 className="text-sm md:text-xl font-semibold mb-2 flex flex-row flex-nowrap items-center">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="size-5 md:size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                      />
                    </svg>
                  </span>
                  &nbsp;Notifications
                </h2>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-gray-700">
                      Enable Weather Alerts
                    </label>
                    <input
                      type="checkbox"
                      name="weather_Alerts"
                      checked={formData.weather_Alerts}
                      onChange={handleChange}
                      className="h-4 w-4 shadow-md"
                    />
                  </div>
                </div>
              </section>
            </form>

            {/* Site Data */}
            <section>
              <h2 className="text-sm md:text-xl font-semibold mb-2 flex flex-row flex-nowrap items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-5 md:size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                  />
                </svg>
                &nbsp;Site Data
              </h2>
              <div className="flex flex-row justify-between">
                <p className="text-gray-700">Clear Site Data</p>
                <button
                  onClick={resetSiteDataDialog}
                  className="border-2 border-[#086bae] shadow-xl p-[2px] px-4 rounded-md bg-slate-900 text-white"
                >
                  Reset
                </button>
              </div>
            </section>

            {/* Site Data Reset */}
            {resetSiteDataDialogOpen && (
              <div className="p-3">
                <div className="fixed inset-0 bg-black bg-opacity-40 z-40 flex items-center justify-center">
                  <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl z-50">
                    <h2 className="text-sm md:text-xl font-bold text-red-600 mb-2 flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="size-5 md:size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                      Reset All Site Data?
                    </h2>

                    {/* info */}
                    <section>
                      <p className="text-gray-700 text-sm mb-4">
                        This will permanently erase all your saved preferences
                        and settings, including:
                      </p>
                      <ul className="list-disc list-inside text-gray-600 text-sm mb-4">
                        <li>Saved locations and default city</li>
                        <li>Unit and display preferences</li>
                        <li>Notification settings</li>
                        <li>Cached weather data</li>
                      </ul>
                      <p className="text-sm text-red-500 font-medium mb-4">
                        This action cannot be undone.
                      </p>
                    </section>

                    {/* actions */}
                    <div className="flex justify-end gap-3">
                      <button
                        className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900"
                        onClick={onCancel}
                      >
                        Cancel
                      </button>
                      <button
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-semibold"
                        onClick={deleteData}
                      >
                        Yes, Reset
                      </button>
                    </div>

                    <div
                      className={`overflow-hidden text-green-500 font-semibold transition-all duration-300 ease-in-out ${
                        deleteDetails
                          ? "max-h-40 opacity-100 mt-2"
                          : "max-h-0 opacity-0 mt-0"
                      }`}
                    >
                      {deleteMessage}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SiteSettings;
