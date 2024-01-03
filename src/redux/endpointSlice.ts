import { GraphQLValidRequest, GraphQLRawRequest } from '@app_types/graphqlRequest';
import { getValueByKeyFromLocalStorage, localStorageValues } from '@service/localStorageService';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type EndPointSliceState = {
  validRequest: GraphQLValidRequest;
  rawRequest: GraphQLRawRequest;
};

const endpointSliceInitState: EndPointSliceState = {
  rawRequest: {
    URL: getValueByKeyFromLocalStorage(localStorageValues.URL.name),
    headers: getValueByKeyFromLocalStorage(localStorageValues.headers.name),
    variables: getValueByKeyFromLocalStorage(localStorageValues.variables.name),
    query: getValueByKeyFromLocalStorage(localStorageValues.query.name),
  },
  validRequest: {
    URL: '',
    headers: {},
    variables: '',
    query: '',
  },
};

const endpointSlice = createSlice({
  name: 'endpoint',
  initialState: endpointSliceInitState,
  reducers: {
    setRawRequest(state, action: PayloadAction<Partial<GraphQLRawRequest>>) {
      state.rawRequest = { ...state.rawRequest, ...action.payload };
      Object.entries(action.payload).forEach(([key, value]) => {
        localStorage.setItem(key, value);
      });
    },
    setValidatedRequest(state, action: PayloadAction<Partial<GraphQLValidRequest>>) {
      state.validRequest = { ...state.validRequest, ...action.payload };
    },
  },
});

export const { setRawRequest, setValidatedRequest } = endpointSlice.actions;
export const endPointSliceReducer = endpointSlice.reducer;
