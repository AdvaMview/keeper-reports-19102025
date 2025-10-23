import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideMenu from "./SideMenu";

const Layout = () => {
  const palette = useSelector((state) => state.appSettings.selectedPalette);
  const isTablet = useMediaQuery("(max-width: 1024px)");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: palette.background,
      }}
    >
      <Header />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          overflow: "hidden",
           padding: 0.5,
        }}
      >
        {!isTablet && <SideMenu />}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            height: "calc(100vh - 80px)",
            padding: 0.5,
            boxSizing: "border-box",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
