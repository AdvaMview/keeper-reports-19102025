//import './App.css';
import Routes from './Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSettings } from './Hooks/useSettings';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  const settings = useSettings();
  return (
    <Provider store={store}>
      <div dir={settings.DIRECTION}>
        <Router>
          <Routes />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
