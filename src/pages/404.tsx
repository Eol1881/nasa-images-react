import React from 'react';
import Link from 'next/link';

const Custom404: React.FC = () => {
  return (
    <div
      className={`mx-auto my-auto flex flex-col items-center space-y-6 align-middle text-lg text-red-500`}
      data-testid="error-page"
    >
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i className="text-red-300">This page could not be found</i>
      </p>
      <Link className="button-blue my-4" href="/">
        Home
      </Link>
    </div>
  );
};

export default Custom404;
