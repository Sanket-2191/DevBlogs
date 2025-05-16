import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'


import './index.css';
import App from './App.jsx';
import store from './store/store.js';
import Home from './Pages/Home.jsx';
import { AuthLayout } from './components/index.js';
import AllPostsPage from './Pages/AllPostsPage.jsx';
import AddPostPage from './Pages/AddPostPage.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import SignupPage from './Pages/SignupPage.jsx';
import EditPostPage from './Pages/EditPostPage.jsx';
import Post from './Pages/Post.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/signup',
        element: <SignupPage />
      },
      {
        path: '/all-posts',
        element: <AuthLayout>
          <AllPostsPage />
        </AuthLayout>
      },
      {
        path: '/add-post',
        element: <AuthLayout>
          <AddPostPage />
        </AuthLayout>
      },
      {
        path: '/edit-post/:slug',
        element: <AuthLayout>
          <EditPostPage />
        </AuthLayout>
      },
      {
        path: '/post/:slug',
        element: <AuthLayout>
          <Post />
        </AuthLayout>
      }


    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
