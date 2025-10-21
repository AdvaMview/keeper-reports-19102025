import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../Utils/Api";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useSettings } from "../Hooks/useSettings";

function Logout() {
  const palette = useSelector((state) => state.appSettings.selectedPalette);

  const navigate = useNavigate();
  const settings = useSettings();

  const fetchLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      navigate("/login");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <Button variant="contained" onClick={fetchLogout}>
       {settings.texts.LOG_OUT}
      </Button>
    </div>
  );
}

export default Logout;
