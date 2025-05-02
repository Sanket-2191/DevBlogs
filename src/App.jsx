import { useState } from 'react'
import './App.css'
import AuthService, { authService } from './appwrite/auth.js'

function App() {
  const [count, setCount] = useState(0)
  const auth = new AuthService();
  console.log(auth);

  return (
    <>
      <h1>DevBlog - Blogs for web-development</h1>
    </>
  )
}

export default App
