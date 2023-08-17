import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../../store';

type ActionAddonStore = {
  visible: boolean;
  loading: boolean;
  error?: string;
  message?: string;
};

const initialState: ActionAddonStore = { visible: false, loading: true };

const slice = createSlice({
  name: 'actionAddon',
  initialState,
  reducers: {
    switchActionAddonModal: (state) => {
      state.visible = !state.visible;
    },
  },
});

export const { switchActionAddonModal } = slice.actions;

export const actionAddonSelector = (state: RootState) => state.actionAddon;
export const actionAddonReducer = slice.reducer;
