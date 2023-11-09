import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root, rootLoader } from './routes/Root';
import { ResultDetails, detailsLoader } from './routes/ResultDetails';
import ErrorPage from './routes/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: 'details/:id',
        element: <ResultDetails />,
        loader: detailsLoader,
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
