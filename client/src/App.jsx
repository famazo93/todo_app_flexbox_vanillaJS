import { useState, useEffect } from 'react'
import Cookies from 'js-cookie';
import './App.css'
import Landing from './components/Landing';
import Todos from './components/Todos';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const status = Cookies.get('authenticated');
    if (status) {
      setLoggedIn(true);
      setUser(Cookies.get('user'));
    } else {
      setLoggedIn(false);
      setUser(null);
    }
  }, []);

  return !loggedIn? <Landing /> : <Todos user={user} />
}

export default App
