import { login } from "../Utils/Api";
import { useNavigate } from "react-router-dom";
//import { palette } from '../Hooks/themeSignal';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userAccountSlice";
import { useSelector } from "react-redux";
import { Toggle } from "../Components/Toggle";
import { useTheme } from "../Hooks/useTheme";
import Button from "@mui/material/Button";
import { Input } from '@mui/material';

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const palette = useSelector((state) => state.appSettings.selectedPalette);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectPalette } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your authentication logic
    if (userName === "" || password === "") {
      setError("Please enter both userName and password.");
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
    //alert('Logged in!');
  };

  const handleLogin = () => {
    localStorage.setItem("accessToken", "test-token");
    window.location.href = "/";
  };
  const currentPalette = (palette?.name || palette?.value || "light")
    .toString()
    .toLowerCase();

  const handleTogglePalette = () => {
    const next = currentPalette === "dark" ? "light" : "dark";
    selectPalette(next);
  };
  return (
    <>
      <div>
        <Toggle
          handleChange={handleTogglePalette}
          isChecked={currentPalette === "dark"}
        />
      </div>

      <div
        style={{
          maxWidth: 400,
          margin: "40px auto",
          padding: 24,
          border: palette.border,
          borderRadius: 8,
          background: palette.surface,
          color: palette.text,
          boxShadow: "0 2px 8px rgba(240, 0, 0, 0.08)",
        }}
      >
        <h2 style={{ color: palette.primary, marginBottom: 24 }}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: palette.textSecondary }}>User Name:</label>
            <Input></Input>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: palette.textSecondary }}>Password:</label>
            <Input></Input>
          </div>
          {error && (
            <div
              style={{
                color: palette.error,
                marginBottom: 16,
                background: palette.background,
                padding: 8,
                borderRadius: 4,
                border: palette.error,
              }}
            >
              {error}
            </div>
          )}
          <Button type="submit">Login</Button>
        </form>
        {/* <button
                onClick={handleLogin}
                style={{
                    width: '100%',
                    padding: 10,
                    background: palette.secondary,
                    color: palette.text,
                    border: 'none',
                    borderRadius: 4,
                    fontWeight: 500,
                    fontSize: '1rem',
                    cursor: 'pointer'
                }}
            >
                Login with Test Token
            </button> */}
      </div>
    </>
  );
};

export default Login;
