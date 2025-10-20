import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header";

const LoginLayout = () => {
  const palette = useSelector((state) => state.appSettings.selectedPalette);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background: palette.background,
      }}
    >
      <Header />
      <Outlet />
    </div>
  );
};

export default LoginLayout;
