import { use, useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
    const dir = settings?.direction || "rtl";
  const user = useSelector((state) => state.userAccount.user);
  const userRole = user?.role;
//   const dir = "rtl";

  const filteredMenuItems = menuItems.filter(
    (item) => !item.PermissionRoles || item.PermissionRoles.includes(userRole)
  );

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const handleNavigate = (route) => {
    navigate(route);
    setOpen(false);
  };

  const isRTL = dir === "rtl";
  useEffect(() => {
    console.log("Direction changed to:", dir);
  });
  return (
    <>
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{
          color: palette.text,
          backgroundColor: "transparent",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
        }}
      >
        <MenuIcon fontSize="large" />
      </IconButton>

      <Drawer
        anchor={isRTL ? "right" : "left"} // צד שבו הוא נצמד כשהוא פתוח
        open={open}
        onClose={toggleDrawer(false)}
        transitionDuration={400} // החלקה רכה
        SlideProps={{
          direction: isRTL ? "left" : "right", // הכיוון שממנו הוא נכנס
        }}
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
            justifyContent: "space-between",
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
                  justifyContent: "flex-start",
                  textAlign: isRTL ? "right" : "left",
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
                  transition: "background-color 0.3s ease, color 0.3s ease",
                  borderRadius: "8px",
                  py: 1.2,
                  px: 1.5,
                  gap: 1,
                }}
              >
                <ListItemText
                  primary={settings.texts[item.name]}
                  sx={{
                    textAlign: isRTL ? "right" : "left",
                    direction: isRTL ? "rtl" : "ltr",
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

        <Box
          sx={{
            textAlign: "center",
            py: 2,
          }}
        >
          <Logo type="full" />
        </Box>
      </Drawer>
    </>
  );
};

export default BurgerMenu;
