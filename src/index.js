import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { muiThemes } from "./Style/themeAdapter";
import { Provider, useSelector } from "react-redux";
import store from "./store";

const ThemedApp = () => {
  const themeName = useSelector((state) => state.appSettings.theme);
  const theme = muiThemes[themeName] || muiThemes.light;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemedApp />
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
