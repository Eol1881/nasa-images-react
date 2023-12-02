import { configureStore } from '@reduxjs/toolkit';
import formsDataSliceReducer from './slices/FormsDataSlice';

export default configureStore({
  reducer: {
    formsData: formsDataSliceReducer,
  },
});
