import React, { useMemo, useState } from "react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import stylisRTLPlugin from "stylis-plugin-rtl";
import { muiThemes } from "../Style/themeAdapter";
import TextEn from "../Config/TextEn";
import TextHe from "../Config/Texts";
import { useSettings } from "../Hooks/useSettings";
import { useTheme } from "../Hooks/useTheme";

const ThemeAdapter = ({ children }) => {
  const [language, setLanguage] = useState("he");
  const { palette, theme } = useTheme();
  const direction = language === "he" ? "rtl" : "ltr";
  const texts = language === "he" ? TextHe : TextEn;
  // const settings = useSettings();

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
          mode: theme, // light / dark
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

  document.body.dir = direction;

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={dynamicTheme}>
        <CssBaseline />

        <div
          style={{
            position: "fixed",
            direction,
            top: 10,
            right: 10,
            zIndex: 9999,
            display: "flex",
            gap: "8px",
          }}
        >
          <button
            onClick={() => setLanguage(language === "he" ? "en" : "he")}
            style={{
              background: "#ffffffcc",
              color: "#000",
              border: "1px solid #aaa",
              borderRadius: 6,
              padding: "6px 10px",
              cursor: "pointer",
              fontFamily: "Heebo, Rubik, sans-serif",
            }}
          >
            {language === "he" ? "Switch to English" : "עבור לעברית"}
          </button>
        </div>

        {/* נשתף את הטקסטים כ־context אם נרצה להשתמש בהם בכל האפליקציה */}
        <LanguageContext.Provider value={{ language, texts }}>
          {children}
        </LanguageContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export const LanguageContext = React.createContext({
  language: "he",
  texts: {},
});
export default ThemeAdapter;
