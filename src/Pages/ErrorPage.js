import { useSelector } from "react-redux";

function ErrorPage() {
    const palette = useSelector(state => state.appSettings.selectedPalette);
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            background: palette.background,
            color: palette.error
        }}>
            <h1>Oops!</h1>
            <h2>Something went wrong.</h2>
            <p>Please try again later or contact support.</p>
        </div>
    );
}

export default ErrorPage;