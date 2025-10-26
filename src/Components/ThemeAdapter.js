import React, { useMemo, useState, useEffect } from "react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import stylisRTLPlugin from "stylis-plugin-rtl";
import { muiThemes } from "../Style/themeAdapter";
import TextEn from "../Config/TextEn";
import TextHe from "../Config/Texts";
import { useTheme as useAppTheme } from "../Hooks/useTheme";

export const LanguageContext = React.createContext({
  language: "he",
  texts: {},
  direction: "rtl",
  setLanguage: () => {},
});

const ThemeAdapter = ({ children }) => {
  const [language, setLanguage] = useState(() => localStorage.getItem("language") || "he");
  const [direction, setDirection] = useState(() => localStorage.getItem("direction") || (language === "he" ? "rtl" : "ltr"));

  const { palette, theme } = useAppTheme();

  const texts = language === "he" ? TextHe : TextEn;

  useEffect(() => {
    const newDir = language === "he" ? "rtl" : "ltr";
    setDirection(newDir);
    localStorage.setItem("language", language);
    localStorage.setItem("direction", newDir);
    document.documentElement.dir = newDir;
    document.body.dir = newDir;
  }, [language]);

  const cache = useMemo(
    () =>
      createCache({
        key: direction === "rtl" ? "mui-rtl" : "mui-ltr",
        stylisPlugins: direction === "rtl" ? [stylisRTLPlugin] : [],
      }),
    [direction]
  );

  const baseTheme =
    muiThemes[theme] ||
    muiThemes[palette?.name?.toLowerCase()] ||
    muiThemes.light;

  const dynamicTheme = useMemo(
    () =>
      createTheme({
        ...baseTheme,
        direction,
        palette: {
          ...baseTheme.palette,
          mode: theme,
          primary: palette.primary,
          secondary: palette.secondary,
          background: {
            default: palette.background,
            paper: palette.surface,
          },
          text: {
            primary: palette.text,
            secondary: palette.textSecondary,
          },
        },
      }),
    [palette, theme, direction, baseTheme]
  );

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={dynamicTheme}>
        <CssBaseline />
        <LanguageContext.Provider value={{ language, texts, direction, setLanguage }}>
          {children}
        </LanguageContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default ThemeAdapter;