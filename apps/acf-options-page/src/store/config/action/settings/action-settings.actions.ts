import { PayloadAction } from '@reduxjs/toolkit';
import { ConfigStore } from '../../config.slice';
import { ActionSettings } from '@dhruv-techapps/acf-common';

export const actionSettingsActions = {
  syncActionSettings: (state: ConfigStore, action: PayloadAction<ActionSettings | undefined>) => {
    const { configs, selectedActionIndex, selectedConfigIndex } = state;
    if (action.payload) {
      configs[selectedConfigIndex].actions[selectedActionIndex].settings = action.payload;
    } else {
      delete configs[selectedConfigIndex].actions[selectedActionIndex].settings;
    }
  },
};
