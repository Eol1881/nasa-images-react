import React, { ReactNode, createContext, useEffect, useMemo, useState } from 'react';
import { SearchResults } from '../api/types';
import { APP_CONFIG } from '../constants/constants';

export interface ISearchContext {
  searchResults: SearchResults;
  setSearchResults: (newSearchResults: SearchResults) => void;
  searchQuery: string;
  setSearchQuery: (newSearchQuery: string) => void;
  shouldThrowError: boolean;
  setShouldThrowError: (newShouldThrowErrorState: boolean) => void;
}

export const SearchContext = createContext<ISearchContext>({
  searchResults: { imagesData: [] },
  setSearchResults: () => {},
  searchQuery: '',
  setSearchQuery: () => {},
  shouldThrowError: false,
  setShouldThrowError: () => {},
});

export const SearchContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchResults, setSearchResults] = useState<SearchResults>({ imagesData: [] });
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem(APP_CONFIG.LOCAL_STORAGE_PREFIX) || '');
  const [shouldThrowError, setShouldThrowError] = useState(false);

  useEffect(() => {
    console.log('____ context changed ____');
  });

  const contextValue = useMemo(() => {
    return {
      searchResults,
      setSearchResults,
      shouldThrowError,
      setShouldThrowError,
      searchQuery,
      setSearchQuery,
    };
  }, [searchResults, shouldThrowError, searchQuery]);

  return <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>;
};
