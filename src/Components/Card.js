// src/Components/Card.jsx
import { Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const Card = ({ title, subtitle, sx = {}, children }) => {
  const palette = useSelector((state) => state.appSettings.selectedPalette);

  return (
    <Paper
      elevation={4}
      sx={{
        borderRadius: 2,
        padding: 2,
        margin: 1,
        backgroundColor: palette.surface,
        color: palette.text,
        ...sx,
      }}
    >
      {title && (
        <Typography
          variant="h6"
          sx={{
            color: palette.primary.main,
            fontWeight: "bold",
            mb: 1,
          }}
        >
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography
          variant="subtitle2"
          sx={{ color: palette.textSecondary, mb: 1 }}
        >
          {subtitle}
        </Typography>
      )}
      {children}
    </Paper>
  );
};

export default Card;
