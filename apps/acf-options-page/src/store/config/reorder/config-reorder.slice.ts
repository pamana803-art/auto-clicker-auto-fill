import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { Configuration } from '@dhruv-techapps/acf-common';
import { configReorderGetAPI, configReorderUpdateAPI } from './config-reorder.api';

type ConfigReorderStore = {
  visible: boolean;
  loading: boolean;
  error?: string;
  configs: Array<Configuration>;
};

const initialState: ConfigReorderStore = { visible: false, loading: true, configs: [] };

const slice = createSlice({
  name: 'configReorder',
  initialState,
  reducers: {
    updateConfigReorder :(state, action:PayloadAction<Array<Configuration>>)=>{
      state.configs = action.payload
    },
    switchConfigReorderModal: (state) => {
      state.visible = !state.visible;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(configReorderGetAPI.fulfilled, (state, action) => {
      if (action.payload) {
        state.configs = action.payload;
      }
      state.loading = false;
    });
    builder.addCase(configReorderGetAPI.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
    builder.addCase(configReorderUpdateAPI.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const { switchConfigReorderModal,updateConfigReorder } = slice.actions;

export const configReorderSelector = (state: RootState) => state.configReorder;
export const configReorderReducer = slice.reducer;
