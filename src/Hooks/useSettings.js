import { useContext } from "react";
import { LanguageContext } from "../Components/ThemeAdapter";
import config from "../Config";

export function useSettings() {
  const { language, texts } = useContext(LanguageContext);

  return {
      ...config,
    language,
    texts,
  };
}
