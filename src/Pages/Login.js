import { login } from '../Utils/Api';
import { useNavigate } from "react-router-dom";
//import { palette } from '../Hooks/themeSignal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userAccountSlice';
import { useSelector } from "react-redux";

const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const palette = useSelector(state => state.appSettings.selectedPalette);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Replace with your authentication logic
        if (userName === '' || password === '') {
            setError('Please enter both userName and password.');
            return;
        }
        setError('');
        const fetchLogin = async (post) => {
            const result = await login(post);
            dispatch(setUser(result));
            localStorage.setItem('accessToken', result.accessToken);
            navigate('/Dashboard');
        }
        fetchLogin({ userName, password });
        //alert('Logged in!');
    };

    const handleLogin = () => {
        localStorage.setItem('accessToken', 'test-token');
        window.location.href = '/';
    };

    return (
        <div
            style={{
                maxWidth: 400,
                margin: '40px auto',
                padding: 24,
                border: palette.border,
                borderRadius: 8,
                background: palette.surface,
                color: palette.text,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}
        >
            <h2 style={{ color: palette.primary, marginBottom: 24 }}>Login</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ color: palette.textSecondary }}>User Name:</label>
                    <input
                        type="text"
                        value={userName}
                        onChange={e => setUserName(e.target.value)}
                        style={{
                            width: '100%',
                            padding: 8,
                            marginTop: 4,
                            border: palette.border,
                            borderRadius: 4,
                            background: palette.background,
                            color: palette.text
                        }}
                        required
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <label style={{ color: palette.textSecondary }}>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        style={{
                            width: '100%',
                            padding: 8,
                            marginTop: 4,
                            border: palette.border,
                            borderRadius: 4,
                            background: palette.background,
                            color: palette.text
                        }}
                        required
                    />
                </div>
                {error && (
                    <div style={{
                        color: palette.error,
                        marginBottom: 16,
                        background: palette.background,
                        padding: 8,
                        borderRadius: 4,
                        border: palette.error
                    }}>
                        {error}
                    </div>
                )}
                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: 10,
                        background: palette.primary,
                        color: palette.text,
                        border: 'none',
                        borderRadius: 4,
                        fontWeight: 500,
                        fontSize: '1rem',
                        cursor: 'pointer',
                        marginBottom: 8
                    }}
                >
                    Login
                </button>
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
    );
};

export default Login;