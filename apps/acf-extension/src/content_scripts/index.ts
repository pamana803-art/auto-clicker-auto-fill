import { Configuration, LOAD_TYPES, LOCAL_STORAGE_KEY,  defaultSettings } from '@dhruv-techapps/acf-common'
import { DataStore,  Logger, LoggerColor } from '@dhruv-techapps/core-common'
import Config from './config'
import Session from './util/session'
import ConfigStorage from './store/config-storage'

async function loadConfig(loadType) {
  try {
    const { href, host } = document.location
    console.log(chrome)
    new ConfigStorage().getConfig(href).then(async (config:Configuration) => {
      if (config) {
        const { settings = defaultSettings } = await chrome.storage.local.get(LOCAL_STORAGE_KEY.SETTINGS)
        DataStore.getInst().setItem(LOCAL_STORAGE_KEY.SETTINGS, settings)
        if ((config.loadType || settings.loadType || LOAD_TYPES.WINDOW) === loadType) {
          Logger.color(chrome.runtime.getManifest().name, undefined, LoggerColor.PRIMARY, host, loadType)
          await Config.checkStartType(settings, config)
          Logger.color(chrome.runtime.getManifest().name, undefined, LoggerColor.PRIMARY, host, 'END')
        }
      } else {
        console.info('No config found', window.location.href)
      }
    })
  } catch (e) {
    Logger.colorError('Error', e)
    // GAService.error(chrome.runtime.id, { name: e.name, stack: e.stack })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  Session.check()
  loadConfig(LOAD_TYPES.DOCUMENT)
})

window.addEventListener('load', () => {
  loadConfig(LOAD_TYPES.WINDOW)
})
