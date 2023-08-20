import { PayloadAction } from '@reduxjs/toolkit';
import { defaultAction } from '@dhruv-techapps/acf-common';

const arrayMove = (arr, oldIndex, newIndex) => {
  if (newIndex >= arr.length) {
    let k = newIndex - arr.length + 1;
    k -= 1;
    while (k) {
      arr.push(undefined);
    }
  }
  arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
  return arr; // for testing
};

export const actionActions = {
  reorderActions: (state, action: PayloadAction<{ oldIndex: number; newIndex: number }>) => {
    const { configs, selectedConfigIndex } = state;
    const { oldIndex, newIndex } = action.payload;
    configs[selectedConfigIndex].actions = [...arrayMove(configs[selectedConfigIndex].actions, oldIndex, newIndex)];
  },
  addAction: (state) => {
    const { configs, selectedConfigIndex } = state;
    configs[selectedConfigIndex].actions.push({ ...defaultAction });
  },
  updateAction: (state, action: PayloadAction<{ index: number; name: string; value: any }>) => {
    const { configs, selectedConfigIndex } = state;
    const { name, value, index } = action.payload;
    configs[selectedConfigIndex].actions[index][name] = value;
  },
  removeAction: (state, action: PayloadAction<number>) => {
    const { configs, selectedConfigIndex } = state;
    configs[selectedConfigIndex].actions.splice(action.payload, 1);
  },
};
