import { useState } from 'react';

export const ThrowErrorButton: React.FC = () => {
  const [shouldThrowError, setShouldThrowError] = useState(false);

  const handleClick = () => {
    setShouldThrowError(true);
  };

  if (shouldThrowError) {
    throw new Error('Fake render error!');
  }

  return (
    <button
      data-testid="throw-fake-error-button"
      className="absolute right-0 top-0 !m-0 p-3 text-slate-600 hover:text-slate-950"
      onClick={handleClick}
    >
      Throw fake error
    </button>
  );
};
