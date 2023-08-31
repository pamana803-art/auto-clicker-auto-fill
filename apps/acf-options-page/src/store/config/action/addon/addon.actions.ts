import { PayloadAction } from '@reduxjs/toolkit';
import { ConfigStore } from '../../config.slice';
import { Addon } from '@dhruv-techapps/acf-common';

export const actionAddonActions = {
  syncActionAddon: (state: ConfigStore, action: PayloadAction<Addon | undefined>) => {
    const { configs, selectedActionIndex, selectedConfigIndex } = state;
    if (action.payload) {
      configs[selectedConfigIndex].actions[selectedActionIndex].addon = action.payload;
    } else {
      delete configs[selectedConfigIndex].actions[selectedActionIndex].addon;
    }
  },
};
