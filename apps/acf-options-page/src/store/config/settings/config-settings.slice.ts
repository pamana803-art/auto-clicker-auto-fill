import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../store';

type ConfigSettingsStore = {
  visible: boolean;
  loading: boolean;
  error?: string;
  message?: string;
  dev: boolean;
};

const initialState: ConfigSettingsStore = { visible: false, loading: true, dev: !!localStorage.getItem('DEV') };

const slice = createSlice({
  name: 'configSettings',
  initialState,
  reducers: {
    switchConfigSettingsModal: (state) => {
      state.visible = !state.visible;
    },
    updateConfigSettingsMessage: (state, action: PayloadAction<string | undefined>) => {
      state.message = action.payload;
    },
  },
});

export const { switchConfigSettingsModal, updateConfigSettingsMessage } = slice.actions;

export const configSettingsSelector = (state: RootState) => state.configSettings;
export const configSettingsReducer = slice.reducer;
