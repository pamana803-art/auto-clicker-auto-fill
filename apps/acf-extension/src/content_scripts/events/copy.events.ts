import { Logger } from '@dhruv-techapps/core-common';
import { RADIO_CHECKBOX_NODE_NAME } from '../../common/constant';

const LOCAL_STORAGE_COPY = 'auto-clicker-copy';
const LOGGER_LETTER = 'CopyEvents';

type ElementType = HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement | HTMLDivElement;
export const CopyEvents = (() => {
  const applyFilter = (text: string, value: string) => {
    Logger.colorDebug('applyFilter', { text, value });
    if (value) {
      const matches = text.match(new RegExp(value));
      if (matches) {
        [text] = matches;
      }
    }
    return text;
  };

  const getValue = (element: ElementType) => {
    if (element instanceof HTMLDivElement) {
      return element.textContent;
    }
    if (element.nodeName === 'SELECT' || element.nodeName === 'TEXTAREA' || (element.nodeName === 'INPUT' && !RADIO_CHECKBOX_NODE_NAME.test(element.type))) {
      return element.value;
    }
    return element.innerText || element.innerHTML;
  };

  const start = (elements: Array<ElementType>, value: string) => {
    try {
      console.groupCollapsed(LOGGER_LETTER);
      Logger.colorDebug('Start', value);
      const text = getValue(elements[0]);
      Logger.colorDebug('Text', text);
      const result = applyFilter(text, value.replace(/copy::/gi, ''));
      Logger.colorDebug('Result', result);
      localStorage.setItem(LOCAL_STORAGE_COPY, result);
      console.groupEnd();
    } catch (error) {
      console.groupEnd();
      throw error;
    }
  };

  return { start };
})();
