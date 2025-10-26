import { Box, Typography, Paper } from "@mui/material";
import { useSelector } from "react-redux";

const PageContainer = ({ title, children }) => {
  const palette = useSelector((state) => state.appSettings.selectedPalette);

  return (
    <Box
      sx={{
        // height: "calc(100vh - 80px)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Paper
        elevation={2}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          p: 3,
          borderRadius: 2,
          backgroundColor: palette.surface,
          color: palette.text,
          boxShadow: "none",
        }}
      >
        {title && (
          <Typography
            variant="h5"
            sx={{
              color: palette.primary.main,
              fontWeight: "bold",
              mb: 2,
            }}
          >
            {title}
          </Typography>
        )}

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
          }}
        >
          {children}
        </Box>
      </Paper>
    </Box>
  );
};

export default PageContainer;
