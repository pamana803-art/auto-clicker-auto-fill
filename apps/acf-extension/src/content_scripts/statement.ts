import { ACTION_CONDITION_OPR, ACTION_RUNNING } from '@dhruv-techapps/acf-common';
import { Logger } from '@dhruv-techapps/core-common';

const Statement = (() => {
  const conditionResult = (conditions, actions) => {
    Logger.colorDebug('Condition Result', { conditions, actions });
    return conditions
      .map(({ actionIndex, status, operator }) => ({ status: actions[actionIndex] === status, operator }))
      .reduce((accumulator, currentValue) => {
        if (currentValue.operator === undefined) {
          return currentValue.status;
        }
        return currentValue.operator === ACTION_CONDITION_OPR.AND ? accumulator && currentValue.status : accumulator || currentValue.status;
      }, undefined);
  };

  const checkThen = (condition, then, goto) => {
    Logger.colorDebug('Check Then', { condition, then, goto });
    let result;
    if (condition) {
      if (then === ACTION_RUNNING.GOTO) {
        result = goto;
      } else {
        result = then === ACTION_RUNNING.PROCEED;
      }
    } else {
      result = then !== ACTION_RUNNING.PROCEED;
    }
    return result;
  };

  const check = async (actions, { conditions, then, goto }) => {
    if (conditions && then) {
      const result = checkThen(conditionResult(conditions, actions), then, goto);
      Logger.colorDebug('Statement Result', result);
      return result;
    }

    return true;
  };

  return { check, checkThen, conditionResult };
})();

export default Statement;
