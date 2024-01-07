import { GraphQlEntity, GraphQlSearchInputType, __Schema } from '@app_types/graphql';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type DocsSliceState = {
  isDocsEnable: boolean;
  schema: __Schema | null;
  entities: GraphQlSearchInputType[];
  activeEntity: GraphQlEntity | null;
};

const docsSliceInitState: DocsSliceState = {
  isDocsEnable: true,
  schema: null,
  entities: [],
  activeEntity: null,
};

const docsSlice = createSlice({
  name: 'docs',
  initialState: docsSliceInitState,
  reducers: {
    toggleDocsEnable(state, action: PayloadAction<boolean>) {
      state.isDocsEnable = action.payload;
    },
    setSchema(state, action: PayloadAction<__Schema>) {
      state.schema = action.payload;
      state.isDocsEnable = true;
    },
    setEntities(state, action: PayloadAction<__Schema>) {
      const schema = action.payload;
      const entities: GraphQlSearchInputType[] = [];
      schema?.types.forEach((type) => {
        entities.push({ typeName: type.name! });
        type.fields &&
          type.fields.forEach((field) => {
            entities.push({ typeName: type.name!, fieldName: field.name });
          });
        type.inputFields &&
          type.inputFields.map((field) => {
            entities.push({ typeName: type.name!, fieldName: field.name });
          });
      });
      state.entities = entities;
    },
    setActiveEntity(state, action: PayloadAction<GraphQlSearchInputType | null>) {
      const searchInput = action.payload;
      if (searchInput?.typeName === '__Schema') {
        state.activeEntity = state.schema;

        return;
      }
      let findedEntity: GraphQlEntity | undefined;
      findedEntity = state.schema?.types.find((type) => type.name === searchInput?.typeName);
      if (searchInput?.fieldName) {
        const field = findedEntity?.fields?.find((field) => field.name === searchInput.fieldName);
        if (!field) {
          findedEntity = findedEntity?.inputFields?.find((field) => field.name === searchInput.fieldName);
        } else {
          findedEntity = field;
        }
      }
      state.activeEntity = findedEntity || null;
    },
  },
});

export const { toggleDocsEnable, setSchema, setEntities, setActiveEntity } = docsSlice.actions;
export const docsSliceReducer = docsSlice.reducer;
