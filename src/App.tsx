import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root, rootLoader } from './routes/Root';
import { ResultDetails, detailsLoader } from './routes/ResultDetails';
import ErrorPage from './routes/ErrorPage';

export const APP_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZES: [10, 15, 20],
  LOCAL_STORAGE_PREFIX: 'nasa-search-query',
  SEARCH_BAR_PLACEHOLDER: 'search keywords',
};

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
