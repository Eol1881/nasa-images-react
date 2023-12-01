import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormData } from '../../validation/validationSchema';

const initialState: {
  formData: IFormData | null;
} = { formData: null };

const HookFormSlice = createSlice({
  name: 'HookFormSlice',
  initialState,
  reducers: {
    updateFormData: (state, action: PayloadAction<IFormData>) => {
      const formEntries = action.payload;
      state.formData = formEntries;
    },
  },
});

export const { updateFormData } = HookFormSlice.actions;

export default HookFormSlice.reducer;
