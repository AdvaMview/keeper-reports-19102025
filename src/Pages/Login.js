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
      setError(settings.texts.ERR_REQUIRED_FIELDS);
      return;
    }
    setError("");
    const fetchLogin = async (post) => {
      try {
        const result = await login(post);
        if (!result?.accessToken) {
          setError(settings.texts.ERR_NO_TOKEN);
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
        setError(settings.texts.ERR_INVALID_LOGIN);
      }
    };
    fetchLogin({ userName, password });
  };

  return (
    <Box
      dir={dir}
      sx={{
        minWidth: "100vW",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: palette.background,
        color: palette.text,
      }}
    >
      <Card sx={{ width: 400, p: 2, boxShadow: 3 }}>
        <CardHeader
          title={settings.texts.ENTERANCE}
          titleTypographyProps={{
            variant: "h5",
            align: "center",
            sx: { color: palette.primary },
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
                borderRadius: 1.5,
                "&:hover": {
                  background: palette?.primaryHover,
                },
              }}
            >
              {settings.texts.ENTER}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
