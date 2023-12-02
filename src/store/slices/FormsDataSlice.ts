import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormEntries } from '../../validation/validationSchema';
import { FormMetaData } from '../../types/general';

const initialState: {
  forms: { formEntries: FormEntries; formMetaData: FormMetaData }[];
  lastFormId?: number;
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
      state.lastFormId = formData.formMetaData.timestamp;
    },
    deleteLastFormId: (state) => {
      delete state.lastFormId;
    },
  },
});

export const { updateFormsData, deleteLastFormId } = FormsDataSlice.actions;

export default FormsDataSlice.reducer;
