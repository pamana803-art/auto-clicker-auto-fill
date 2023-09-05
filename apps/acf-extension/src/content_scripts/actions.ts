import { ACTION_STATUS, Action } from '@dhruv-techapps/acf-common';
import { ActionService, NotificationsService } from '@dhruv-techapps/core-service';
import ActionProcessor from './action';
import Statement from './statement';
import { wait } from './util';
import AddonProcessor from './addon';
import Common from './common';
import { Sheets } from './util/google-sheets';
import { ConfigError } from './error';
import SettingsStorage from './store/settings-storage';

const LOGGER_LETTER = 'Action';

const Actions = (() => {
  const setBadge = (batchRepeat: number, i: number) => {
    ActionService.setBadgeBackgroundColor(chrome.runtime.id, { color: [25, 135, 84, 1] });
    ActionService.setBadgeText(chrome.runtime.id, { text: `${batchRepeat}-${i}` });
    ActionService.setTitle(chrome.runtime.id, { title: `Batch:${batchRepeat} Action:${i}` });
  };

  const checkStatement = async (actions: Array<Action>, action: Action) => {
    const actionStatus = actions.map((action) => action.status).filter((status): status is string => !!status);
    const result = await Statement.check(actionStatus, action.statement);
    return result;
  };

  const notify = async (action: Action) => {
    const settings = await new SettingsStorage().getSettings();
    if (settings.notifications?.onAction) {
      NotificationsService.create(chrome.runtime.id, {
        type: 'basic',
        title: 'Action Completed',
        message: action.elementFinder,
        silent: !settings.notifications.sound,
        iconUrl: Common.getNotificationIcon(),
      });
    }
  };
  const start = async (actions: Array<Action>, batchRepeat: number, sheets?: Sheets) => {
    let i = 0;
    while (i < actions.length) {
      const action = actions[i];
      console.group(`${LOGGER_LETTER} #${action.name || i}`);
      if (!action.elementFinder) {
        throw new ConfigError('Element Finder is blank', 'Configuration Action');
      }
      setBadge(batchRepeat, i);
      const statementResult = await checkStatement(actions, action);
      if (statementResult === true) {
        await wait(action.initWait, `${LOGGER_LETTER} initWait`);
        if (await AddonProcessor.check(batchRepeat, action.addon, action.settings)) {
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
