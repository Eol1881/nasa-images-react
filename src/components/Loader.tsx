import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-pixelify text-2xl text-red-700`}>
      LOADING...
    </div>
  );
};
