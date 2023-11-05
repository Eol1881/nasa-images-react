import { useRouteError } from 'react-router-dom';
import { extractErrorMessage } from '../utils/extractErrorMessage';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const hardResetHandler = () => {
    document.dispatchEvent(new Event('search-reset'));
  };

  return (
    <div className="mx-auto my-auto flex flex-col items-center space-y-6 font-pixelify text-lg text-red-500">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i className="text-red-300">{extractErrorMessage(error)}</i>
      </p>
      <Link className="button-blue my-4" to="/" onClick={hardResetHandler}>
        Home
      </Link>
    </div>
  );
}
