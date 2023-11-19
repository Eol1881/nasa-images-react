import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { APP_CONFIG } from '../../constants/constants';
import { SearchResults } from '../../types/api';
import { nasaApiSlice } from '../../api/nasaApiSlice';

const searchSlice = createSlice({
  name: 'searchSlice',
  initialState: {
    searchQuery: localStorage.getItem(APP_CONFIG.LOCAL_STORAGE_PREFIX) || '',
    isDetailsActive: false,
    selectedPageSize: APP_CONFIG.DEFAULT_PAGE_SIZE,
    searchResults: {},
  },
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      if (action.payload) localStorage.setItem(APP_CONFIG.LOCAL_STORAGE_PREFIX, action.payload);
      else localStorage.removeItem(APP_CONFIG.LOCAL_STORAGE_PREFIX);
      state.searchQuery = action.payload;
    },
    setSelectedPageSize: (state, action: PayloadAction<number>) => {
      state.selectedPageSize = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<SearchResults>) => {
      state.searchResults = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(nasaApiSlice.endpoints.getItems.matchFulfilled, (state, action) => {
      state.searchResults = action.payload;
    });
  },
});

export const { setSelectedPageSize, setSearchQuery, setSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
