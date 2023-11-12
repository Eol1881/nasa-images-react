import React, { memo, useContext, useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { ResultList } from '../components/ResultList';
import { Pagination } from '../components/Pagination';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { ThrowFakeErrorButton } from '../components/ThrowFakeErrorButton';
import { SearchContext } from '../context/SearchContextProvider';
import { APP_CONFIG } from '../constants/constants';
import { fetchItemsFromApi } from '../api/api';

export const Root: React.FC = memo(() => {
  const { setSearchResults } = useContext(SearchContext);
  const [searchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);

  const pageSearchParam = searchParams.get('page');
  const pageSizeSearchParam = searchParams.get('size');
  const searchQuery = useContext(SearchContext).searchQuery;

  useEffect(() => {
    const page = Number(pageSearchParam) || 1;
    const pageSize = Number(pageSizeSearchParam) || APP_CONFIG.DEFAULT_PAGE_SIZE;
    const fetchItems = async () => {
      setIsLoading(true);
      const searchResults = await fetchItemsFromApi(page, pageSize, searchQuery);
      setSearchResults(searchResults);
      setIsLoading(false);
    };
    fetchItems();
  }, [pageSearchParam, pageSizeSearchParam, searchQuery, setSearchResults]);

  return (
    <div className="container mx-auto flex min-h-screen max-w-screen-xl flex-col p-2">
      <ThrowFakeErrorButton />
      <Header />
      <ErrorBoundary>
        <div className="relative mt-4 flex justify-between rounded-lg bg-white px-2 py-3 shadow-md sm:px-4">
          <ResultList isLoading={isLoading} />
          <Outlet />
        </div>
        <Pagination isLoading={isLoading} />
      </ErrorBoundary>
    </div>
  );
});
