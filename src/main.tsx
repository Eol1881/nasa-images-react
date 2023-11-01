import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './routes/root';
import ErrorPage from './components/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div className="container mx-auto flex min-h-screen max-w-screen-xl flex-col p-2">
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>
);
