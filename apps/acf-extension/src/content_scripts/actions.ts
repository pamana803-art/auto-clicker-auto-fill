import { ACTION_STATUS, Action, LOCAL_STORAGE_KEY, Settings, defaultActionStatement } from '@dhruv-techapps/acf-common';
import { DataStore } from '@dhruv-techapps/core-common';
import { ActionService, NotificationsService } from '@dhruv-techapps/core-service';
import ActionProcessor from './action';
import Statement from './statement';
import { wait } from './util';
import AddonProcessor from './addon';
import Common from './common';
import { Sheets } from './util/google-sheets';

const LOGGER_LETTER = 'Action';

const Actions = (() => {
  const setBadge = (batchRepeat, i) => {
    ActionService.setBadgeBackgroundColor(chrome.runtime.id, { color: [25, 135, 84, 1] });
    ActionService.setBadgeText(chrome.runtime.id, { text: `${batchRepeat}-${i}` });
    ActionService.setTitle(chrome.runtime.id, { title: `Batch:${batchRepeat} Action:${i}` });
  };

  const checkStatement = async (actions: Array<Action>, action: Action) => {
    const actionStatus = actions.map((_action) => _action.status);
    const result = await Statement.check(actionStatus, action.statement );
    return result;
  };

  const notify = (action) => {
    const settings = DataStore.getInst().getItem<Settings>(LOCAL_STORAGE_KEY.SETTINGS);
    if (settings.notifications.onAction) {
      NotificationsService.create(chrome.runtime.id, {
        type: 'basic',
        title: 'Action Completed',
        message: action.elementFinder,
        silent: !settings.notifications.sound,
        iconUrl: Common.getNotificationIcon(),
      });
    }
  };
  const start = async (actions: Array<Action>, batchRepeat: number, sheets: Sheets) => {
    let i = 0;
    while (i < actions.length) {
      console.group(`${LOGGER_LETTER} #${i}`);
      setBadge(batchRepeat, i);
      const action = actions[i];
      const statementResult = await checkStatement(actions, action);
      if (statementResult === true) {
        await wait(action.initWait, `${LOGGER_LETTER} initWait`);
        if (await AddonProcessor.check(action.settings, batchRepeat, action.addon)) {
          action.status = await ActionProcessor.start(action, batchRepeat, sheets);
          notify(action);
        } else {
          action.status = ACTION_STATUS.SKIPPED;
        }
      } else {
        action.status = ACTION_STATUS.SKIPPED;
        if (typeof statementResult !== 'boolean') {
          i = Number(statementResult) - 1;
        }
      }
      console.groupEnd();
      // Increment
      i += 1;
    }
  };
  return { start };
})();

export default Actions;
