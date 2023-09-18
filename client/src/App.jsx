import { useState, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Cookies from 'js-cookie';
import './App.css'
import Landing from './components/Landing';
import Todos from './components/Todos';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Todos />
  },
  {
    path: "/login",
    element: <Landing />
  }
])


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const status = Cookies.get('authenticated');
    status ? setLoggedIn(true) : setLoggedIn(false);
  }, []);

  return !loggedIn? (
    <Landing />
  ) : (
      <RouterProvider router={router} />
  )
}

export default App
