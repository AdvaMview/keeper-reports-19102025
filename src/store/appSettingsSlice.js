import { createSlice } from "@reduxjs/toolkit";
import { palettes } from "../Style/Palettes";

const initialState = {
  theme: localStorage.getItem("theme") || "light",
  selectedPalette:
    palettes.find((p) => p.name === localStorage.getItem("selectedPalette")) ||
    palettes[0],
  direction: "rtl",
  language: "he",
  // add more settings as needed
};

const appSettingsSlice = createSlice({
  name: "appSettings",
  initialState,
  reducers: {
    setSetting(state, action) {
      const { key, value } = action.payload;
      state[key] = value;
    },
    setSettings(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setSetting, setSettings } = appSettingsSlice.actions;
export default appSettingsSlice.reducer;
