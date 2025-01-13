import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Header } from './components/Header'
import { Home } from './pages/Home'
import { Posts } from './pages/Posts'
import { AddEditPosts } from './pages/AddEditPosts'
import { SearchPage } from './pages/SearchPage'
import { Auth } from './pages/Auth'
import PwReset from './pages/PwReset'
import { Profile } from './pages/Profile'
import { DeleteUser } from './pages/DeleteUser'
import { Post } from './pages/Post'

const router = createBrowserRouter([
  {element: <Header />, children: [
    {path: "/", element:<Home />},
    {path: "/posts", element:<Posts />},
    {path: "/search", element:<SearchPage />},
    {path: "/create", element:<AddEditPosts />},
    {path: "/update/:id", element:<AddEditPosts />},
    {path: "/auth/in", element:<Auth />},
    {path: "/auth/up", element:<Auth />},
    {path: "/pwreset", element:<PwReset />},
    {path: "/profile", element:<Profile />},
    {path: "/deleteUser", element:<DeleteUser />},
    {path: "/post/:id", element:<Post />},
  ]}
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
