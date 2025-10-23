import {
  Box,
  Typography,
  Paper,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useSettings } from "../Hooks/useSettings";
import { useSelector } from "react-redux";
import SettingsUser from "../Pages/SettingsUser";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import Menu from "../Components/Menu";
import { useLocation } from "react-router-dom";

const Header = () => {
  const settings = useSettings();
  const palette = useSelector((state) => state.appSettings.selectedPalette);
  const user = useSelector((state) => state.userAccount?.user);
  const dir = settings?.direction || "ltr";
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isTablet = useMediaQuery("(max-width: 1024px)");

  const isLoginPage = location.pathname.toLowerCase().includes("/login");

  return (
    <Paper
      elevation={0}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        width: "100%",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: dir === "rtl" ? "row-reverse" : "row",
        px: 2,
        backgroundColor: palette.surface,
        color: palette.text,
        boxShadow: "none",
      }}
      dir={dir}
    >
      {!isLoginPage}
      <SettingsUser />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          minWidth: 200,
          justifyContent: "flex-start",
          gap: 1.5,
          fontWeight: 500,
        }}
      >
        <Typography variant="body1">
          {user.firstName || settings.texts.GUEST}
        </Typography>
      </Box>

      <Typography
        variant="h5"
        sx={{
          flexGrow: 1,
          textAlign: "center",
          fontWeight: 600,
          fontFamily: "Assistant, sans-serif",
          color: palette.text,
        }}
      >
        {settings.texts.APP_TITLE}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          minWidth: 200,
          justifyContent: "flex-end",
          gap: 1.5,
        }}
      >
        {!isLoginPage && isTablet && (
          <IconButton
            onClick={toggleMenu}
            sx={{
              color: palette.text,
              display: "flex",
              backgroundColor: "transparent",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Box>
      {!isLoginPage && isTablet && (
        <Menu isOpen={isOpen} handleClose={closeMenu} />
      )}
      {!isLoginPage && isTablet && isOpen && (
        <div
          onClick={closeMenu}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 8,
          }}
        />
      )}
    </Paper>
  );
};

export default Header;
