import React from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Main } from './routes/Main';
import { UncontrolledForm } from './routes/UncontrolledForm';
import { NavbarWrapper } from './components/NavbarWrapper';
import store from './store/store';

export const routerConfig = [
  {
    path: '/',
    element: <NavbarWrapper />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: '/form-1',
        element: <UncontrolledForm />,
      },
      {
        path: '/form-2',
        element: <UncontrolledForm />,
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
