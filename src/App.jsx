import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import './App.css'
import AuthService, { authService } from './appwrite/auth.js';
import { login, logout } from './store/authSlice.js';
import { Footer, Header } from './components/index.js';

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

  return loading ? <h1>Loading...</h1> : (
    <>
      <div className='min-h-[100vh] min-w-[100vw] flex flex-col justify-between'>
        <Header />
        <main className='bg-gray-600' >
          Dev Blogs here...
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
