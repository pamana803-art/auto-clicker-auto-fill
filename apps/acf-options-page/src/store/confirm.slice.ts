import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type ConfirmStore = { visible: boolean; confirm?: () => void; headerClass?: string; title?: string; message?: string };

const initialState: ConfirmStore = {
  visible: false,
};

const slice = createSlice({
  name: 'confirm',
  initialState,
  reducers: {
    showConfirm: (state, action: PayloadAction<Omit<ConfirmStore, 'visible'>>) => {
      state.visible = true;
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.headerClass = action.payload.headerClass;
    },
    hideConfirm: () => initialState,
  },
});

export const { showConfirm, hideConfirm } = slice.actions;

export const confirmSelector = (state: RootState) => state.confirm;

export default slice.reducer;
