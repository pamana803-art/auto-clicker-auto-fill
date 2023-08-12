import { ActionSetting, RETRY_OPTIONS } from '@dhruv-techapps/acf-common';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type ActionSettingStore = { visible: boolean; message?: string; actionSetting: ActionSetting };

const initialState: ActionSettingStore = {
  visible: false,
  actionSetting: { retry: -1, retryInterval: -1, retryOption: RETRY_OPTIONS.SKIP },
};

type AddonUpdate = {
  field: 'elementFinder' | 'valueExtractorFlags';
  value: any;
};

const slice = createSlice({
  name: 'actionSetting',
  initialState,
  reducers: {
    showActionSetting: (state, action) => {
      state.visible = true;
      state.actionSetting = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    updateActionSetting: (state, action: PayloadAction<AddonUpdate>) => {
      const { field, value } = action.payload;
      state.actionSetting[field] = value;
    },
    hideActionSetting: () => initialState,
    resetActionSetting: () => initialState,
  },
});

export const { hideActionSetting, showActionSetting, resetActionSetting, updateActionSetting, setMessage } = slice.actions;

export const actionSettingSelector = (state) => state.actionSetting;

export default slice.reducer;
