import { WizardElementUtil } from './element-util';
import { store } from './store';
import { updateAllWizardAction } from './store/slice';
import { WizardAction } from './type';

export const Auto = (() => {
  const generate = async () => {
    const payload: Array<WizardAction> = [];
    document.querySelectorAll('input, select, textarea, [contenteditable="true"]').forEach(async (element) => {
      if (element instanceof HTMLElement) {
        const action = await WizardElementUtil.check(element);
        if (action) {
          payload.push(action);
        }
      }
    });
    if (payload.length !== 0) {
      store.dispatch(updateAllWizardAction(payload));
    }
  };
  return { generate };
})();
