import { useSettings } from "../Hooks/useSettings";
import { useSelector } from "react-redux";

const Button = ({ onClick, style, children }) => {
    const { texts } = useSettings();
    //const palette = useSelector(state => state.appSettings.selectedPalette);
    const palette = useSelector(state => state.appSettings.selectedPalette);

    return (<button
        onClick={onClick}
        style={{
            padding: '10px 16px',
            borderRadius: '6px',
            border: 'none',
            background: palette.background,
            color: palette.text,
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            fontSize: '16px',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            flexDirection: texts.direction === 'rtl' ? 'row-reverse' : 'row',
            justifyContent: 'flex-start',
            gap: '8px',
            ...style
        }}
        dir={texts.direction}
    >
        {children}
    </button>
    )
}

export default Button;