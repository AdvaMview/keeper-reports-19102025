import { useSelector } from "react-redux";
import { Box, Typography, Paper } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ErrorPage = () => {
  const palette = useSelector((state) => state.appSettings.selectedPalette);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: palette.background,
        color: palette.text,
        p: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          textAlign: "center",
          p: 4,
          borderRadius: 3,
          backgroundColor: palette.surface,
          color: palette.text,
          boxShadow: `0 4px 12px ${palette.primary.main}22`,
          maxWidth: 400,
        }}
      >
        <ErrorOutlineIcon
          sx={{
            fontSize: 60,
            color: palette.error || palette.primary.main,
            mb: 2,
          }}
        />
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          Oops!
        </Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Something went wrong
        </Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>
          Please try again later or contact support.
        </Typography>
      </Paper>
    </Box>
  );
};

export default ErrorPage;
