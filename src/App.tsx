import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './routes/Root';
import { ResultDetails, detailsLoader } from './routes/ResultDetails';
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
        path: 'details/:id',
        element: <ResultDetails />,
        loader: detailsLoader,
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
