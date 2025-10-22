import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { verifyLogOn } from "../Utils/Api";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useSettings } from "../Hooks/useSettings";

const PrivateRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);
  const settings = useSettings();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await verifyLogOn();
        setIsValid(result !== false);
      } catch (err) {
        console.error("Token verification failed:", err);
        setIsValid(false);
      }
    };
    checkAuth();
  }, []);

  if (isValid === null)
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
          gap: 2,
        }}
      >
        <CircularProgress size={30} thickness={4} />
        <Typography variant="h6" sx={{ color: "text.primary" }}>
         {settings.texts.LOADER_DATA}
        </Typography>
      </Box>
    );

  if (!isValid) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
