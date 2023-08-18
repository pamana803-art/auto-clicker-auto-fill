import { PayloadAction } from '@reduxjs/toolkit';
import { ConfigStore } from '../config.slice';

export * from './batch.slice';

type BatchUpdate = { name: string; value: any };

export const batchActions = {
  updateBatch: (state: ConfigStore, action: PayloadAction<BatchUpdate>) => {
    const { configs, selectedConfigIndex } = state;
    const { name, value } = action.payload;
    const { batch } = configs[selectedConfigIndex];
    if (batch) {
      batch[name] = value;
    }
  },
};
