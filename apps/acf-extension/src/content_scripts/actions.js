import { ACTION_STATUS, LOCAL_STORAGE_KEY } from '@dhruv-techapps/acf-common'
import { DataStore, Logger } from '@dhruv-techapps/core-common'
import { ActionService, NotificationsService } from '@dhruv-techapps/core-services'
import Action from './action'
import Statement from './statement'
import { wait } from './util'
import Addon from './addon'

const LOGGER_LETTER = 'Action'

const Actions = (() => {
  const setBadge = (batchRepeat, i) => {
    ActionService.setBadgeBackgroundColor(chrome.runtime.id, { color: [25, 135, 84, 1] })
    ActionService.setBadgeText(chrome.runtime.id, { text: `${batchRepeat}-${i}` })
    ActionService.setTitle(chrome.runtime.id, { title: `Batch:${batchRepeat} Action:${i}` })
  }

  const checkStatement = async (actions, action) => {
    const actionStatus = actions.map(_action => _action.status)
    const result = await Statement.check(actionStatus, action.statement)
    return result
  }

  const notify = action => {
    const settings = DataStore.getInst().getItem(LOCAL_STORAGE_KEY.SETTINGS)
    if (settings.notifications.onAction) {
      NotificationsService.create(chrome.runtime.id, { title: 'Action Completed', message: action.elementFinder, silent: !settings.notifications.sound })
    }
  }
  const start = async (actions, batchRepeat, sheets) => {
    let i = 0
    while (i < actions.length) {
      Logger.group(`${LOGGER_LETTER} #${i}`)
      setBadge(batchRepeat, i)
      const action = actions[i]
      const statementResult = await checkStatement(actions, action)
      if (statementResult === true) {
        await wait(action.initWait, `${LOGGER_LETTER} initWait`)
        if (await Addon.check(action.settings, batchRepeat, action.addon)) {
          action.status = await Action.start(action, batchRepeat, sheets)
          notify(action)
        } else {
          action.status = ACTION_STATUS.SKIPPED
        }
      } else {
        action.status = ACTION_STATUS.SKIPPED
        if (typeof statementResult !== 'boolean') {
          i = Number(statementResult) - 1
        }
      }
      Logger.groupEnd(`${LOGGER_LETTER} #${i}`)
      // Increment
      i += 1
    }
  }
  return { start }
})()

export default Actions
