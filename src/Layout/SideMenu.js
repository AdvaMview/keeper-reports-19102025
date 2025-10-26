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
    (item) => !item.PermissionRoles || item.PermissionRoles.includes(userRole)
  );
  
  const styles = {
    card: {
      width: MENU_WIDTH,
      height: "88vh",
      display: "flex",
      flexDirection: "column",
      padding: "8px",
      boxSizing: "border-box",
      background: palette.surface,
    },
    menuContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      flexGrow: 1,
      padding: "0 8px",
      overflowY: "auto",
    },
    button: {
      width: "100%",
      height: "48px",
      justifyContent: "flex-start",
      fontSize: "1.1rem",
    },
    logoContainer: {
      marginTop: "auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "33rem 0 8px 0",
    },
  };

  return (
    <Card dir={direction} style={styles.card}>
      <Box style={styles.menuContainer}>
        {filteredMenuItems.map((item) => {
          const isSelected = location.pathname === item.route;
          return (
            <Button
              key={item.route}
              onClick={() => navigate(item.route)}
              style={{
                ...styles.button,
                ...(isSelected
                  ? {
                      background: palette.primary.light,
                      color: palette.text,
                    }
                  : {}),
              }}
            >
              {item.icon && (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginInlineEnd: 8,
                  }}
                >
                  {item.icon}
                </span>
              )}
              <span>{texts[item.name]}</span>
            </Button>
          );
        })}
      </Box>

      <Box style={styles.logoContainer}>
        <Logo type="full" direction={direction} />
      </Box>
    </Card>
  );
};

export default SideMenu;
