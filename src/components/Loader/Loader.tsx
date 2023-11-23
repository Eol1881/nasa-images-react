import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div
      data-testid="loader"
      className={`absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 text-5xl text-red-700`}
    >
      LOADING...
    </div>
  );
};
