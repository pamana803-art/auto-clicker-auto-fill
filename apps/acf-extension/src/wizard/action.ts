import { store } from './store';
import { WizardElementUtil } from './element-util';
import { updateWizardAction } from './store/slice';

export const Action = (() => {
  const check = (element: EventTarget | null) => {
    if (element && element instanceof HTMLElement) {
      WizardElementUtil.check(element, true).then((action) => {
        if (action) {
          store.dispatch(updateWizardAction(action));
        }
      });
    }
  };

  const setup = () => {
    document.addEventListener('click', (event) => {
      check(event.target);
    });
    document.addEventListener('keyup', (event) => {
      if (event.key === 'Tab') {
        check(event.target);
      }
    });
  };

  return { setup };
})();
