import { create } from "zustand";

export const useSearchStore = create((set) => ({
  query: "",
  suggestions: [],
  setQuery: (q) => set({ query: q }),
  setSuggestions: (s) => set({ suggestions: s }),
}));
