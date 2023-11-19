import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './routes/Root';
import { ResultDetails } from './components/ResultDetails';
import { ErrorPage } from './routes/ErrorPage';
import { Provider } from 'react-redux';
import store from './store/store';

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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

// TODO:
// 1. replace simple loader with spinner ?
// 2. sepparate images loading state from the main item loading state
// 3. optimize magnifier (remove?)
