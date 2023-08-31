import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Addon, defaultAddon } from '@dhruv-techapps/acf-common';
import { RootState } from '@apps/acf-options-page/src/store';

type ActionAddonStore = {
  visible: boolean;
  error?: string;
  message?: string;
  addon: Addon;
};

const initialState: ActionAddonStore = { visible: false, addon: { ...defaultAddon } };

const slice = createSlice({
  name: 'actionAddon',
  initialState,
  reducers: {
    updateActionAddon: (state, action) => {
      const { name, value: addonValue } = action.payload;
      state.addon[name] = addonValue;
    },
    switchActionAddonModal: (state, action: PayloadAction<Addon | undefined>) => {
      state.addon = action.payload || { ...defaultAddon };
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

export const { setActionAddonError, setActionAddonMessage, switchActionAddonModal, updateActionAddon } = slice.actions;

export const actionAddonSelector = (state: RootState) => state.actionAddon;
export const actionAddonReducer = slice.reducer;
