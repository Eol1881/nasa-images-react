import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormData } from '../../validation/validationSchema';

const initialState: {
  formData: IFormData | null;
} = { formData: null };

const uncontrolledFormSlice = createSlice({
  name: 'uncontrolledFormData',
  initialState,
  reducers: {
    updateFormData: (state, action: PayloadAction<IFormData>) => {
      const formEntries = action.payload;
      state.formData = formEntries;
    },
  },
});

export const { updateFormData } = uncontrolledFormSlice.actions;

export default uncontrolledFormSlice.reducer;
