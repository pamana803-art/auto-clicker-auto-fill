import { PayloadAction } from '@reduxjs/toolkit';
import { ConfigStore } from '../../config.slice';
import { defaultAddon } from '@dhruv-techapps/acf-common';

export * from './addon.slice';

type Addon = { name: string; value: any };

export const actionAddonActions = {
  updateActionAddon: (state:ConfigStore, action: PayloadAction<Addon>) => {
    const { configs, selectedActionIndex, selectedConfigIndex } = state;
    const { name, value } = action.payload;
    const { addon } = configs[selectedConfigIndex].actions[selectedActionIndex];
    if (addon) {
      addon[name] = value;
    } else {
      configs[selectedConfigIndex].actions[selectedActionIndex].addon = { ...defaultAddon, [name]: value };
    }
  },
  resetActionAddon: (state:ConfigStore) => {
    const { configs, selectedActionIndex, selectedConfigIndex } = state;
    delete configs[selectedConfigIndex].actions[selectedActionIndex].addon;
  },
};
