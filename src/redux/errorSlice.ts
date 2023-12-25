import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ErrorSliceState = {
  error?: string;
};

const errorSliceInitState: ErrorSliceState = {
  error: undefined,
};

const errorSlice = createSlice({
  name: 'alert',
  initialState: errorSliceInitState,
  reducers: {
    setError(state, action: PayloadAction<string | undefined>) {
      state.error = action.payload;
    },
  },
});

export const { setError } = errorSlice.actions;

export const errorSliceReducer = errorSlice.reducer;
