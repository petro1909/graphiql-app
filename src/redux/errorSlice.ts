import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ErrorSliceState = {
  error?: string;
  showError: boolean;
};

const errorSliceInitState: ErrorSliceState = {
  error: undefined,
  showError: false,
};

const errorSlice = createSlice({
  name: 'alert',
  initialState: errorSliceInitState,
  reducers: {
    showError(state, action: PayloadAction<string | undefined>) {
      state.error = action.payload;
      state.showError = true;
    },
    hideError(state) {
      state.showError = false;
    },
  },
});

export const { showError, hideError } = errorSlice.actions;

export const errorSliceReducer = errorSlice.reducer;
