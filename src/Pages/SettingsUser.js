import React, { useState } from "react";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Divider,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LogoutIcon from "@mui/icons-material/Logout";
import { useTheme } from "../Hooks/useTheme";
import { useSelector } from "react-redux";
import { useLogout } from "../Pages/Logout";
import { useSettings } from "../Hooks/useSettings";
import { useLocation } from "react-router-dom";

const SettingsUser = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const settings = useSettings();
  const { theme, toggleDarkMode } = useTheme();
  const handleLogout = useLogout();
  const palette = useSelector((state) => state.appSettings.selectedPalette);
  const dir = settings?.direction || "ltr";
  const location = useLocation();

  const isLoginPage = location.pathname.toLowerCase().includes("/login");

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const onLogout = async () => {
    await handleLogout();
    handleClose();
  };

  return (
    <Box>
      <IconButton onClick={handleOpen}>
        <SettingsIcon sx={{ color: palette.text }} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        dir={dir}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: 2,
            minWidth: 220,
            backgroundColor: palette.surface,
            color: palette.text,
            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
          },
        }}
      >
        <MenuItem>
          <ListItemIcon>
            <Brightness4Icon sx={{ color: palette.text }} />
          </ListItemIcon>
          <ListItemText>
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </ListItemText>
          <Switch
            checked={theme === "dark"}
            onChange={toggleDarkMode}
            color="default"
          />
        </MenuItem>

        {!isLoginPage && [
          <Divider
            key="divider"
            sx={{ my: 1, backgroundColor: palette.border }}
          />,
          <MenuItem key="logout" onClick={onLogout}>
            <ListItemIcon>
              <LogoutIcon sx={{ color: palette.text }} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </MenuItem>,
        ]}
      </Menu>
    </Box>
  );
};

export default SettingsUser;
