import { ACTION_STATUS, Action } from '@dhruv-techapps/acf-common';
import Common from './common';
import Value from './util/value';
import Events from './events';
import { wait } from './util';
import { Sheets } from './util/google-sheets';

const LOGGER_LETTER = 'Action';

const ActionProcessor = (() => {
  const repeatFunc = async (elements: Array<HTMLElement>, repeat?: number, repeatInterval?: number | string, value?: string): Promise<ACTION_STATUS> => {
    if (repeat !== undefined) {
      if (repeat > 0 || repeat < -1) {
        await wait(repeatInterval, `${LOGGER_LETTER} Repeat`, repeat, '<interval>');
        repeat -= 1;
        await Events.check(elements, value);
        return await repeatFunc(elements, repeat, repeatInterval, value);
      }
    }
    return ACTION_STATUS.DONE;
  };

  const start = async (action: Action, batchRepeat: number, sheets?: Sheets) => {
    const elementFinder = action.elementFinder.replaceAll('<batchRepeat>', String(batchRepeat));
    const elements = await Common.start(elementFinder, action.settings);
    if (!elements) {
      return ACTION_STATUS.SKIPPED;
    } else if (typeof elements === 'number') {
      return elements;
    }
    const value = action.value ? await Value.getValue(action.value, batchRepeat, sheets) : action.value;
    await Events.check(elements, value);
    return await repeatFunc(elements, action.repeat, action.repeatInterval, value);
  };

  return { start };
})();

export default ActionProcessor;
