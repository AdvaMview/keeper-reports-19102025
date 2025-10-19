import { useEffect, useState } from "react";
import { palettes } from "../Style/Palettes";
import { useSelector, useDispatch } from "react-redux";
import { setSetting } from "../store/appSettingsSlice";

const PALETTE_KEY = "selectedPalette";

// Custom hook: all hooks must be inside here
export function useTheme() {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.appSettings);
  const paletteName = localStorage.getItem(PALETTE_KEY); //settings.theme;
  console.log("paletteName", settings.theme);

  function getInitialPalette() {
    const saved = localStorage.getItem(PALETTE_KEY);
    const found = palettes.find((p) => p.name === saved);
    return found || palettes[0];
  }
  const [isDarkMode, setIsDarkMode] = useState(false);
  const palette = palettes.find((p) => p.name === paletteName) || palettes[0];

  // useEffect(() => {
  //   localStorage.setItem(PALETTE_KEY, palette.name);
  // }, [palette]);

  const selectPalette = (name) => {
    const selected = palettes.find((p) => p.name === name);
    dispatch(setSetting({ key: "selectedPalette", value: selected }));
    // localStorage.setItem(PALETTE_KEY, name);
  };
  console.log("palette", palette);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };
  
  useEffect(() => {
    localStorage.setItem('isDarkMode', isDarkMode);
  }, [isDarkMode]); 

  //return { palette, selectPalette, palettes };
  return { palette, selectPalette, palettes,  isDarkMode, toggleDarkMode  };
}

// // Hook to manage theme using Redux
//   const selectPalette = (name) => {
//     dispatch(setPalette(name));
//   };

//   return { palette, selectPalette, palettes };
// }

// import { signal, effect, computed } from '@preact/signals-react';
// import { palettes } from '../Style/Palettes';

// const PALETTE_KEY = 'selectedPalette';

// // Helper: load initial palette
// function getInitialPalette() {
//   const saved = localStorage.getItem(PALETTE_KEY);
//   const found = palettes.find(p => p.name === saved);
//   return found || palettes[0];
// }

// // Create a global signal (shared across components)
// export const palette = signal(getInitialPalette());

// // Hook
// //export function useTheme() {
// // Persist to localStorage whenever palette changes
// effect(() => {
//   localStorage.setItem(PALETTE_KEY, palette.name);
// });

// export const selectPalette = (name) => {
//   const found = palettes.find(p => p.name === name);
//   if (found) {
//     palette = found;
//   }
// };

// //return { palette: paletteSignal.value, selectPalette, palettes };
// //}
