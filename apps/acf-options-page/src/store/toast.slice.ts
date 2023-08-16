import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ToastProps } from 'react-bootstrap';
import { ReactNode } from 'react';

export type ToastHandlerProps = Omit<ToastProps, 'defaultValue'> & {
  body: string | ReactNode;
  header: string | ReactNode;
  bodyClass?: string;
  headerClass?: string;
  toastClass?: string;
};

const initialState: Array<ToastHandlerProps> = [];
const slice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<ToastHandlerProps>) => {
      state.push(action.payload);
    },
    hideToast: (state, action: PayloadAction<number>) => {
      state[action.payload].show = false;
    },
  },
});
export const { addToast, hideToast } = slice.actions;
export const toastSelector = (state: RootState) => state.toast;
export default slice.reducer;
