import { createTheme } from "@mui/material/styles";
import { heIL } from "@mui/material/locale"; 
import { palettes } from "./Palettes";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const muiThemes = palettes.reduce((acc, p) => {
  const theme = createTheme(
    {
      direction: "rtl",
      palette: {
        mode: p.name === "dark" ? "dark" : "light",
        primary: p.primary,
        secondary: p.secondary,
        error: { main: p.error },
        background: {
          default: p.background,
          paper: p.surface,
        },
        text: {
          primary: p.text,
          secondary: p.textSecondary,
        },
        divider: p.border,
      },
      shape: {
        borderRadius: parseInt(p.borderRadius, 10) || 8,
      },
      typography: {
        fontFamily: [
          "Rubik",
          "Assistant",
          "Heebo",
          "Arial",
          "sans-serif",
        ].join(","),
        h1: { fontSize: "2rem", fontWeight: 600 },
        h2: { fontSize: "1.5rem", fontWeight: 500 },
        body1: { fontSize: "1rem" },
        body2: { fontSize: "0.9rem", color: p.textSecondary },
      },
      components: {
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundColor: p.surface,
              border: p.border,
              boxShadow: p.boxShadow,
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: p.borderRadius,
              textTransform: "none",
              boxShadow: "none",
              "&:hover": { boxShadow: p.boxShadow },
            },
          },
        },
      },
    },
    heIL // מוסיף תמיכה ב־RTL וטקסט עברי אוטומטי
  );

  acc[p.name] = theme;
  return acc;
}, {});
