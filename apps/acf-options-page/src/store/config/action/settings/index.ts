import { PayloadAction } from '@reduxjs/toolkit';

export * from './action-settings.slice';

type Action = { name: string; value: boolean } | null;

export const actionSettingsActions = {
  updateActionSettings: (state, action: PayloadAction<Action>) => {
    if (action.payload) {
      const { configs, selectedActionIndex, selectedConfigIndex } = state;
      const { name, value } = action.payload;
      const { settings } = configs[selectedConfigIndex].actions[selectedActionIndex];
      if (settings) {
        settings[name] = value;
      }
    }
  },
  resetActionSetting: (state) => {
    const { configs, selectedActionIndex, selectedConfigIndex } = state;
    delete configs[selectedConfigIndex].actions[selectedActionIndex].settings;
  },
};
