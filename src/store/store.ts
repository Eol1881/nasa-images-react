import { configureStore } from '@reduxjs/toolkit';
import uncontrolledFormSliceReducer from './slices/uncontrolledFormSlice';
import hookFormSliceReducer from './slices/HookFormSlice';

export default configureStore({
  reducer: {
    uncontrolledFormData: uncontrolledFormSliceReducer,
    hookFormData: hookFormSliceReducer,
  },
});
