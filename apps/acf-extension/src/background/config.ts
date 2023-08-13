import { LOCAL_STORAGE_KEY } from '@dhruv-techapps/acf-common'
import { MessengerConfig } from '@dhruv-techapps/core-extension'

export default class Config implements MessengerConfig{
  async processPortMessage({ href }) {
    const { configs = [] } = await chrome.storage.local.get(LOCAL_STORAGE_KEY.CONFIGS)
    let result = null
    let fullMatch = false
    configs
      .filter(config => config.enable && config.url)
      .forEach(config => {
        if (!result && this.urlMatcher(config.url, href)) {
          result = config
        }
        if (!fullMatch && config.url === href) {
          result = config
          fullMatch = true
        }
      })
    return result
  }

  urlMatcher(url, href) {
    return new RegExp(url).test(href) || href.indexOf(url) !== -1
  }
}
