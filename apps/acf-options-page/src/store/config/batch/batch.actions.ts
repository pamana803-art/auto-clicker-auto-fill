import { PayloadAction } from '@reduxjs/toolkit';
import { ConfigStore } from '../config.slice';

export const batchActions = {
  updateBatch: (state: ConfigStore, action: PayloadAction<{ name: string; value: number }>) => {
    const { configs, selectedConfigIndex } = state;
    const { name, value } = action.payload;
    const { batch } = configs[selectedConfigIndex];
    if (batch) {
      batch[name] = value;
    } else {
      configs[selectedConfigIndex].batch = { [name]: value };
    }
  },
  updateBatchRefresh: (state: ConfigStore) => {
    const { configs, selectedConfigIndex } = state;
    const { batch } = configs[selectedConfigIndex];
    if (batch) {
      batch.refresh = !batch.refresh;
    }
  },
};
