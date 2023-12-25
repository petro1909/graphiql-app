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
    setError(state, action: PayloadAction<string | undefined>) {
      state.error = action.payload;
      state.showError = true;
    },
    endShowError(state) {
      state.showError = false;
    },
  },
});

export const { setError, endShowError } = errorSlice.actions;

export const errorSliceReducer = errorSlice.reducer;
