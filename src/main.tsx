import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { store } from './store'
import { Provider } from 'react-redux'
import FavoritesFilmPage from './pages/FavoritesFilmPage.tsx'
import PageNotFound from './pages/PageNotFound.tsx'
import HomePage from './pages/HomePage.tsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/favorites',
        element: <FavoritesFilmPage />,
      }
    ]
  },
])

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
