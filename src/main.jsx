import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/home';
import Genre from './pages/genre';
import Search from './pages/search';
import Manga from './pages/manga';
import Chapter from './pages/chapter';

import './main.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/genre/:genre',
    element: <Genre />,
  },
  {
    path: '/search/:search',
    element: <Search />,
  },
  {
    path: '/manga/:manga',
    element: <Manga />,
  },
  {
    path: '/chapter/:chapter',
    element: <Chapter />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
