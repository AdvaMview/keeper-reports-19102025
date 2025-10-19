import { useTheme } from '../Hooks/useTheme';
import { useSelector } from "react-redux";

const Selector = ({ label, options, value, onChange, style }) => {
  const palette = useSelector(state => state.appSettings.selectedPalette);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      margin: "8px 0",
    },
    label: {
      fontSize: "14px",
      color: palette.textSecondary,
    },
    select: {
      padding: "8px 12px",
      borderRadius: palette.borderRadius,
      border: palette.border,
      backgroundColor: palette.surface,
      color: palette.text,
      fontSize: "14px",
      outline: "none",
      cursor: "pointer",
    },
  };

  return (
    <div style={{ ...styles.container, ...style }}>
      {label && <label style={styles.label}>{label}</label>}
      <select
        style={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Selector;
