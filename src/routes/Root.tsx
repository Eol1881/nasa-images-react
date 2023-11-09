import { useState, useCallback } from 'react';
import { useLoaderData, useNavigation, Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { fetchItemsFromApi } from '../api/api';
import { SearchResults } from '../api/types';
import { Header } from '../components/Header';
import { ResultList } from '../components/ResultList';
import { Pagination } from '../components/Pagination';
import { Loader } from '../components/Loader';
import { APP_CONFIG } from '../constants';
import ErrorBoundary from '../components/ErrorBoundary';

export async function rootLoader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page')) || 1;
  const searchQuery = url.searchParams.get('search') || localStorage.getItem(APP_CONFIG.LOCAL_STORAGE_PREFIX) || '';
  const pageSize = Number(url.searchParams.get('size')) || APP_CONFIG.DEFAULT_PAGE_SIZE;
  return fetchItemsFromApi(page, pageSize, searchQuery);
}
export const Root: React.FC = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  const searchResults = useLoaderData() as SearchResults;
  const { imagesData, totalPages } = searchResults;

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const currentSearchQuery = searchParams.get('search');
  const [inputSearchQuery, setInputSearchQuery] = useState(
    currentSearchQuery || localStorage.getItem(APP_CONFIG.LOCAL_STORAGE_PREFIX) || ''
  );

  const [shouldThrowError, setShouldThrowError] = useState(false);
  const throwErrorHandler = useCallback(() => {
    setShouldThrowError(true);
  }, []);

  const hardResetHandler = () => {
    setShouldThrowError(false);
    searchResetHandler();
  };

  const searchResetHandler = () => {
    setInputSearchQuery('');
    localStorage.removeItem(APP_CONFIG.LOCAL_STORAGE_PREFIX);
    if (location.pathname === '/' && searchParams.toString() === '') return;
    navigate('/');
  };

  function closeDetailsHandler() {
    if (location.pathname === '/') return;
    navigate(`/?${searchParams}`);
  }

  return (
    <div className="container mx-auto flex min-h-screen max-w-screen-xl flex-col p-2" onClick={closeDetailsHandler}>
      <button className="button-red mt-4" onClick={throwErrorHandler}>
        Throw fake error
      </button>
      <Header
        inputSearchQuery={inputSearchQuery}
        setInputSearchQuery={setInputSearchQuery}
        searchResetHandler={searchResetHandler}
      ></Header>
      <ErrorBoundary hardResetHandler={hardResetHandler}>
        <main className="relative mt-4 flex justify-between rounded-lg bg-white px-2 py-3 shadow-md sm:px-4">
          <ResultList shouldThrowError={shouldThrowError} imagesData={imagesData}></ResultList>
          <Outlet></Outlet>
          <Loader></Loader>
        </main>

        {!isLoading && imagesData.length !== 0 && <Pagination totalPages={totalPages || 1}></Pagination>}
      </ErrorBoundary>
    </div>
  );
};
