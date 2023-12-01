import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormEntries } from '../../validation/validationSchema';
import { FormMetaData } from '../../types/general';

const initialState: {
  forms: { formEntries: FormEntries; formMetaData: FormMetaData }[];
} = { forms: [] };

const FormsDataSlice = createSlice({
  name: 'FormsData',
  initialState,
  reducers: {
    updateFormsData: (
      state,
      action: PayloadAction<{ formEntries: FormEntries; formMetaData: FormMetaData }>
    ) => {
      const formData = action.payload;
      state.forms.push(formData);
    },
  },
});

export const { updateFormsData } = FormsDataSlice.actions;

export default FormsDataSlice.reducer;
