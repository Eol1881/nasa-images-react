import React from 'react';
import { useRouteError } from 'react-router-dom';
import { extractErrorMessage } from '../utils/extractErrorMessage';
import { Link } from 'react-router-dom';

export const ErrorPage: React.FC = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="mx-auto my-auto flex flex-col items-center space-y-6 font-pixelify text-lg text-red-500">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i className="text-red-300">{extractErrorMessage(error)}</i>
      </p>
      <Link className="button-blue my-4" to="/">
        Home
      </Link>
    </div>
  );
};
