import { login } from "../Utils/Api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userAccountSlice";
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


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userName || !password) {
      setError("Please enter both user name and password.");
      return;
    }
    setError("");
    const fetchLogin = async (post) => {
      const result = await login(post);
      dispatch(setUser(result));
      localStorage.setItem("accessToken", result.accessToken);
      navigate("/Dashboard");
    };
    fetchLogin({ userName, password });
  };


  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: palette.background,
        }}
      >
        <Card
          sx={{
            width: 400,
            borderRadius: 3,
            boxShadow: palette.boxShadow  ,
            background: palette?.surface ,
            color: palette?.text ,
            border: `1px solid ${palette?.border}`,
          }}
        >
          <CardHeader
            title="Login"
            titleTypographyProps={{
              variant: "h5",
              align: "center",
              sx: { color: palette?.primary , fontWeight: 600 },
            }}
          />

          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="User Name"
                variant="outlined"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                margin="normal"
                InputProps={{
                  sx: {
                    color: palette?.text,
                    background: palette.background,
                  },
                }}
              />

              <TextField
                fullWidth
                type="password"
                label="Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
          
                InputProps={{
                  sx: {
                    color: palette?.text,
                    background: palette.background,
                  },
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
                  background: palette?.primary ,
                  color: palette?.onPrimary ,
                  fontWeight: 600,
                  borderRadius: 2,
                  "&:hover": {
                    background: palette?.primaryHover,
                  },
                }}
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default Login;
