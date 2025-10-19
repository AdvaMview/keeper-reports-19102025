import "./Menu.css";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../Logo";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorredOutlined";

const Menu = ({ isOpen, handleClose }) => {
  const ref = useRef();
  const navigate = useNavigate();

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

  return (
    <div className="menu-container" ref={ref}>
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          cursor: "pointer",
          fontSize: "24px",
        }}
        onClick={handleClose}
      >
        <CloseOutlinedIcon />
      </div>
      <div className="menu">
        <div
          className="menu-item"
          onClick={() => handleItemClick("/Dashboard")}
        >
          <div className="menu-item-header">ראשי</div>
          {/* <HomeOutlinedIcon></HomeOutlinedIcon> */}
        </div>
        <div className="menu-item" onClick={() => handleItemClick("/Reports")}>
          <div className="menu-item-header">דוחות</div>
          {/* <ReportGmailerrorredOutlinedIcon></ReportGmailerrorredOutlinedIcon> */}
        </div>
        <div className="menu-item" onClick={() => handleItemClick("/settings")}>
          <div className="menu-item-header">הגדרות</div>
          {/* <SettingsOutlinedIcon></SettingsOutlinedIcon> */}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Logo type="full" />
      </div>
    </div>
  );
};
export default Menu;
