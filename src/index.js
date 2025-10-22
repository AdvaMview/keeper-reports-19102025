import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// 🩶 פונטים של MUI
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// 🧱 Redux Store
import { Provider } from "react-redux";
import store from "./store";

// 🎨 Theme Adapter - עוטף את כל האפליקציה עם נושא הצבעים שלך
import ThemeAdapter from "./Components/ThemeAdapter";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeAdapter>
        <App />
      </ThemeAdapter>
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
