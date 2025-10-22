import React, { useMemo } from "react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import { useTheme } from "../Hooks/useTheme";
import { muiThemes } from "../Style/themeAdapter";

const ThemeAdapter = ({ children }) => {
  const { palette, theme } = useTheme();

  const muiTheme =
    muiThemes[palette?.name?.toLowerCase()] ||
    muiThemes[theme] ||
    Object.values(muiThemes)[0];

  const dynamicTheme = useMemo(
  () =>
    createTheme({
      ...muiTheme,
      palette: {
        mode: theme,
        primary: palette.primary,
        secondary: palette.secondary,
        error: { main: palette.error },
        background: {
          default: palette.background,
          paper: palette.surface,
        },
        text: {
          primary: palette.text,
          secondary: palette.textSecondary,
        },
        divider: palette.border,
      },
    }),
  [palette, theme, muiTheme]
);


  return (
    <ThemeProvider theme={dynamicTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeAdapter;
