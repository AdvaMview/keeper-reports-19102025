import { useTheme } from "../Hooks/useTheme";
import { useSelector } from "react-redux";

const Card = ({ title, subtitle, style, children }) => {
  const palette = useSelector((state) => state.appSettings.selectedPalette);
  
  const styles = {
    card: {
      border: palette.border,
      borderRadius: palette.borderRadius || "8px",
      background: palette.surface,
      color: palette.text,
      padding: "8px",
      margin: "8px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    },
    title: {
      color: palette.primary.main,
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "8px",
    },
    subtitle: {
      color: palette.textSecondary,
      fontSize: "14px",
      marginBottom: "12px",
    },
    content: {
      fontSize: "14px",
    },
  };

  return (
    <div style={{ ...styles.card, ...style }}>
      {title && <div style={styles.title}>{title}</div>}
      {subtitle && <div style={styles.subtitle}>{subtitle}</div>}
      <div style={styles.content}>{children}</div>
    </div>
    // <div style={{ ...styles.card, ...style }}>{children}</div>
  );
};

export default Card;
