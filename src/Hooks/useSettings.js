import { useContext } from "react";
import { LanguageContext } from "../Components/ThemeAdapter";

export function useSettings() {
  const { language, texts } = useContext(LanguageContext);

  return {
    language,
    texts,
  };
}
