import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import AssessmentIcon from "@mui/icons-material/Assessment";

export const menuItems = [
  {
    name: "HOME",
    route: "/",
    icon: <HomeIcon />,
    PermissionRoles: [1, 2],
  },
  {
    name: "REPORTS",
    route: "/reports",
    icon: <AssessmentIcon />,
    PermissionRoles: [1, 2],
  },
  {
    name: "SETTINGS",
    route: "/settings",
    icon: <SettingsIcon />,
    PermissionRoles: [1],
  },
];
