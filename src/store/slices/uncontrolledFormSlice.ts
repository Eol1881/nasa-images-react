import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormEntries } from '../../types/general';

const initialState: {
  formData: FormEntries;
} = { formData: null };

const uncontrolledFormSlice = createSlice({
  name: 'uncontrolledFormData',
  initialState,
  reducers: {
    updateFormData: (state, action: PayloadAction<FormData>) => {
      const formData = action.payload;
      const formEntries: FormEntries = Object.fromEntries(formData);
      state.formData = formEntries;
    },
  },
});

export const { updateFormData } = uncontrolledFormSlice.actions;

export default uncontrolledFormSlice.reducer;
