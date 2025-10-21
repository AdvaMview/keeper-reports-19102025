import { useEffect } from "react";
import { palettes } from "../Style/Palettes";
import { useSelector, useDispatch } from "react-redux";
import { setSetting } from "../store/appSettingsSlice";

const PALETTE_KEY = "selectedPalette";
const THEME_KEY = "theme";

export function useTheme() {
  const dispatch = useDispatch();
  const { selectedPalette, theme } = useSelector((state) => state.appSettings);

  const paletteName = localStorage.getItem(PALETTE_KEY);
  const palette =
    palettes.find((p) => p.name === paletteName) ||
    palettes.find((p) => p.name === selectedPalette?.name) ||
    palettes[0];

  useEffect(() => {
    localStorage.setItem(PALETTE_KEY, palette.name);
    localStorage.setItem(THEME_KEY, theme);
  }, [palette, theme]);

  const selectPalette = (name) => {
    const selected = palettes.find((p) => p.name === name);
    if (selected) {
      dispatch(setSetting({ key: "selectedPalette", value: selected }));
    }
  };

  const toggleDarkMode = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    dispatch(setSetting({ key: "theme", value: nextTheme }));
    localStorage.setItem(THEME_KEY, nextTheme);
  };

  return { palette, selectPalette, palettes, theme, toggleDarkMode };
}
