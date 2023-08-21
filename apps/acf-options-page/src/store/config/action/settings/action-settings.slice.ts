import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../../store';

type ActionSettingsStore = {
  visible: boolean;
  error?: string;
  message?: string;
};

const initialState: ActionSettingsStore = { visible: false };

const slice = createSlice({
  name: 'actionSettings',
  initialState,
  reducers: {
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
});

export const { switchActionSettingsModal, setActionSettingsMessage, setActionSettingsError } = slice.actions;

export const actionSettingsSelector = (state: RootState) => state.actionSettings;
export const actionSettingsReducer = slice.reducer;
