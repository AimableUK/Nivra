import useSWR from "swr";

const API_KEY  = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1/forecast.json";
const fetcher  = (url) => fetch(url).then((r) => r.json());

export default function useWeather(city = "Kigali") {
  const url = `${BASE_URL}?key=${API_KEY}&q=${city}&days=2&aqi=no&alerts=no`;
  const { data, error } = useSWR(url, fetcher);
  const isLoading = !data && !error;

  const hourly24 = (() => {
    if (!data) return [];

    const day0 = data?.forecast?.forecastday?.[0]?.hour ?? [];
    const day1 = data?.forecast?.forecastday?.[1]?.hour ?? [];

    if (day0.length === 0) return [];

    const localtimeString = data?.location?.localtime; // "YYYY-MM-DD HH:mm"
    const apiLocalHour = localtimeString
      ? Number(localtimeString.split(" ")[1].split(":")[0])
      : new Date().getHours();

    const combinedHours = [...day0, ...day1];
    const startIndex = apiLocalHour;
    const endIndex = startIndex + 24;

    const window24 = combinedHours.slice(startIndex, endIndex);

    console.log("API Local Hour:", apiLocalHour);
    console.log("Day0 hours:", day0.length);
    console.log("Day1 hours:", day1.length);
    console.log("Window 24 length:", window24.length);

    return window24;
  })();

  return {
    isLoading,
    error,
    location: data?.location,
    current:  data?.current,
    hourly24,
  };
}
