import { Box, Container } from "@mui/material";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Logo from "../Components/Logo";

const LoginLayout = () => {
  const palette = useSelector((state) => state.appSettings.selectedPalette);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        backgroundColor: palette.background,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          flexShrink: 0,
          boxShadow: "none",
        }}
      >
        <Header />
      </Box>
      <Container
        maxWidth="sm"
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          py: 4,
        }}
      >
        <Outlet />
      </Container>
      <Box
        sx={{
          flexShrink: 0,
          textAlign: "center",
          py: 2,
        }}
      >
        <Logo type="full" />
      </Box>
    </Box>
  );
};

export default LoginLayout;
