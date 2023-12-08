import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { endPointSliceReducer } from './endpointSlice';
import { grapqlApi } from './graphqlApi';

const rootReducer = combineReducers({
  [grapqlApi.reducerPath]: grapqlApi.reducer,
  endpoint: endPointSliceReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(grapqlApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
