import { ACTION_STATUS } from '@dhruv-techapps/acf-common';
import Common from './common';
import Value from './util/value';
import Events from './events';
import { wait } from './util';

const LOGGER_LETTER = 'Action';

const ActionProcessor = (() => {
  let elements;
  let value;

  const repeatFunc = async (repeat, repeatInterval) => {
    if (repeat > 0 || repeat < -1) {
      await wait(repeatInterval, `${LOGGER_LETTER} Repeat`, repeat, '<interval>');
      repeat -= 1;
      await Events.check(value, elements);
      return await repeatFunc(repeat, repeatInterval);
    }
    return ACTION_STATUS.DONE;
  };

  const start = async (action, batchRepeat, sheets) => {
    const elementFinder = action.elementFinder.replaceAll('<batchRepeat>', batchRepeat);
    elements = await Common.start(elementFinder, action.settings);
    if (!elements) {
      return ACTION_STATUS.SKIPPED;
    }
    value = Value.getValue(action.value, batchRepeat, sheets);
    await Events.check(value, elements);
    return await repeatFunc(action.repeat, action.repeatInterval);
  };

  return { start };
})();

export default ActionProcessor;
