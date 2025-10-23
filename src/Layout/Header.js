import {
  Box,
  Typography,
  Paper,
  useMediaQuery,
} from "@mui/material";
import { useSettings } from "../Hooks/useSettings";
import { useSelector } from "react-redux";
import SettingsUser from "../Pages/SettingsUser";
import { useLocation } from "react-router-dom";
import BurgerMenu from "../Components/BurgerMenu";

const Header = () => {
  const settings = useSettings();
  const palette = useSelector((state) => state.appSettings.selectedPalette);
  const user = useSelector((state) => state.userAccount?.user);
  const dir = settings?.direction || "ltr";
  const location = useLocation();
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isLoginPage = location.pathname.toLowerCase().includes("/login");

  document.documentElement.dir = dir;
  const isRTL = dir === "rtl";

  return (
    <Paper
      elevation={0}
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        width: "100%",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        px: 2,
        backgroundColor: palette.surface,
        color: palette.text,
        boxShadow: "none",
        direction: dir,
      }}
    >
      <Box sx={{ order: isRTL ? 3 : 1 }}>
        <SettingsUser />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          minWidth: 200,
          justifyContent: isRTL ? "flex-end" : "flex-start",
          gap: 1.5,
          fontWeight: 500,
          order: isRTL ? 2 : 2,
        }}
      >
        <Typography variant="body1">
          {user?.firstName || settings.texts.GUEST}
        </Typography>
      </Box>

      <Typography
        variant="h5"
        sx={{
          flexGrow: 1,
          textAlign: "center",
          fontWeight: 600,
          fontFamily: "Assistant, sans-serif",
          color: palette.text,
          order: isRTL ? 1 : 3, 
        }}
      >
        {settings.texts.APP_TITLE}
      </Typography>

      {!isLoginPage && isTablet && (
        <Box sx={{ order: isRTL ? 1 : 3 }}>
          <BurgerMenu />
        </Box>
      )}
    </Paper>
  );
};

export default Header;

// import {
//   Box,
//   Typography,
//   Paper,
//   useMediaQuery,
// } from "@mui/material";
// import { useSettings } from "../Hooks/useSettings";
// import { useSelector } from "react-redux";
// import SettingsUser from "../Pages/SettingsUser";
// import { useLocation } from "react-router-dom";
// import BurgerMenu from "../Components/BurgerMenu";

// const Header = () => {
//   const settings = useSettings();
//   const palette = useSelector((state) => state.appSettings.selectedPalette);
//   const user = useSelector((state) => state.userAccount?.user);
//   const dir = settings?.direction || "ltr";
//   const location = useLocation();
//   const isTablet = useMediaQuery("(max-width: 1024px)");
//   const isLoginPage = location.pathname.toLowerCase().includes("/login");

//   document.documentElement.dir = dir;
//   const isRTL = dir === "rtl";

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         position: "sticky",
//         top: 0,
//         zIndex: 20,
//         width: "100%",
//         height: 60,
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         flexDirection: isRTL ? "row-reverse" : "row",
//         px: 2,
//         backgroundColor: palette.surface,
//         color: palette.text,
//         boxShadow: "none",
//         direction: dir,
//       }}
//     >
//       {/* ===== צד ראשון (BurgerMenu) ===== */}
//       {!isLoginPage && isTablet && (
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <BurgerMenu />
//         </Box>
//       )}

//       {/* ===== כותרת במרכז ===== */}
//       <Typography
//         variant="h5"
//         sx={{
//           flexGrow: 1,
//           textAlign: "center",
//           fontWeight: 600,
//           fontFamily: "Assistant, sans-serif",
//           color: palette.text,
//         }}
//       >
//         {settings.texts.APP_TITLE}
//       </Typography>

//       {/* ===== אזור המשתמש ===== */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           minWidth: 200,
//           justifyContent: isRTL ? "flex-start" : "flex-end",
//           flexDirection: isRTL ? "row-reverse" : "row", // 💥 זה מה שהופך הכל באמת
//           gap: 1.5,
//           fontWeight: 500,
//         }}
//       >
//         {!isLoginPage && <SettingsUser />}
//         <Typography variant="body1">
//           {user?.firstName || settings.texts.GUEST}
//         </Typography>
//       </Box>
//     </Paper>
//   );
// };

// export default Header;
