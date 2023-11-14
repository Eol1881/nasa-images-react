import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './routes/Root';
import { ResultDetails } from './routes/ResultDetails';
import { ErrorPage } from './routes/ErrorPage';
import { SearchContextProvider } from './context/SearchContextProvider';
import React from 'react';

export const routerConfig = [
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <ResultDetails />,
        index: true,
      },
    ],
  },
];

const router = createBrowserRouter(routerConfig);

export const App: React.FC = () => {
  return (
    <SearchContextProvider>
      <RouterProvider router={router} />
    </SearchContextProvider>
  );
};
