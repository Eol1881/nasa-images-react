import { memo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setShouldThrowFakeError } from '../store/slices/loadingStateSlice';

export const ThrowFakeErrorButton: React.FC = memo(() => {
  const dispatch = useDispatch();

  const throwErrorHandler = useCallback(() => {
    dispatch(setShouldThrowFakeError(true));
  }, [dispatch]);

  return (
    <button data-testid="throw-fake-error-button" className="button-red mt-4" onClick={throwErrorHandler}>
      Throw fake error
    </button>
  );
});
