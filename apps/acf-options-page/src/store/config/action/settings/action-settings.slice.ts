import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../../store';

type ActionSettingsStore = {
  visible: boolean;
  loading: boolean;
  error?: string;
  message?: string;
};

const initialState: ActionSettingsStore = { visible: false, loading: true };

const slice = createSlice({
  name: 'actionSettings',
  initialState,
  reducers: {
    switchActionSettingsModal: (state) => {
      state.visible = !state.visible;
    },
  },
});

export const { switchActionSettingsModal } = slice.actions;

export const actionSettingsSelector = (state: RootState) => state.actionSettings;
export const actionSettingsReducer = slice.reducer;
