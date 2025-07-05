import useSWR from "swr";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1/forecast.json";
const fetcher = (url) => fetch(url).then((r) => r.json());

export default function useDaysWeather(city = "Kigali") {
  const url = `${BASE_URL}?key=${API_KEY}&q=${city}&days=14&aqi=no&alerts=no`;
  const { data, error } = useSWR(url, fetcher);
  const isLoading = !data && !error;

  const forecastdays = data?.forecast?.forecastday || [];

  const hourly24 = (() => {
    if (!data) return [];

    const allHours = forecastdays.flatMap((day) => day.hour);
    const localHour = new Date(data.location.localtime).getHours();
    return allHours.slice(localHour, localHour + 24);
  })();

  return {
    isLoading,
    error,
    location: data?.location,
    current: data?.current,
    hourly24, // next 24 hours (today + tomorrow)
    forecastdays, // full 14 days forecast data
  };
}
