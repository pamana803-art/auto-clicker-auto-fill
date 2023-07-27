import { StorageMessenger } from '../../../../src/background/chrome/messenger'

const keys = []
const items = []

describe('StorageMessenger', () => {
  test('get', () => {
    StorageMessenger.get({ keys }).then(() => {
      expect(chrome.storage.local.get).toBeCalledWith(keys)
    })
  })
  test('set', () => {
    StorageMessenger.set({ items }).then(() => {
      expect(chrome.storage.local.set).toBeCalledWith(items)
    })
  })
  test('remove', () => {
    StorageMessenger.remove({ keys }).then(() => {
      expect(chrome.storage.local.remove).toBeCalledWith(keys)
    })
  })
})
