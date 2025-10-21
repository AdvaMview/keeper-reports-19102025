import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
import { useSettings } from "./Hooks/useSettings";

function App() {
  const settings = useSettings();

  return (
    <div dir={settings.DIRECTION}>
      <Router>
        <Routes />
      </Router>
    </div>
  );
}

export default App;
