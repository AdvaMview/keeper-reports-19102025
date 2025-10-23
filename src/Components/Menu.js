import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSettings } from "../Hooks/useSettings";
import { menuItems } from "../Config/Menu";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Logo from "./Logo";
import Button from "@mui/material/Button";

const Menu = ({ isOpen, handleClose }) => {
  const ref = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const palette = useSelector((state) => state.appSettings.selectedPalette);
  const settings = useSettings();
  const dir = settings?.direction || "ltr";
  const user = useSelector((state) => state.userAccount.user);
  const userRole = user?.role;

  const filteredMenuItems = menuItems.filter(
    (item) => !item.PermissionRoles || item.PermissionRoles.includes(userRole)
  );

  useEffect(() => {
    if (!ref.current) return;
    if (isOpen) {
      ref.current.classList.add("open");
      ref.current.classList.remove("close");
    } else {
      ref.current.classList.remove("open");
      ref.current.classList.add("close");
    }
  }, [isOpen]);

  const handleItemClick = (route) => {
    handleClose();
    navigate(route);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const isRTL = dir === "rtl";

  const styles = {
    container: {
      width: "15rem",
      height: "100vh",
      position: "fixed",
      top: 0,
      [isRTL ? "left" : "right"]: "-20rem",
      zIndex: 9,
    },
    closeIcon: {
      position: "absolute",
      top: 20,
      [isRTL ? "left" : "right"]: 20,
      cursor: "pointer",
      fontSize: "24px",
      color: palette.text,
    },
    menu: {
      backgroundColor: palette.surface,
      width: "15rem",
      height: "100%",
      paddingTop: "6rem",
      boxShadow: palette.boxShadow,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
    },
    menuContainer: {
      width: "100%",
      flexGrow: 1,
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      alignItems: "stretch",
      padding: "0 8px",
    },
    button: {
      width: "100%",
      height: "48px",
      justifyContent: "flex-start",
      fontSize: "1.1rem",
      textTransform: "none",
    },
    footer: {
      padding: "1rem 0",
      textAlign: "center",
    },
  };

  return (
    <>
      <style>
        {`
        .open {
          animation: ${
            isRTL ? "openFromLeft" : "openFromRight"
          } 0.6s ease-out forwards;
        }
        .close {
          animation: ${
            isRTL ? "closeToLeft" : "closeToRight"
          } 0.6s ease-in forwards;
        }

        @keyframes openFromRight {
          0% { right: -20rem; opacity: 0; }
          100% { right: 0; opacity: 1; }
        }

        @keyframes closeToRight {
          0% { right: 0; opacity: 1; }
          100% { right: -20rem; opacity: 0; }
        }

        @keyframes openFromLeft {
          0% { left: -20rem; opacity: 0; }
          100% { left: 0; opacity: 1; }
        }

        @keyframes closeToLeft {
          0% { left: 0; opacity: 1; }
          100% { left: -20rem; opacity: 0; }
        }
        `}
      </style>

      <div style={styles.container} ref={ref} dir={dir}>
        <div style={styles.closeIcon} onClick={handleClose}>
          <CloseOutlinedIcon fontSize="large" />
        </div>

        <div style={styles.menu}>
          <div style={styles.menuContainer}>
            {filteredMenuItems.map((item) => {
              const isSelected = location.pathname === item.route;
              return (
                <Button
                  key={item.route}
                  onClick={() => handleItemClick(item.route)}
                  style={{
                    ...styles.button,
                    // flexDirection: isRTL ? "row-reverse" : "row",
                    flexDirection: "row-reverse",
                    justifyContent: isRTL ? "flex-end" : "flex-start",
                    textAlign: isRTL ? "right" : "left",
                    background: isSelected
                      ? palette.primary.light
                      : "transparent",
                    color: isSelected
                      ? palette.text
                      : palette.textSecondary || palette.text,
                    gap: "8px", 
                    paddingInline: "12px", 
                  }}
                >
                  {item.icon && (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {item.icon}
                    </span>
                  )}
                  <span>{settings.texts[item.name]}</span>
                </Button>
              );
            })}
          </div>

          <div style={styles.footer}>
            <Logo type="full" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
