import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root, rootLoader } from './routes/Root';
import { ImageDetails, detailsLoader } from './routes/ImageDetails';
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
        element: <ImageDetails />,
        loader: detailsLoader,
      },
    ],
  },
]);

export function App() {
  return (
    <div className="container mx-auto flex min-h-screen max-w-screen-xl flex-col p-2">
      <RouterProvider router={router} />
    </div>
  );
}
