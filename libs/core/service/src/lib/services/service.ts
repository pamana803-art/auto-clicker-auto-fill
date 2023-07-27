

export class Service {
  static messageChrome(extensionId:string, message) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(extensionId, message, response => {
        if (chrome.runtime.lastError || response?.error) {
          reject(chrome.runtime.lastError || response?.error)
        } else {
          resolve(response)
        }
      })
    })
  }

  static async message(extensionId:string, message) {
    if (extensionId && typeof extensionId !== 'string') {
      return Promise.reject(new Error('extensionId is not undefined neither string'))
    }
    return await this.messageChrome(extensionId, message)
  }
}
