import { Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";

const LoginLayout = () => {
    const palette = useSelector(state => state.appSettings.selectedPalette);

    return (
        <div style={{            
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: palette.background,            
        }}>
            <Outlet />
        </div>
    );
};

export default LoginLayout;
