import { configureStore } from '@reduxjs/toolkit';
import { nasaApiSlice } from '../api/nasaApiSlice';

import searchReducer from './slices/searchSlice';
import loadingStateReducer from './slices/loadingStateSlice';
import { SearchResults } from '../types/api';

export default configureStore({
  reducer: {
    search: searchReducer,
    loading: loadingStateReducer,
    [nasaApiSlice.reducerPath]: nasaApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(nasaApiSlice.middleware),
});

export interface GlobalState {
  search: {
    searchQuery: string;
    selectedPageSize: number;
    searchResults: SearchResults;
  };
  loading: {
    isResultsLoading: boolean;
    isDetailsLoading: boolean;
    shouldThrowFakeError: boolean;
  };
}
