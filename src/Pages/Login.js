import { login } from "../Utils/Api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userAccountSlice";
import { useSettings } from "../Hooks/useSettings";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  Box,
} from "@mui/material";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const palette = useSelector((state) => state.appSettings.selectedPalette);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const settings = useSettings();

  const dir = settings?.direction || "ltr"; // "ltr" | "rtl"

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName || !password) {
      setError("Please enter both user name and password.");
      return;
    }
    setError("");
    const fetchLogin = async (post) => {
      try {
        const result = await login(post);
        if (!result?.accessToken) {
          setError("Login failed: no token received.");
          return;
        }
        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem(
          "options",
          JSON.stringify({
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${result.accessToken}`,
            },
          })
        );

        dispatch(setUser(result));
        navigate("/Dashboard");
      } catch (err) {
        console.error("Login error:", err);
        setError("שם משתמש או סיסמה שגויים.");
      }
    };
    fetchLogin({ userName, password });
  };
  return (
    <Box
      dir={dir}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        minWidth: "100vw",
        background: palette.background,
        overflow: "hidden",
      }}
    >
      <Card
        sx={{
          width: 400,
          borderRadius: 3,
          boxShadow: palette.boxShadow,
          background: palette?.surface,
          color: palette?.text,
          border: `1px solid ${palette?.border}`,
          textAlign: dir === "rtl" ? "right" : "left",
        }}
      >
        <CardHeader
          title={settings.texts.ENTERANCE}
          titleTypographyProps={{
            variant: "h5",
            align: "center",
            sx: { color: palette?.primary, fontWeight: 600 },
          }}
        />

        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label={settings.texts.USERNAME}
              variant="outlined"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              margin="normal"
              placeholder={settings.texts.USERNAME}
              slotProps={{
                input: {
                  dir: dir,
                  style: { textAlign: dir === "rtl" ? "right" : "left" },
                },
              }}
              InputProps={{
                sx: {
                  color: palette?.text,
                  background: palette.background,
                  direction: dir,
                },
              }}
              InputLabelProps={{
                sx: { direction: dir },
              }}
            />

            <TextField
              fullWidth
              type="password"
              label={settings.texts.PASSWORD}
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              InputProps={{
                sx: {
                  color: palette.text,
                  background: palette.background,
                  direction: dir,
                },
              }}
              InputLabelProps={{
                sx: { direction: dir },
              }}
            />

            {error && (
              <Typography
                variant="body2"
                sx={{
                  color: palette?.error || "red",
                  mt: 1,
                  mb: 1,
                  background: palette?.surface,
                  p: 1,
                  borderRadius: 1,
                  direction: "ltr",
                  border: `1px solid ${palette?.error || "red"}`,
                }}
              >
                {error}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                py: 1.2,
                background: palette?.primary,
                color: palette?.onPrimary,
                fontWeight: 600,
                borderRadius: 2,
                "&:hover": {
                  background: palette?.primaryHover,
                },
              }}
            >
              {/* <h1 style={styles.title}>{settings.texts.APP_TITLE}</h1> */}
              {settings.texts.ENTER}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
