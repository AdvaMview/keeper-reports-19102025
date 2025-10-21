import { useNavigate, useLocation } from "react-router-dom";
import { useSettings } from "../Hooks/useSettings";
import { menuItems } from "../Config/Menu";
import Logo from "../Components/Logo";
import Card from "../Components/Card";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";

const SideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { texts, MENU_WIDTH, direction } = useSettings();
  const palette = useSelector((state) => state.appSettings.selectedPalette);

  const styles = {
    button: {
      width: "100%",
      margin: "8px 0",
      height: "50px",
    },
    card: {
      width: MENU_WIDTH,
      height: "88vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "8px",
      boxSizing: "border-box",
      overflow: "hidden",
    },
    menuContainer: {
      flexGrow: 1,
      padding: "0 8px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
    },
    logoContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "12px 0",
    },
  };

  return (
    <Card dir={direction} style={styles.card}>
      <div style={styles.menuContainer}>
        {menuItems.map((item) => {
          const isSelected = location.pathname === item.route;
          return (
            <Button
              key={item.route}
              onClick={() => navigate(item.route)}
              style={{
                ...styles.button,
                ...(isSelected ? { background: palette.primary.light,
                    color: palette.text
                } : {}),
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
      </div>

      <div style={styles.logoContainer}>
        <Logo type="full" direction={direction} />
      </div>
    </Card>
  );
};

export default SideMenu;
