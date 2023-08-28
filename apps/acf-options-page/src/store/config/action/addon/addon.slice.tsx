import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../../store';

type ActionAddonStore = {
  visible: boolean;
  error?: string;
  message?: string;
};

const initialState: ActionAddonStore = { visible: false };

const slice = createSlice({
  name: 'actionAddon',
  initialState,
  reducers: {
    switchActionAddonModal: (state) => {
      state.visible = !state.visible;
    },
    setActionAddonMessage: (state, action: PayloadAction<string | undefined>) => {
      state.message = action.payload;
      state.error = undefined;
    },
    setActionAddonError: (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload;
      state.message = undefined;
    },
  },
});

export const { switchActionAddonModal, setActionAddonMessage, setActionAddonError } = slice.actions;

export const actionAddonSelector = (state: RootState) => state.actionAddon;
export const actionAddonReducer = slice.reducer;
