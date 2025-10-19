import { create } from "zustand";
import { Suggestion } from "../types/suggestion";

interface SuggestionsState {
  toggledClearSuggestions: boolean;
  toggleClearSuggestions: () => void;
  selectedSuggestions: Suggestion[];
  setSelectedSuggestions: (suggestions: Suggestion[]) => void;
}

export const useSuggestionsStore = create<SuggestionsState>((set) => ({
  toggledClearSuggestions: false,
  toggleClearSuggestions: () => set((state) => ({ toggledClearSuggestions: !state.toggledClearSuggestions })),
  selectedSuggestions: [],
  setSelectedSuggestions: (suggestions) => set({ selectedSuggestions: suggestions }),
}));
