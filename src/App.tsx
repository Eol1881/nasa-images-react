import { useState, useEffect, useCallback } from 'react';
import { fetchData } from './api/api';
import { ImageData } from './api/types';
import { Search } from './components/Search';
import { Results } from './components/Results';
import { Loader } from './components/Loader';

export function App() {
  const [imagesData, setImagesData] = useState<ImageData[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem('nasa-search-queue') || ''
  );
  const [isLoading, setIsLoading] = useState(false);
  const [shouldThrowError, setShouldThrowError] = useState(false);

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

  const searchHandler = useCallback((searchQuery: string) => {
    setSearchQuery(searchQuery);
    setPageIndex(1);
  }, []);

  const resetHandler = useCallback(() => {
    setSearchQuery('');
    setPageIndex(1);
  }, []);

  const throwErrorHandler = useCallback(() => {
    setShouldThrowError(true);
  }, []);

  if (shouldThrowError) throw new Error('Fake rendering error');

  return (
    <>
      <Search
        searchQuery={searchQuery}
        searchHandler={searchHandler}
        resetHandler={resetHandler}
      ></Search>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <Results imagesData={imagesData}></Results>
      )}
      <button className="button-red mt-4" onClick={throwErrorHandler}>
        Throw fake error
      </button>
    </>
  );
}
