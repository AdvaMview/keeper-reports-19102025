import SideMenu from './SideMenu';
import Header from './Header';
import { useSelector } from "react-redux";
import { Outlet } from 'react-router-dom';

const Layout = () => {
    const palette = useSelector(state => state.appSettings.selectedPalette);    

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: palette.background }}>
            <Header />
            <div style={{ display: 'flex', flex: 1 }}>
                <SideMenu />
                <div style={{ flex: 1}}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;