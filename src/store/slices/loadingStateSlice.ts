import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nasaApiSlice } from '../../api/nasaApiSlice';

const loadingStateSlice = createSlice({
  name: 'loadingStateSlice',
  initialState: {
    isResultsLoading: true,
    isDetailsLoading: true,
    shouldThrowFakeError: false,
  },
  reducers: {
    setIsDetailsLoading: (state, action: PayloadAction<boolean>) => {
      state.isDetailsLoading = action.payload;
    },
    setIsResultsLoading: (state, action: PayloadAction<boolean>) => {
      state.isResultsLoading = action.payload;
    },
    setShouldThrowFakeError: (state, action: PayloadAction<boolean>) => {
      state.shouldThrowFakeError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(nasaApiSlice.endpoints.getItems.matchPending, (state) => {
      state.isResultsLoading = true;
    });
    builder.addMatcher(nasaApiSlice.endpoints.getItems.matchFulfilled, (state) => {
      state.isResultsLoading = false;
    });
    builder.addMatcher(nasaApiSlice.endpoints.getItems.matchRejected, (state) => {
      state.isResultsLoading = false;
    });
    builder.addMatcher(nasaApiSlice.endpoints.getItem.matchPending, (state) => {
      state.isDetailsLoading = true;
    });
    builder.addMatcher(nasaApiSlice.endpoints.getItem.matchFulfilled, (state) => {
      state.isDetailsLoading = false;
    });
    builder.addMatcher(nasaApiSlice.endpoints.getItem.matchRejected, (state) => {
      state.isDetailsLoading = false;
    });
  },
});

export const { setIsDetailsLoading, setIsResultsLoading, setShouldThrowFakeError } = loadingStateSlice.actions;

export default loadingStateSlice.reducer;
