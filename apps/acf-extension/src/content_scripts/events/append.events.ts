import { Logger } from '@dhruv-techapps/core-common';
import { RADIO_CHECKBOX_NODE_NAME } from '../../common/constant';
import CommonEvents, { UNKNOWN_ELEMENT_TYPE_ERROR } from './common.events';

const CHANGE_EVENT = ['input', 'change'];
export const AppendEvents = (() => {
  const checkNode = (element: HTMLElement, value: string) => {
    //TODO
    if (element instanceof HTMLDivElement) {
      element.textContent += value;
    } else if (element instanceof HTMLTextAreaElement || (element instanceof HTMLInputElement && !RADIO_CHECKBOX_NODE_NAME.test(element.type))) {
      element.value += value;
      element.dispatchEvent(CommonEvents.getFillEvent());
    } else {
      console.error(UNKNOWN_ELEMENT_TYPE_ERROR);
    }
    CHANGE_EVENT.forEach((event) => {
      element.dispatchEvent(new MouseEvent(event, CommonEvents.getMouseEventProperties()));
    });
    element.focus();
  };

  const start = (elements: Array<HTMLElement>, value: string) => {
    value = value.replace(/^append::/i, '');
    Logger.colorDebug(`AppendEvents`, value);
    CommonEvents.loopElements(elements, value, checkNode);
  };

  return { start };
})();
