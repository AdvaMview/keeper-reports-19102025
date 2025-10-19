import { MdHome, MdSettings, MdReport } from 'react-icons/md';
import { FaHome, FaCog, FaFileAlt } from 'react-icons/fa';

export const menuItems = [
    { name: 'HOME', route: '/', icon: <MdHome /> },
    // { name: 'DASHBOARD', route: '/dashboard', icon: <FaHome /> },
    { name: 'REPORTS', route: '/reports', icon: <MdReport /> },
    { name: 'SETTINGS', route: '/settings', icon: <MdSettings /> },    
];