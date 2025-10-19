import { signal } from "@preact/signals-react";

export const themeSignal = signal("light"); // default theme

export const toggleTheme = () => {
  themeSignal.value = themeSignal.value === "light" ? "dark" : "light";
};
