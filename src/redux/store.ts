import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { endPointSliceReducer } from './endpointSlice';
import { grapqlApi } from './graphqlApi';
import { docsSliceReducer } from './docsSlice';

const rootReducer = combineReducers({
  [grapqlApi.reducerPath]: grapqlApi.reducer,
  endpoint: endPointSliceReducer,
  docs: docsSliceReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(grapqlApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
