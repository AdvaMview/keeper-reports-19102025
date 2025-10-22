import { useEffect } from "react";
import { palettes } from "../Style/Palettes";
import { useSelector, useDispatch } from "react-redux";
import { setSetting } from "../store/appSettingsSlice";

const PALETTE_KEY = "selectedPalette";
const THEME_KEY = "theme";
const LOGOUT_FLAG = "isLoggingOut";

export function useTheme() {
  const dispatch = useDispatch();
  const { selectedPalette, theme } = useSelector((state) => state.appSettings);

  // שליפה ראשונית של הפלטה מהאחסון
  const paletteName = localStorage.getItem(PALETTE_KEY);
  const palette =
    palettes.find((p) => p.name === paletteName) ||
    palettes.find((p) => p.name === selectedPalette?.name) ||
    palettes[0];

  // 🔄 סנכרון בין theme לפלטה
  useEffect(() => {
    const expectedPaletteName = theme === "dark" ? "dark" : "light";
    if (palette.name.toLowerCase() !== expectedPaletteName) {
      const newPalette = palettes.find((p) => p.name === expectedPaletteName);
      dispatch(setSetting({ key: "selectedPalette", value: newPalette }));
      localStorage.setItem(PALETTE_KEY, newPalette.name);
    }
  }, [theme, dispatch, palette]);

  // 💾 שמירה ב-localStorage
  useEffect(() => {
    const isLoggingOut = localStorage.getItem(LOGOUT_FLAG) === "true";
    if (isLoggingOut) return;

    localStorage.setItem(PALETTE_KEY, palette.name);
    localStorage.setItem(THEME_KEY, theme);
  }, [palette, theme]);

  // בחירת פלטה לפי שם
  const selectPalette = (name) => {
    const selected = palettes.find((p) => p.name === name);
    if (selected) {
      dispatch(setSetting({ key: "selectedPalette", value: selected }));
      localStorage.setItem(PALETTE_KEY, selected.name);
      // סנכרון theme לפלטה
      const mode = selected.name.toLowerCase() === "dark" ? "dark" : "light";
      dispatch(setSetting({ key: "theme", value: mode }));
      localStorage.setItem(THEME_KEY, mode);
    }
  };

  // מתג למעבר בין light/dark
  const toggleDarkMode = () => {
    const nextTheme = theme === "light" ? "light" : "light";
    dispatch(setSetting({ key: "theme", value: nextTheme }));

    const nextPalette = palettes.find(
      (p) => p.name.toLowerCase() === nextTheme
    );
    dispatch(setSetting({ key: "selectedPalette", value: nextPalette }));

    localStorage.setItem(THEME_KEY, nextTheme);
    localStorage.setItem(PALETTE_KEY, nextPalette.name);
  };

  return { palette, selectPalette, palettes, theme, toggleDarkMode };
}
