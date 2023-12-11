import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

type DocsSliceState = {
  isDocsEnable: boolean;
  words: string[];
};

const docsSliceInitState: DocsSliceState = {
  isDocsEnable: true,
  words: ['test', 'top', 'down', 'opt', 'qwerty'],
};

const docsSlice = createSlice({
  name: 'docs',
  initialState: docsSliceInitState,
  reducers: {
    toggleDocsEnable(state, action: PayloadAction<boolean>) {
      state.isDocsEnable = action.payload;
    },
  },
});

export const selectDocsEnable = (state: RootState) => state.docs.isDocsEnable;
export const selectWords = (state: RootState) => state.docs.words;

export const { toggleDocsEnable } = docsSlice.actions;
export const docsSliceReducer = docsSlice.reducer;
