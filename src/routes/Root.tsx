import { useState, useCallback } from 'react';
import { fetchData } from '../api/api';
import { SearchResults } from '../api/types';
import { Search } from '../components/Search';
import { Results } from '../components/Results';
import { Pagination } from '../components/Pagination';
import ErrorBoundary from '../components/ErrorBoundary';

import { useLoaderData, useNavigation } from 'react-router-dom';

export async function rootLoader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get('page')) || 1;
  const searchQuery =
    url.searchParams.get('search') || localStorage.getItem('nasa-search-query') || '';
  return fetchData(page, searchQuery);
}

export function Root() {
  const navigation = useNavigation();

  const searchResults = useLoaderData() as SearchResults;
  const { imagesData } = searchResults;
  const { totalPages } = searchResults;

  // Throwing fake rendering error mechanism
  const [shouldThrowError, setShouldThrowError] = useState(false);
  const throwErrorHandler = useCallback(() => {
    setShouldThrowError(true);
  }, []);

  const hardResetHandler = () => {
    setShouldThrowError(false);
    document.dispatchEvent(new Event('hard-reset'));
  };

  return (
    <>
      <button className="button-red mt-4" onClick={throwErrorHandler}>
        Throw fake error
      </button>
      <Search></Search>
      <ErrorBoundary hardResetHandler={hardResetHandler}>
        <Results imagesData={imagesData} shouldThrowError={shouldThrowError}></Results>
        {navigation.state !== 'loading' && imagesData.length !== 0 && (
          <Pagination totalPages={totalPages}></Pagination>
        )}
      </ErrorBoundary>
    </>
  );
}
