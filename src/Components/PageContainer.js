// src/Components/PageContainer.jsx
import { Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Card from "../Components/Card";

const PageContainer = ({ title, children }) => {
  const palette = useSelector((state) => state.appSettings.selectedPalette);

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        // backgroundColor: palette.background,
        padding: 0,
        margin: 0,
      }}
    >
      <Card>
        {title && (
          <Typography
            variant="h5"
            sx={{
              color: palette.text,
              fontWeight: "bold",
              mb: 2,
            }}
          >
            {title}
          </Typography>
        )}

        <div style={{ flex: 1 }}>{children}</div>
      </Card>
    </Container>
  );
};

export default PageContainer;
