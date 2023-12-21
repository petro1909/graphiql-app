import { RootState } from './store';

export const selectSchema = (state: RootState) => state.docs.schema;
export const selectDocsEnable = (state: RootState) => state.docs.isDocsEnable;
export const selectAllEntities = (state: RootState) => state.docs.entities;
export const selectActiveEntity = (state: RootState) => state.docs.activeEntity;

export const selectRawRequest = (state: RootState) => state.endpoint.rawRequest;
export const selectValidRequest = (state: RootState) => state.endpoint.validRequest;

export const selectPrev = (state: RootState) => state.history.prev;
export const selectNext = (state: RootState) => state.history.next;
