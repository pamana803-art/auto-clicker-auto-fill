import { ADDON_CONDITIONS, Addon } from '@dhruv-techapps/acf-common';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type AddonStore = { visible: boolean; message?: string; addon: Addon };

const initialState: AddonStore = {
  visible: false,
  addon: { elementFinder: '', value: '', condition: ADDON_CONDITIONS['~~ Select Condition ~~'] },
};

type AddonUpdate = {
  field: 'elementFinder' | 'valueExtractorFlags';
  value: any;
};

const addonSlice = createSlice({
  name: 'configs',
  initialState,
  reducers: {
    showAddon: (state, action) => {
      state.visible = true;
      state.addon = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    updateAddon: (state, action: PayloadAction<AddonUpdate>) => {
      const { field, value } = action.payload;
      state.addon[field] = value;
    },
    hideAddon: () => initialState,
  },
});

export const { hideAddon, showAddon, updateAddon, setMessage } = addonSlice.actions;

export default addonSlice.reducer;
