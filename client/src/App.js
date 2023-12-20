import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreatePost from './pages/CreatePost/CreatePost';
import { UserContextProvider } from './UserContext';

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/about" Component={About} />
          <Route exact path="/login" Component={Login} />
          <Route exact path="/register" Component={Register} />
          <Route exact path="/create" Component={CreatePost} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
