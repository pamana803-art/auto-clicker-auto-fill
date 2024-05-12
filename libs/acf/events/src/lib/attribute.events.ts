import CommonEvents from './common.events';

export const AttributeEvents = (() => {
  const execCommand = (element: HTMLElement, value: string) => {
    const [, action, name, prop] = value.split('::');
    if (action === 'set') {
      element.setAttribute(name, prop);
    } else if (action === 'remove') {
      element.removeAttribute(name);
    }
  };

  const start = (elements: Array<HTMLElement>, value: string) => {
    console.debug(`Action #${window.__currentAction}`, elements, value);
    CommonEvents.loopElements(elements, value, execCommand);
  };
  return { start };
})();
