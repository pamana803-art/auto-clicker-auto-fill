import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../../store';
import { ActionSettings, defaultActionSettings } from '@dhruv-techapps/acf-common';
import { openActionSettingsModalAPI } from './action-settings.api';

type ActionSettingsStore = {
  visible: boolean;
  error?: string;
  message?: string;
  settings: ActionSettings;
};

type ActionSettingsRequest = { name: string; value: boolean };

const initialState: ActionSettingsStore = { visible: false, settings: { ...defaultActionSettings } };

const slice = createSlice({
  name: 'actionSettings',
  initialState,
  reducers: {
    updateActionSettings: (state, action: PayloadAction<ActionSettingsRequest>) => {
      const { name, value } = action.payload;
      state.settings[name] = value;
    },
    switchActionSettingsModal: (state) => {
      state.visible = !state.visible;
    },
    setActionSettingsMessage: (state, action: PayloadAction<string | undefined>) => {
      state.message = action.payload;
      state.error = undefined;
    },
    setActionSettingsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.message = undefined;
    },
  },
  extraReducers(builder) {
    builder.addCase(openActionSettingsModalAPI.fulfilled, (state, action) => {
      state.settings = action.payload.settings || { ...defaultActionSettings };
      state.visible = !state.visible;
    });
  },
});

export const { updateActionSettings, switchActionSettingsModal, setActionSettingsMessage, setActionSettingsError } = slice.actions;

export const actionSettingsSelector = (state: RootState) => state.actionSettings;
export const actionSettingsReducer = slice.reducer;
