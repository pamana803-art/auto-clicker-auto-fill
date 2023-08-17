import { PayloadAction } from '@reduxjs/toolkit';
import { ConfigStore } from '../../config.slice';

export * from './addon.slice';

type Addon = { name: string; value: any } | null;

export const actionAddonActions = {
  updateActionAddon: (state: ConfigStore, action: PayloadAction<Addon>) => {
    if (action.payload) {
      const { configs, selectedActionIndex, selectedConfigIndex } = state;
      const { name, value } = action.payload;
      const { addon } = configs[selectedConfigIndex].actions[selectedActionIndex];
      if (addon) {
        addon[name] = value;
      }
    }
  },
  resetActionAddon: (state: ConfigStore) => {
    const { configs, selectedActionIndex, selectedConfigIndex } = state;
    delete configs[selectedConfigIndex].actions[selectedActionIndex].addon;
  },
};
