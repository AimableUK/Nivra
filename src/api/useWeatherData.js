import useSWR from "swr";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1/forecast.json";
const fetcher = (url) => fetch(url).then((r) => r.json());

export default function useWeather(searchlocation) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${searchlocation}&days=2&aqi=no&alerts=no`;
  const { data, error } = useSWR(url, fetcher);
  const isLoading = !data && !error;

  const location = data?.location ?? null;
  const current = data?.current ?? null;

  // ---- 24h hourly slice ----
  const hourly24 = (() => {
    if (!data) return [];

    const day0 = data?.forecast?.forecastday?.[0]?.hour ?? [];
    const day1 = data?.forecast?.forecastday?.[1]?.hour ?? [];

    if (day0.length === 0) return [];

    const localtime = data?.location?.localtime;
    const hour = localtime
      ? Number(localtime.split(" ")[1].split(":")[0])
      : new Date().getHours();

    return [...day0, ...day1].slice(hour, hour + 24);
  })();

  return {
    isLoading,
    error,
    location,
    current,
    hourly24,
  };
}
