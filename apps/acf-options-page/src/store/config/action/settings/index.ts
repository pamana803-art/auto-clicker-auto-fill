import { PayloadAction } from '@reduxjs/toolkit';
import { ConfigStore } from '../../config.slice';

export * from './action-settings.slice';

type Action = { name: string; value: boolean } | null;

export const actionSettingsActions = {
  updateActionSettings: (state: ConfigStore, action: PayloadAction<Action>) => {
    if (action.payload) {
      const { configs, selectedActionIndex, selectedConfigIndex } = state;
      const { name, value } = action.payload;
      configs[selectedConfigIndex].actions[selectedActionIndex][name] = value;
    }
  },
  resetActionSetting: (state: ConfigStore) => {
      const { configs, selectedActionIndex, selectedConfigIndex } = state;
      delete configs[selectedConfigIndex].actions[selectedActionIndex].settings;
  },
};
