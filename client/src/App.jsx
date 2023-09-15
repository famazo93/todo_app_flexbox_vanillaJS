import { useState, useEffect } from 'react'
import './App.css'
import Landing from './components/Landing';
import Todos from './components/Todos';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const getAuthStatus = async() => {
      const response = await fetch('http://localhost:3000/authentication');
      const status = await response.json();
      return status;
    };

    const {status} = getAuthStatus();
    status ? setLoggedIn(true) : setLoggedIn(false);
  }, []);

  return !loggedIn ? <Landing /> : <Todos />;
}

export default App
