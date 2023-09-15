import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/home/Home'
import Main from './pages/Main/Main'
import NotFound from './pages/notFound/NotFound'
const router = createBrowserRouter([
  {
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/search',
        element: <Main />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
])

export default router