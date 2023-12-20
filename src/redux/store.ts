import { docsSliceReducer } from './docsSlice';
import { endPointSliceReducer } from './endpointSlice';
import { grapqlApi } from './graphqlApi';
import { historyReducer } from './historySlice';
import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  [grapqlApi.reducerPath]: grapqlApi.reducer,
  endpoint: endPointSliceReducer,
  docs: docsSliceReducer,
  history: historyReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(grapqlApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
