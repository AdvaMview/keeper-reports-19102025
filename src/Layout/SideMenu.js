import { useNavigate, useLocation } from "react-router-dom";
import { useSettings } from "../Hooks/useSettings";
import { menuItems } from "../Config/Menu";
import Logo from "../Components/Logo";
import Card from "../Components/Card";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

const SideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { texts, MENU_WIDTH, direction } = useSettings();
  const palette = useSelector((state) => state.appSettings.selectedPalette);

   const user = useSelector((state) => state.userAccount.user);
  const userRole = user?.role;

  const filteredMenuItems = menuItems.filter(
    (item) => !item.PermissionRoles || item.PermissionRoles.includes(userRole)
  );
  
  const styles = {
    card: {
      width: MENU_WIDTH,
      height: "88vh",
      display: "flex",
      flexDirection: "column",
      padding: "8px",
      boxSizing: "border-box",
      background: palette.surface,
    },
    menuContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      flexGrow: 1,
      padding: "0 8px",
      overflowY: "auto",
    },
    button: {
      width: "100%",
      height: "48px",
      justifyContent: "flex-start",
      fontSize: "1.1rem",
    },
    logoContainer: {
      marginTop: "auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "33rem 0 8px 0",
    },
  };

  return (
    <Card dir={direction} style={styles.card}>
      <Box style={styles.menuContainer}>
        {filteredMenuItems.map((item) => {
          const isSelected = location.pathname === item.route;
          return (
            <Button
              key={item.route}
              onClick={() => navigate(item.route)}
              style={{
                ...styles.button,
                ...(isSelected
                  ? {
                      background: palette.primary.light,
                      color: palette.text,
                    }
                  : {}),
              }}
            >
              {item.icon && (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginInlineEnd: 8,
                  }}
                >
                  {item.icon}
                </span>
              )}
              <span>{texts[item.name]}</span>
            </Button>
          );
        })}
      </Box>

      <Box style={styles.logoContainer}>
        <Logo type="full" direction={direction} />
      </Box>
    </Card>
  );
};

export default SideMenu;

// import { Box, Button, Paper } from "@mui/material";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useSettings } from "../Hooks/useSettings";
// import { menuItems } from "../Config/Menu";
// import Logo from "../Components/Logo";
// import { useSelector } from "react-redux";

// const SideMenu = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { texts, MENU_WIDTH, direction } = useSettings();
//   const palette = useSelector((state) => state.appSettings.selectedPalette);

//   return (
//     <Paper
//       dir={direction}
//       elevation={0}
//       sx={{
//         width: MENU_WIDTH,
//         height: "calc(100vh - 80px)",
//         display: "flex",
//         flexDirection: "column",
//         backgroundColor: palette.surface,
//         color: palette.text,
//         boxSizing: "border-box",
//         overflow: "hidden",
//         p: 1,

//         borderRight: "1px solid rgba(0, 0, 0, 0.15)",
//         // borderRight: "1px solid rgba(255, 255, 255, 0.15)",
//       }}
//     >
//       <Box sx={{ flexGrow: 1 }}>
//         {menuItems.map((item) => {
//           const isSelected = location.pathname === item.route;
//           return (
//             <Button
//               key={item.route}
//               onClick={() => navigate(item.route)}
//               sx={{
//                 justifyContent:
//                   direction === "rtl" ? "flex-end" : "flex-start",
//                 flexDirection: direction === "rtl" ? "row-reverse" : "row",
//                 textTransform: "none",
//                 height: 48,
//                 width: "100%",
//                 fontSize: "1.05rem",
//                 fontWeight: 500,
//                 borderRadius: 1,
//                 color: isSelected
//                   ? palette.text
//                   : palette.textSecondary || palette.text,
//                 backgroundColor: isSelected
//                   ? palette.primary.light
//                   : "transparent",
//                 "&:hover": {
//                   backgroundColor: isSelected
//                     ? palette.primary.main
//                     : "rgba(0,0,0,0.05)",
//                 },
//                 gap: 1.5,
//                 px: 2,
//               }}
//             >
//               {item.icon}
//               <span>{texts[item.name]}</span>
//             </Button>
//           );
//         })}
//       </Box>

//       <Box
//         sx={{
//           mt: "auto",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           py: 2,
//         }}
//       >
//         <Logo type="full" direction={direction} />
//       </Box>
//     </Paper>
//   );
// };

// export default SideMenu;
