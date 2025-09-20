import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("streamify-theme") || "forest",
  setTheme: (theme) => {
    localStorage.setItem("streamify-theme", theme); //localStorage mein store kregy theme jo user ne already choose kri hai so that after refresh change na ho 
    set({ theme });
  },
}));