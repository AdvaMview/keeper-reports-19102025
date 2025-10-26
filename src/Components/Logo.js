import { useSettings } from "../Hooks/useSettings";
// import { useTheme } from '../Hooks/useTheme';
// import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";

function Logo({ type, ...props }) {
  const { LOGOS } = useSettings();
  // const palette = useSelector(state => state.appSettings.selectedPalette);
  // const color = THEMES.DARK === palette?.name ||'dark';
  // const color = palette.name;
  const theme = useTheme();
  const mode = theme?.palette?.mode || "light";
  const logoSet = LOGOS?.[mode] || LOGOS?.light || {};
  const logoSrc = logoSet?.[type] || logoSet?.full || "MVIEW_BLACK.png";
  return (
    <>
      {/* <img style={{ height: '10rem' }}
        alt="Logo"
        src={`/static/${LOGOS[color][type]}`}
        {...props}
      /> */}
      <img
        style={{ height: "10rem", objectFit: "contain" }}
        alt="Logo"
        src={`/static/${logoSrc}`}
        {...props}
      />
    </>
  );
}

export default Logo;
