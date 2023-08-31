import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../../store';
import { ActionSettings, defaultActionSettings } from '@dhruv-techapps/acf-common';

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
    switchActionSettingsModal: (state, action: PayloadAction<ActionSettings | undefined>) => {
      state.settings = action.payload || { ...defaultActionSettings };
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
});

export const { updateActionSettings, switchActionSettingsModal, setActionSettingsMessage, setActionSettingsError } = slice.actions;

export const actionSettingsSelector = (state: RootState) => state.actionSettings;
export const actionSettingsReducer = slice.reducer;
