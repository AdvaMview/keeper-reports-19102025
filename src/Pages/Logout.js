import { useNavigate } from "react-router-dom";
import { logout } from "../Utils/Api";

export const useLogout = () => {
  const navigate = useNavigate();

  return async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      navigate("/login");
    }
  };
};
