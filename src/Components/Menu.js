import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useSelector } from "react-redux";

const Menu = ({ isOpen, handleClose }) => {
  const ref = useRef();
  const navigate = useNavigate();
  const palette = useSelector((state) => state.appSettings.selectedPalette);

  useEffect(() => {
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

  const styles = {
    container: {
      width: "15rem",
      height: "100vh",
      position: "fixed",
      top: 0,
      right: "-20rem",
      zIndex: 7,
    },
    closeIcon: {
      position: "absolute",
      top: 20,
      right: 20,
      cursor: "pointer",
      fontSize: "24px",
    },
    menu: {
      backgroundColor: palette.surface,
      width: "15rem",
      height: "100%",
      paddingTop: "6rem",
      boxShadow: palette.boxShadow,
    },
    menuItem: {
      display: "flex",
      width: "100%",
      height: "6rem",
      flexWrap: "wrap",
      flexDirection: "row",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      borderBottom: palette.border,
      cursor: "pointer",
    },
    menuItemHeader: {
      fontSize: "1.5rem",
    },
    footer: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      textAlign: "center",
    },
  };

  return (
    <>
      <style>
        {`
        .menu-container {
          /* בכל מקרה, ריק */
        }
      
        .open {
          animation: openAni 0.7s ease-out forwards;
        }

        .close {
          animation: closeAni 0.7s ease-out forwards;
        }
      
        @keyframes openAni {
          0% { right: -20rem; }
          100% { right: 0; }
        }

        @keyframes closeAni {
          0% { right: 0; }
          100% { right: -20rem; }
        }
        `}
      </style>
      <div style={styles.container} ref={ref}>
        <div style={styles.closeIcon} onClick={handleClose}>
          <CloseOutlinedIcon />
        </div>
        <div style={styles.menu}>
          <div
            style={styles.menuItem}
            onClick={() => handleItemClick("/Dashboard")}
          >
            <div style={styles.menuItemHeader}>ראשי</div>
          </div>
          <div
            style={styles.menuItem}
            onClick={() => handleItemClick("/Reports")}
          >
            <div style={styles.menuItemHeader}>דוחות</div>
          </div>
          <div
            style={styles.menuItem}
            onClick={() => handleItemClick("/settings")}
          >
            <div style={styles.menuItemHeader}>הגדרות</div>
          </div>
        </div>
        <div style={styles.footer}>
          <Logo type="full" />
        </div>
      </div>
    </>
  );
};

export default Menu;
