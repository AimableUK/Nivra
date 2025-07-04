import useSWR from "swr";

const API_KEY  = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1/forecast.json";
const fetcher  = (url) => fetch(url).then((r) => r.json());

export default function useWeather(city = "Kigali") {
  // ask WeatherAPI for *two* forecast days
  const url = `${BASE_URL}?key=${API_KEY}&q=${city}&days=2&aqi=no&alerts=no`;
  const { data, error } = useSWR(url, fetcher);
  const isLoading = !data && !error;

  // ---- slice the next 24 h, aligned with the API's local time ----
  const hourly24 = (() => {
    if (!data) return [];

    const day0 = data?.forecast.forecastday?.[0]?.hour ?? [];
    const day1 = data?.forecast.forecastday?.[1]?.hour ?? [];

    // WeatherAPI gives you the station’s local time — use it!
    const apiLocalHour = new Date(data.location.localtime).getHours();

    // concatenate today + tomorrow, then cut out 24 items
    const window24 = [...day0, ...day1].slice(apiLocalHour, apiLocalHour + 24);
    return window24;
  })();

  return {
    isLoading,
    error,
    location: data?.location,
    current:  data?.current,
    hourly24,               // <— ready to pass as prop
  };
}
