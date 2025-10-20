import { useState } from "react";
import { useSettings } from "../Hooks/useSettings";
import { useTheme } from "../Hooks/useTheme";
import { useSelector } from "react-redux";
import { Toggle } from "../Components/Toggle";
import Card from '../Components/Card';

// import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
// import Menu from "../Components/Menu";
// import Selector from "../Components/Selector";

const Header = () => {
  const settings = useSettings();
  const { selectPalette } = useTheme();
  const palette = useSelector((state) => state.appSettings.selectedPalette);
  const user = useSelector((state) => state.userAccount?.user);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // detect direction from settings or fallback
  const dir = settings?.direction || "ltr"; // "ltr" | "rtl"
  const themeOptions = Object.entries(settings?.THEMES || {}).map(
    ([key, label]) => ({
      value: key.toLowerCase(),
      label: label,
    })
  );

  // current palette name as lowercase (fallback to 'light')
  const currentPalette = (palette?.name || palette?.value || "light")
    .toString()
    .toLowerCase();

  // Toggle between light and dark and call selectPalette
  const handleTogglePalette = () => {
    const next = currentPalette === "dark" ? "light" : "dark";
    selectPalette(next);
  };

  const styles = {
    header: {
      color: palette?.text || "#000",
      position: "sticky",
      width: "calc(100vw - 85px)",
      top: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "50px",
      flexDirection: dir === "rtl" ? "row" : "row-reverse",
      padding: "0 16px",
    },
    title: {
      margin: 0,
      fontSize: "1.8rem",
      fontWeight: 500,
      textAlign: "center",
      flexGrow: 1,
      fontfamily: "Assistant, sans-serif",
    },
    side: {
      minWidth: "200px",
      display: "flex",
      alignItems: "center",
      justifyContent: dir === "rtl" ? "flex-end" : "flex-start",
      gap: "12px",
    },
  };

  return (
    <Card>
      <header style={styles.header} dir={dir}>
        <>
          {/* <MenuOutlinedIcon
            style={{ cursor: "pointer", fontSize: "28px", margin: "10px" }}
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          /> */}

          {/* ה־Sidebar */}
          {/* <Menu
            isOpen={isSidebarOpen}
            handleClose={() => setSidebarOpen(false)}
          /> */}
        </>
        {/* User side */}
        <div style={styles.side}>
          <span>{user?.firstName || "Guest"}</span>
        </div>

        {/* Title */}
        <h1 style={styles.title}>{settings.texts.APP_TITLE}</h1>

        {/* Theme selector side */}
        <div style={styles.side}>
          {/* <Selector
            value={
              themeOptions.find(
                (f) => f.value.toLowerCase() === palette.name?.toLowerCase()
              )?.value
            }
            onChange={(theme) => selectPaletteHandler(theme)}
            options={themeOptions}
          /> */}
          <Toggle
            handleChange={handleTogglePalette}
            isChecked={currentPalette === "dark"}
          />
        </div>
      </header>
    </Card>
  );
};

export default Header;

// import React from 'react';
// import { useTheme } from '../Hooks/useTheme';
// import { useSettings } from '../Hooks/useSettings';
// import Card from '../Components/Card';

// const Header = () => {
//     const palette = useSelector(state => state.appSettings.selectedPalette);
//     const settings = useSettings();

//     return (
//         <Card>
//             <header style={{
//                 color: palette.value.text,
//                 position: 'sticky',
//                 width: 'calc(100vw - 85px)',
//                 top: 0,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 height: '60px'
//             }}>
//                 <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 500 }}>{settings.texts.APP_TITLE}</h1>
//             </header>
//         </Card>
//     );
// };

// export default Header;
