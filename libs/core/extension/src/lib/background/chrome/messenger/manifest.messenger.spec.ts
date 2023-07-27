import { manifest } from '../../../common'
import { ManifestMessenger } from '../../../../src/background/chrome/messenger'

beforeAll(() => {
  chrome.runtime.getManifest.mockImplementation(() => manifest)
})

describe('ManifestMessenger', () => {
  test('value', () => {
    const key = 'name'
    ManifestMessenger.value({ key }).then(response => {
      expect(response).toBeDefined()
      expect(response[key]).toBeDefined()
      expect(response[key]).toEqual(manifest[key])
    })
  })
  test('action.default_icon', () => {
    const key = 'action.default_icon'
    ManifestMessenger.value({ key }).then(response => {
      expect(response).toBeDefined()
      expect(response[key]).toBeDefined()
      expect(response[key]).toEqual(manifest.action.default_icon)
    })
  })
  test('values', () => {
    const keys = Object.keys(manifest)
    ManifestMessenger.values({ keys }).then(response => {
      expect(response).toBeDefined()
      keys.forEach(key => {
        expect(response[key]).toBeDefined()
        expect(response[key]).toEqual(manifest[key])
      })
    })
  })
  test('Call values without keys', async () => {
    await expect(ManifestMessenger.values({})).rejects.toThrow(Error)
  })
  test('Call value without key', async () => {
    await expect(ManifestMessenger.value({})).rejects.toThrow(Error)
  })
})
