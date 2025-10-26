import { useMemo } from "react";
import { useTheme } from "@mui/material/styles";
import { useSettings } from "../Hooks/useSettings";

function Logo({ type = "full", ...props }) {
  const { LOGOS } = useSettings();
  const theme = useTheme(); 
  const mode = theme.palette.mode || "light";


  const logoSrc = useMemo(() => {
    const logoSet = LOGOS?.[mode] || LOGOS.light;
    return logoSet?.[type] || logoSet?.full;
  }, [LOGOS, mode, type]);

  return (
    <img
      key={mode} 
      src={`/static/${logoSrc}`}
      alt="Logo"
      style={{
        height: "8rem",
        objectFit: "contain",
        transition: "opacity 0.4s ease-in-out",
      }}
      {...props}
    />
  );
}

export default Logo;
