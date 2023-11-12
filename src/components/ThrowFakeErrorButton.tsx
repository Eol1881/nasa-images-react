import { memo, useCallback, useContext } from 'react';
import { SearchContext } from '../context/SearchContextProvider';

export const ThrowFakeErrorButton: React.FC = memo(() => {
  const { setShouldThrowError } = useContext(SearchContext);

  const throwErrorHandler = useCallback(() => {
    setShouldThrowError(true);
  }, [setShouldThrowError]);

  return (
    <button className="button-red mt-4" onClick={throwErrorHandler}>
      Throw fake error
    </button>
  );
});
