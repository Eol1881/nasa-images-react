import { configureStore } from '@reduxjs/toolkit';
import uncontrolledFormSliceReducer from './slices/uncontrolledFormSlice';

export default configureStore({
  reducer: {
    uncontrolledFormData: uncontrolledFormSliceReducer,
  },
});
