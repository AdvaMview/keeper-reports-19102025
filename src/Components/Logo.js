import { useSettings } from "../Hooks/useSettings";
// import { useTheme } from '../Hooks/useTheme';
import { useSelector } from "react-redux";

function Logo({ type, ...props }) {
  const { LOGOS } = useSettings();
  const palette = useSelector(state => state.appSettings.selectedPalette);
  //const color = THEMES.DARK === palette?.name ||'dark';
  const color = palette.name ||'dark';

  return (
    <>
      <img style={{ height: '10rem' }}
        alt="Logo"
        src={`/static/${LOGOS[color][type]}`}
        {...props}
      />
    </>
  );
}

export default Logo;