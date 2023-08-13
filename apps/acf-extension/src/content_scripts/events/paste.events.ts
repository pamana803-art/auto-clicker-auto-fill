import { Logger } from '@dhruv-techapps/core-common'
import { RADIO_CHECKBOX_NODE_NAME } from '../../common/constant'
import Common from '../common'
import CommonEvents, { ElementType, UNKNOWN_ELEMENT_TYPE_ERROR } from './common.events'


const LOCAL_STORAGE_COPY = 'auto-clicker-copy'
const CHANGE_EVENT = ['input', 'change']

const LOGGER_LETTER = 'PasteEvents'

export const PasteEvents = (() => {
  const checkNode = (element:ElementType, value:string) => {
    if (element instanceof HTMLDivElement) {
      element.textContent = value
    } else if (element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement || (element instanceof HTMLInputElement && !RADIO_CHECKBOX_NODE_NAME.test(element.type))) {
      element.value = value
      element.dispatchEvent(CommonEvents.getFillEvent())
    } else {
      console.error(UNKNOWN_ELEMENT_TYPE_ERROR)
    } 
    CHANGE_EVENT.forEach(event => {
      element.dispatchEvent(new MouseEvent(event, CommonEvents.getMouseEventProperties()))
    })
    element.focus()
  }

  const start = async (elements, value) => {
    try {
      console.groupCollapsed(LOGGER_LETTER)
      const copyContent = localStorage.getItem(LOCAL_STORAGE_COPY)
      Logger.colorDebug('Copy Content', copyContent)
      value = value.replace(/paste::/i, '')
      Logger.colorDebug('Value', value)
      value = await Common.sandboxEval(value, copyContent)
      CommonEvents.loopElements(elements, value, checkNode)
      console.groupEnd()
      return true
    } catch (error) {
      console.groupEnd()
      throw error
    }
  }

  return { start }
})()
