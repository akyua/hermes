import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/about" Component={About} />
        <Route exact path="/login" Component={Login} />
      </Routes>
    </Router>
  );
}

export default App;
