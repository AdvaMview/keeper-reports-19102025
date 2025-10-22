import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { verifyLogOn } from "../Utils/Api";

const PrivateRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);

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

  if (isValid === null) return <div>טוען נתוני גישה...</div>;
 
  if (!isValid) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;