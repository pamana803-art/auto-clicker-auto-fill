import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { Configuration } from '@dhruv-techapps/acf-common';
import { configRemoveUpdateAPI } from './config-remove.api';

export type ConfigurationRemoveType = Configuration & { checked?: boolean };

type ConfigRemoveStore = {
  visible: boolean;
  loading: boolean;
  error?: string;
  message?: string;
  configs: Array<ConfigurationRemoveType>;
};

const initialState: ConfigRemoveStore = { visible: false, loading: true, configs: [] };

const slice = createSlice({
  name: 'configRemove',
  initialState,
  reducers: {
    switchConfigRemoveModal: (state, action: PayloadAction<Array<Configuration> | undefined>) => {
      if (action.payload) {
        state.configs = action.payload;
      }
      state.visible = !state.visible;
    },
    switchConfigRemoveSelection: (state, action: PayloadAction<number>) => {
      state.configs[action.payload].checked = !state.configs[action.payload].checked;
    },
    setConfigRemoveMessage: (state, action: PayloadAction<string | undefined>) => {
      state.error = undefined;
      state.message = action.payload;
    },
    updateRemoveConfiguration: (state, action) => {
      state.configs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(configRemoveUpdateAPI.rejected, (state, action) => {
      state.error = action.error.message;
      state.message = undefined;
    });
    builder.addCase(configRemoveUpdateAPI.fulfilled, (state) => {
      state.visible = false;
    });
  },
});

export const { switchConfigRemoveSelection, switchConfigRemoveModal, updateRemoveConfiguration,setConfigRemoveMessage } = slice.actions;

export const configRemoveSelector = (state: RootState) => state.configRemove;
export const configRemoveReducer = slice.reducer;
