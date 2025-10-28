import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSettings } from "../Hooks/useSettings";
import { menuItems } from "../Config/Menu";
import Logo from "./Logo";

const BurgerMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const palette = useSelector((state) => state.appSettings.selectedPalette);
  const settings = useSettings();
  const theme = useTheme();
  const dir = theme.direction;
  const user = useSelector((state) => state.userAccount.user);
  const userRole = user?.role;

  const filteredMenuItems = menuItems.filter(
    (item) =>
      !item.PermissionRoles || item.PermissionRoles.includes(Number(userRole))
  );

  const toggleDrawer = (state) => () => setOpen(state);
  const handleNavigate = (route) => {
    navigate(route);
    setOpen(false);
  };

  const isRTL = dir === "ltr";

  // useEffect(() => {
  //   console.log("Direction changed to:", dir);
  // }, [dir]);
  // useEffect(() => {
  //   console.log("👤 userRole:", userRole);
  //   console.log("📜 menuItems:", menuItems);
  // }, [userRole]);

  return (
    <>
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{
          color: palette.text,
          backgroundColor: "transparent",
          "&:hover": { backgroundColor: palette.surface },
        }}
      >
        <MenuIcon fontSize="large" />
      </IconButton>

      <Drawer
        key={dir}
        anchor={isRTL ? "left" : "left"}
        open={open}
        onClose={toggleDrawer(false)}
        transitionDuration={400}
        PaperProps={{
          sx: {
            width: 250,
            backgroundColor: palette.surface,
            color: palette.text,
            direction: dir,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: isRTL ? "flex-end" : "flex-start",
            px: 2,
            py: 1.5,
          }}
        >
          <IconButton
            onClick={toggleDrawer(false)}
            sx={{ color: palette.text }}
          >
            <CloseOutlinedIcon />
          </IconButton>
        </Box>

        <List sx={{ flexGrow: 1, px: 1 }}>
          {filteredMenuItems.map((item) => {
            const isSelected = location.pathname === item.route;
            return (
              <ListItemButton
                key={item.route}
                onClick={() => handleNavigate(item.route)}
                sx={{
                  display: "flex",
                  flexDirection: isRTL ? "row-reverse" : "row",
                  alignItems: "center",
                  justifyContent: isRTL ? "flex-end" : "flex-start",
                  textAlign: isRTL ? "left" : "left",
                  backgroundColor: isSelected
                    ? palette.primary.light
                    : "transparent",
                  color: isSelected
                    ? palette.text
                    : palette.textSecondary || palette.text,
                  "&:hover": {
                    backgroundColor: isSelected
                      ? palette.primary.main
                      : "rgba(0,0,0,0.05)",
                    color: palette.text,
                  },
                  borderRadius: "8px",
                  py: 1.2,
                  px: 1.5,
                  gap: 1,
                  transition: "background-color 0.3s ease, color 0.3s ease",
                }}
              >
                <ListItemText
                  primary={settings.texts[item.name]}
                  sx={{
                    "& .MuiListItemText-primary": {
                      fontSize: "1.2rem",
                      color: palette.text,
                    },
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>

        <Box sx={{ textAlign: "center", py: 2 }}>
          <Logo type="full" />
        </Box>
      </Drawer>
    </>
  );
};

export default BurgerMenu;
