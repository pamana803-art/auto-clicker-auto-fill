import { Logger } from '@dhruv-techapps/core-common';
import { RADIO_CHECKBOX_NODE_NAME } from '../../common/constant';
import CommonEvents, { ElementType, UNKNOWN_ELEMENT_TYPE_ERROR } from './common.events';

const CHANGE_EVENT = ['input', 'change'];

export const PrependEvents = (() => {
  const checkNode = (element:ElementType, value:string) => {
    if (element instanceof HTMLDivElement) {
      element.textContent = value + element.textContent;
    } else if (element.nodeName === 'SELECT' || element.nodeName === 'TEXTAREA' || (element.nodeName === 'INPUT' && !RADIO_CHECKBOX_NODE_NAME.test(element.type))) {
      element.value = value + element.value;
      element.dispatchEvent(CommonEvents.getFillEvent());
    } else {
      console.error(UNKNOWN_ELEMENT_TYPE_ERROR, element);
    }
    CHANGE_EVENT.forEach((event) => {
      element.dispatchEvent(new MouseEvent(event, CommonEvents.getMouseEventProperties()));
    });
    element.focus();
  };

  const start = (elements:Array<ElementType>, value:string) => {
    value = value.replace(/^prepend::/i, '');
    Logger.colorDebug(`PrependEvents`, { value });
    CommonEvents.loopElements(elements, value, checkNode);
  };

  return { start };
})();
