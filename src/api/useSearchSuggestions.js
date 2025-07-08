import { useMemo } from "react";
import useSWR from "swr";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.weatherapi.com/v1/search.json";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function useSearchSuggestions(query) {
  const shouldFetch = query?.length >= 2;
  const url = shouldFetch
    ? `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}`
    : null;

  const { data, error } = useSWR(url, fetcher);

  const suggestions = useMemo(() => {
    return (data || []).slice(0, 7);
  }, [data]);

  return {
    isLoading: shouldFetch && !data && !error,
    error,
    suggests: suggestions,
  };
}
