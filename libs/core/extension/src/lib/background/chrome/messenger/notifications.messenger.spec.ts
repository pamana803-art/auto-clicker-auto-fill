import { CHROME } from '@dhruv-techapps/core-common'
import { NotificationsMessenger } from '../../../../src/background/chrome/messenger'
import { manifest } from '../../../common'

const notificationId = 'test_notification'
const notificationOptions = { title: 'test title', message: 'test message' }

beforeAll(() => {
  chrome.runtime.getManifest.mockImplementation(() => manifest)
})

const cb = jest.fn()

describe('NotificationsMessenger', () => {
  test('create', () => {
    NotificationsMessenger.create({ notificationId, notificationOptions }, cb).then(() => {
      expect(chrome.notifications.create).toBeCalled()
      expect(chrome.notifications.create).toBeCalledWith(notificationId, { type: CHROME.NOTIFICATIONS_OPTIONS.TYPE.BASIC, iconUrl: manifest.action.default_icon, ...notificationOptions }, cb)
    })
  })
  test('clear', () => {
    NotificationsMessenger.clear({ notificationId }, cb)
    expect(chrome.notifications.clear).toBeCalledWith(notificationId, cb)
  })
  test('update', () => {
    NotificationsMessenger.update({ notificationId, notificationOptions }, cb)
    expect(chrome.notifications.update).toBeCalledWith(notificationId, notificationOptions, cb)
  })
})
