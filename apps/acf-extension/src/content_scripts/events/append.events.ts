import { Logger } from '@dhruv-techapps/core-common';
import { RADIO_CHECKBOX_NODE_NAME } from '../../common/constant';
import CommonEvents from './common.events';

const CHANGE_EVENT = ['input', 'change'];

type ElementType = HTMLInputElement | HTMLTextAreaElement | HTMLDivElement
export const AppendEvents = (() => {
  const checkNode = (element: ElementType, value: string) => {
    //TODO
    if (element instanceof HTMLDivElement) {
      element.textContent += value;
    } else if (element.nodeName === 'TEXTAREA' || (element.nodeName === 'INPUT' && !RADIO_CHECKBOX_NODE_NAME.test(element.type))) {
      element.value += value;
      element.dispatchEvent(CommonEvents.getFillEvent());
    }
    CHANGE_EVENT.forEach((event) => {
      element.dispatchEvent(new MouseEvent(event, CommonEvents.getMouseEventProperties()));
    });
    element.focus();
  };

  const start = (elements: Array<ElementType>, value: string) => {
    value = value.replace(/^append::/i, '');
    Logger.colorDebug(`AppendEvents`, value);
    CommonEvents.loopElements(elements, value, checkNode);
  };

  return { start };
})();
