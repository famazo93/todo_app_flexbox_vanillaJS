import { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import './App.css'
import Landing from './components/Landing';
import Todos from './components/Todos';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const status = Cookies.get('authenticated');
    status ? setLoggedIn(true) : setLoggedIn(false);
  }, []);

  return !loggedIn ? <Landing /> : <Todos />;
}

export default App
