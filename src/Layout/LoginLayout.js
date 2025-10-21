import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header";
import Logo from "../Components/Logo";

const LoginLayout = () => {
  const palette = useSelector((state) => state.appSettings.selectedPalette);

  const styles = {
    container: {
      height: "100vh", 
      width: "100vw",  
      display: "flex",
      flexDirection: "column",
      background: palette?.background,
      overflow: "hidden",
    },
    inner: {
      flex: 1, 
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
    },
    header: {
      flexShrink: 0,
    },
    footer: {
      flexShrink: 0,
      marginBottom: "10px",
      textAlign: "center",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Header />
      </div>

      <div style={styles.inner}>
        <Outlet />
      </div>

      <div style={styles.footer}>
        <Logo type="full" />
      </div>
    </div>
  );
};

export default LoginLayout;
