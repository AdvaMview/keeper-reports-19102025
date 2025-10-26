import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
  useTheme, 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userAccountSlice";
import { login } from "../Utils/Api";
import { useSettings } from "../Hooks/useSettings"; 

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const palette = useSelector((state) => state.appSettings.selectedPalette);
  const { texts } = useSettings(); 
  const theme = useTheme(); 
  const dir = theme.direction;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName || !password) {
      setError(texts.ERR_REQUIRED_FIELDS);
      return;
    }
    setError("");

    const fetchLogin = async (post) => {
      try {
        const result = await login(post);
        if (!result?.accessToken) {
          setError(texts.ERR_NO_TOKEN);
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
        setError(texts.ERR_INVALID_LOGIN);
      }
    };

    fetchLogin({ userName, password });
  };

  return (
    <Box
      sx={{
        minWidth: "100vw",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: palette.background,
        color: palette.text,
      }}
    >
      <Card sx={{ width: 400, p: 2, boxShadow: 3 }}>
        <CardHeader
          title={texts.ENTERANCE}
          titleTypographyProps={{
            variant: "h5",
            align: "center",
            sx: { color: palette.primary },
          }}
        />

        <CardContent>
          <form onSubmit={handleSubmit} dir={dir}>
            <TextField
              fullWidth
              label={texts.USERNAME}
              variant="outlined"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              margin="normal"
              inputProps={{
                style: { textAlign: dir === "rtl" ? "right" : "left" },
              }}
              InputProps={{
                sx: {
                  color: palette.text,
                  background: palette.surface,
                },
              }}
            />

            <TextField
              fullWidth
              type="password"
              label={texts.PASSWORD}
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              inputProps={{
                style: { textAlign: dir === "rtl" ? "right" : "left" },
              }}
              InputProps={{
                sx: {
                  color: palette.text,
                  background: palette.surface,
                },
              }}
            />

            {error && (
              <Typography
                variant="body2"
                sx={{
                  color: palette.error || "red",
                  mt: 1,
                  mb: 1,
                  background: palette.surface,
                  p: 1,
                  borderRadius: 1,
                  border: `1px solid ${palette.error || "red"}`,
                  textAlign: dir === "rtl" ? "right" : "left",
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
                background: palette.primary.main,
                color: palette.onPrimary,
                fontWeight: 600,
                borderRadius: 1.5,
                "&:hover": {
                  background: palette.primary.dark || palette.primary.main,
                },
              }}
            >
              {texts.ENTER}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
