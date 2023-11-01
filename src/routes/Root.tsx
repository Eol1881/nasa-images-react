import { useState, useEffect, useCallback } from 'react';
import { fetchData } from '../api/api';
import { ImageData } from '../api/types';
import { Search } from '../components/Search';
import { Results } from '../components/Results';
import { Loader } from '../components/Loader';
import { Pagination } from '../components/Pagination';
import ErrorBoundary from '../components/ErrorBoundary';

import { useSearchParams } from 'react-router-dom';

export function Root() {
  const [imagesData, setImagesData] = useState<ImageData[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const pageIndex = Number(searchParams.get('page')) || 1;
  const searchQuery = searchParams.get('search') || localStorage.getItem('nasa-search-query') || '';

  const [shouldThrowError, setShouldThrowError] = useState(false);

  const throwErrorHandler = useCallback(() => {
    setShouldThrowError(true);
  }, []);

  useEffect(() => {
    const updateResults = async () => {
      try {
        setIsLoading(true);
        const fetchedImagesData = await fetchData(pageIndex, searchQuery);
        setImagesData(fetchedImagesData || []);
      } catch (error) {
        setImagesData([]);
      } finally {
        setIsLoading(false);
      }
    };

    updateResults();
  }, [pageIndex, searchQuery]);

  const searchHandler = (searchQuery: string) => {
    const searchParams = new URLSearchParams();
    searchParams.set('search', searchQuery);
    setSearchParams(searchParams);
  };

  const searchResetHandler = () => {
    const searchParams = new URLSearchParams();
    setSearchParams(searchParams);
  };

  const hardResetHandler = () => {
    const searchParams = new URLSearchParams();
    setSearchParams(searchParams);
    setShouldThrowError(false);
  };

  return (
    <>
      <Search
        searchQuery={searchQuery}
        searchHandler={searchHandler}
        searchResetHandler={searchResetHandler}
      ></Search>
      <ErrorBoundary hardResetHandler={hardResetHandler}>
        {isLoading ? (
          <Loader></Loader>
        ) : (
          <Results imagesData={imagesData} shouldThrowError={shouldThrowError}></Results>
        )}
        {!isLoading && <Pagination></Pagination>}
        <button className="button-red mt-4" onClick={throwErrorHandler}>
          Throw fake error
        </button>
      </ErrorBoundary>
    </>
  );
}
