import { Logger } from '@dhruv-techapps/core-common';
import { RADIO_CHECKBOX_NODE_NAME } from '../../common/constant';

const LOCAL_STORAGE_COPY = 'auto-clicker-copy';
const LOGGER_LETTER = 'CopyEvents';

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

  const getValue = (element: HTMLElement) => {
    let text;
    if (element instanceof HTMLDivElement) {
      text = element.textContent;
    }
    if (element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement || (element instanceof HTMLInputElement && !RADIO_CHECKBOX_NODE_NAME.test(element.type))) {
      text = element.value;
    }
    return text || element.innerText || element.innerHTML;
  };

  const start = (elements: Array<HTMLElement>, value: string) => {
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
