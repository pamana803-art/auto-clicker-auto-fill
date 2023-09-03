import { Action, Batch } from '@dhruv-techapps/acf-common';
import { NotificationsService } from '@dhruv-techapps/core-service';
import Actions from './actions';
import { wait } from './util';
import Common from './common';
import { Sheets } from './util/google-sheets';
import SettingsStorage from './store/settings-storage';

const LOGGER_LETTER = 'Batch';

const BatchProcessor = (() => {
  const refresh = () => {
    if (document.readyState === 'complete') {
      window.location.reload();
    } else {
      window.addEventListener('load', () => {
        window.location.reload();
      });
    }
  };

  const checkRepeat = async (actions: Array<Action>, batch: Batch, sheets?: Sheets) => {
    if (batch.repeat) {
      if (batch.repeat > 0) {
        for (let i = 0; i < batch.repeat; i += 1) {
          console.group(`${LOGGER_LETTER} #${i + 1}`);
          if (batch?.repeatInterval) {
            await wait(batch?.repeatInterval, `${LOGGER_LETTER} Repeat`, batch.repeat, '<interval>');
          }
          await Actions.start(actions, i + 1, sheets);
          const { notifications } = await new SettingsStorage().getSettings();
          if (notifications?.onBatch) {
            NotificationsService.create(chrome.runtime.id, {
              type: 'basic',
              title: 'Batch Completed',
              message: `#${i + 1} Batch`,
              silent: !notifications.sound,
              iconUrl: Common.getNotificationIcon(),
            });
          }
          console.groupEnd();
        }
      } else if (batch.repeat < -1) {
        let i = 1;
        // eslint-disable-next-line no-constant-condition
        while (true) {
          if (batch?.repeatInterval) {
            await wait(batch?.repeatInterval, `${LOGGER_LETTER} Repeat`, '∞', '<interval>');
          }
          await Actions.start(actions, i, sheets);
          i += 1;
        }
      }
    }
  };

  const start = async (actions: Array<Action>, batch?: Batch, sheets?: Sheets) => {
    try {
      console.group(`${LOGGER_LETTER} #0`);
      await Actions.start(actions, 0, sheets);
      console.groupEnd();
      if (batch) {
        if (batch.refresh) {
          refresh();
        } else {
          await checkRepeat(actions, batch, sheets);
        }
      }
    } catch (error) {
      console.groupEnd();
      throw error;
    }
  };

  return { start };
})();

export default BatchProcessor;
