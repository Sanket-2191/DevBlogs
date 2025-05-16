import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import './App.css'
import AuthService, { authService } from './appwrite/auth.js';
import { login, logout } from './store/authSlice.js';
import { Footer, Header } from './components/index.js';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrUser()
      .then((user) => {
        if (user) {
          dispatch(login({ user }))
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      })
  }
    , []
  )

  return !loading ? (
    <div className='min-h-screen flex flex-col bg-gray-400'>
      <Header />
      <main className='flex-1 bg-background'>
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : <h1>Loading...</h1>

}

export default App
