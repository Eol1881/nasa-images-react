import React, { memo, useCallback, useContext, useEffect } from 'react';
import { useLoaderData, Outlet } from 'react-router-dom';
import { fetchItemsFromApi } from '../api/api';
import { SearchResults } from '../api/types';
import { Header } from '../components/Header';
import { ResultList } from '../components/ResultList';
import { Pagination } from '../components/Pagination';
import { Loader } from '../components/Loader';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { APP_CONFIG } from '../constants/constants';
import { SearchContext } from '../context/SearchContextProvider';

export async function rootLoader({ request }: { request: Request }) {
  console.log('-- root loader triggered');
  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page')) || 1;
  const searchQuery = url.searchParams.get('search') || localStorage.getItem(APP_CONFIG.LOCAL_STORAGE_PREFIX) || '';
  const pageSize = Number(url.searchParams.get('size')) || APP_CONFIG.DEFAULT_PAGE_SIZE;
  return fetchItemsFromApi(page, pageSize, searchQuery);
}

export const Root: React.FC = memo(() => {
  const searchResults = useLoaderData() as SearchResults;
  const { setShouldThrowError, setSearchResults } = useContext(SearchContext);

  useEffect(() => {
    setSearchResults(searchResults);
  }, [searchResults, setSearchResults]);

  const throwErrorHandler = useCallback(() => {
    setShouldThrowError(true);
  }, [setShouldThrowError]);

  useEffect(() => {
    console.log('~~ root component RENDER');
  });

  return (
    <div className="container mx-auto flex min-h-screen max-w-screen-xl flex-col p-2">
      <button className="button-red mt-4" onClick={throwErrorHandler}>
        Throw fake error
      </button>
      <Header />
      <ErrorBoundary>
        <div className="relative mt-4 flex justify-between rounded-lg bg-white px-2 py-3 shadow-md sm:px-4">
          <ResultList />
          <Outlet />
          <Loader />
        </div>
        <Pagination />
      </ErrorBoundary>
    </div>
  );
});
