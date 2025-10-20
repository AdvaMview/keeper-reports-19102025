import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../Utils/Api";
import { Button } from "@mui/material";

function Logout() {
  const navigate = useNavigate();

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
      <Button variant="contained" color="error" onClick={fetchLogout}>
        התנתק
      </Button>
    </div>
  );
}

export default Logout;
