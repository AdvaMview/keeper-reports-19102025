import { useNavigate, useLocation } from 'react-router-dom';
import { useSettings } from '../Hooks/useSettings';
import { menuItems } from '../Config/Menu';
import Logo from '../Components/Logo';
import Card from '../Components/Card';
// import Button from '../Components/Button';
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";

const SideMenu = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { texts, MENU_WIDTH } = useSettings();
    const palette = useSelector(state => state.appSettings.selectedPalette);

    const styles = {
        button: {
            width: '100%',
            margin: '8px 0',
            height: '50px',
        },
        card: {
            //minWidth: '200px',
            minHeight: '70vh',
            marginTop: '0px',
            gap: '12px',
        },
    }

    return (
        <Card style={{ ...styles.card, width: MENU_WIDTH, display: 'flex', flexDirection: 'column', position: 'relative', height: '88vh' }}>

            <div style={{ flexGrow: 1, padding: '0 8px' }}>
                {menuItems.map(item => {
                    const isSelected = location.pathname === item.route;
                    return (
                        <Button
                            key={item.route}
                            onClick={() => navigate(item.route)}
                            style={{
                                ...styles.button,
                                ...(isSelected ? { background: palette.primary.light } : {}),
                            }}>
                            {item.icon && (
                                <span style={{ display: 'flex', alignItems: 'center' }}>
                                    {item.icon}
                                </span>
                            )}
                            <span>{texts[item.name]}</span>
                        </Button>
                    );
                })}
            </div>
            <div style={{ position: 'absolute', bottom: 0, width: '100%', textAlign: 'center' }}>
                <Logo type={"full"} />
            </div>
        </Card>
    );
};

export default SideMenu;