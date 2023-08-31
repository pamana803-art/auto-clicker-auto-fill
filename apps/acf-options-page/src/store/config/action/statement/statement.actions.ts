import { PayloadAction } from '@reduxjs/toolkit';
import { ConfigStore } from '../../config.slice';
import { ActionStatement } from '@dhruv-techapps/acf-common';

export const actionStatementActions = {
  syncActionStatement: (state: ConfigStore, action: PayloadAction<ActionStatement | undefined>) => {
    const { configs, selectedActionIndex, selectedConfigIndex } = state;
    if (action.payload) {
      configs[selectedConfigIndex].actions[selectedActionIndex].statement = action.payload;
    } else {
      delete configs[selectedConfigIndex].actions[selectedActionIndex].statement;
    }
  },
};
