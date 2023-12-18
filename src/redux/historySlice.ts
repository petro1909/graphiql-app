import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { GraphQlSearchInputType } from '@app_types/graphql';

type HistorySliceState = {
  history: Array<GraphQlSearchInputType>;
  historyIndex: number;
  prev: GraphQlSearchInputType | null;
  next: GraphQlSearchInputType | null;
};

const historySliceInitState: HistorySliceState = {
  history: [],
  historyIndex: 0,
  prev: null,
  next: null,
};

const historySlice = createSlice({
  name: 'history',
  initialState: historySliceInitState,
  reducers: {
    historyPush(state, action: PayloadAction<GraphQlSearchInputType>) {
      state.history.splice(state.historyIndex);
      state.history.push(action.payload);
      state.prev = state.history[state.historyIndex - 1];
      state.next = state.history[state.historyIndex + 1];
      state.historyIndex += 1;
    },
    historyClear(state) {
      state.history = [];
      state.historyIndex = 0;
      state.next = null;
      state.prev = null;
    },
    historyForward(state) {
      if (state.historyIndex < state.history.length) {
        state.next = state.history[state.historyIndex + 1];
        state.prev = state.history[state.historyIndex - 1];
        state.historyIndex += 1;
      }
    },
    historyBack(state) {
      if (state.historyIndex > 0) {
        state.next = state.history[state.historyIndex - 1];
        state.prev = state.history[state.historyIndex - 3];
        state.historyIndex -= 1;
      }
    },
  },
});

export const selectPrev = (state: RootState) => state.history.prev;
export const selectNext = (state: RootState) => state.history.next;

export const { historyPush, historyClear, historyForward, historyBack } = historySlice.actions;
export const historyReducer = historySlice.reducer;
