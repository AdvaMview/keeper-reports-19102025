import { useNavigate, useLocation } from "react-router-dom";
import { useSettings } from "../Hooks/useSettings";
import { menuItems } from "../Config/Menu";
import Logo from "../Components/Logo";
import Card from "../Components/Card";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

const SideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { texts, MENU_WIDTH, direction } = useSettings();
  const palette = useSelector((state) => state.appSettings.selectedPalette);
  const user = useSelector((state) => state.userAccount.user);
  const userRole = user?.role;

  const filteredMenuItems = menuItems.filter(
    (item) =>
      !item.PermissionRoles || item.PermissionRoles.includes(Number(userRole))
  );

  return (
    <Card
      dir={direction}
      sx={{
        width: MENU_WIDTH,
        height: "calc(100vh - 80px)",
        display: "flex",
        flexDirection: "column",
        background: palette.surface,
        boxSizing: "border-box",
        p: 1,
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          pb: 10,
        }}
      >
        {filteredMenuItems.map((item) => {
          const isSelected = location.pathname === item.route;
          return (
            <Button
              key={item.route}
              onClick={() => navigate(item.route)}
              sx={{
                justifyContent: "flex-start",
                textAlign: "left",
                color: isSelected ? palette.text : palette.textSecondary,
                backgroundColor: isSelected
                  ? palette.primary.light
                  : "transparent",
                fontSize: "1.1rem",
                height: 48,
                borderRadius: 1,
                "&:hover": {
                  backgroundColor: isSelected
                    ? palette.primary.main
                    : palette.primary.background,
                  color: palette.text,
                },
              }}
            >
              {item.icon && (
                <Box
                  component="span"
                  sx={{ display: "flex", alignItems: "center", mr: 1 }}
                >
                  {item.icon}
                </Box>
              )}
              {texts[item.name]}
            </Button>
          );
        })}
      </Box>
      <Box
        sx={{
          flexShrink: 0,
          textAlign: "center",
          py: 2,
        }}
      >
        <Logo type="full" direction={direction} />
      </Box>
    </Card>
  );
};

export default SideMenu;
