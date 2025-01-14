import { ACTION_CONDITION_OPR, ACTION_RUNNING, ActionCondition, ActionStatement, GOTO } from '@dhruv-techapps/acf-common';

const Statement = (() => {
  const conditionResult = (conditions: Array<ActionCondition>, actions: Array<string>) => {
    console.debug('Condition Result', { conditions, actions });
    return conditions
      .map(({ actionIndex, status, operator }) => ({ status: actions[actionIndex] === status, operator }))
      .reduce((accumulator, currentValue) => {
        if (currentValue.operator === undefined) {
          return currentValue.status;
        }
        return currentValue.operator === ACTION_CONDITION_OPR.AND ? accumulator && currentValue.status : accumulator || currentValue.status;
      }, false);
  };

  const checkThen = (condition: boolean | { status: boolean; operator: ACTION_CONDITION_OPR }, then: ACTION_RUNNING, goto?: GOTO): true => {
    console.debug('Check Then', { condition, then, goto });
    if (condition) {
      if (then === ACTION_RUNNING.GOTO) {
        throw goto;
      } else if (then === ACTION_RUNNING.PROCEED) {
        return true;
      } else {
        throw ACTION_RUNNING.SKIP;
      }
    } else {
      throw ACTION_RUNNING.SKIP;
    }
  };

  const check = async (actions: Array<string>, statement?: ActionStatement) => {
    if (statement) {
      const { conditions, then, goto } = statement;
      if (conditions && then) {
        const result = checkThen(conditionResult(conditions, actions), then, goto);
        console.debug('Statement Result', result);
        return result;
      }
    }

    return true;
  };

  return { check };
})();

export default Statement;
