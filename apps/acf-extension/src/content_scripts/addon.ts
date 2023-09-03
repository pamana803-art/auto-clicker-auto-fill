import { ADDON_CONDITIONS, ActionSettings, Addon, RECHECK_OPTIONS, ValueExtractorFlags } from '@dhruv-techapps/acf-common';
import { ActionService } from '@dhruv-techapps/core-service';
import { Logger } from '@dhruv-techapps/core-common';
import { wait } from './util';
import { ConfigError, SystemError } from './error';
import Common from './common';
import { RADIO_CHECKBOX_NODE_NAME } from '../common/constant';

const LOGGER_LETTER = 'Addon';

type AddonType = { nodeValue: string | boolean } & Addon;

const AddonProcessor = (() => {
  const recheckFunc = async (
    { nodeValue, elementFinder, value, condition, recheck, recheckInterval, recheckOption, valueExtractor, valueExtractorFlags }: AddonType,
    batchRepeat: number,
    settings?: ActionSettings
  ): Promise<boolean> => {
    if (recheck !== undefined) {
      if (recheck > 0 || recheck < -1) {
        recheck -= 1;
        ActionService.setBadgeBackgroundColor(chrome.runtime.id, { color: [13, 202, 240, 1] });
        ActionService.setBadgeText(chrome.runtime.id, { text: 'Recheck' });
        await wait(recheckInterval, `${LOGGER_LETTER} Recheck`, recheck, '<interval>');
        // eslint-disable-next-line no-use-before-define
        return await start({ elementFinder, value, condition, recheck, recheckInterval, recheckOption, valueExtractor, valueExtractorFlags }, batchRepeat, settings);
      }
    }
    // eslint-disable-next-line no-console
    console.table([{ elementFinder, value, condition, nodeValue }]);
    if (recheckOption === RECHECK_OPTIONS.RELOAD) {
      if (document.readyState === 'complete') {
        window.location.reload();
      } else {
        window.addEventListener('load', () => {
          window.location.reload();
        });
      }
    } else if (recheckOption === RECHECK_OPTIONS.STOP) {
      throw new ConfigError(`'${nodeValue}' ${condition} '${value}'`, "Addon didn't matched");
    }
    Logger.colorInfo('RecheckOption', recheckOption);
    return false;
  };

  const extractValue = (element: HTMLElement, value: string, valueExtractor?: string, valueExtractorFlags?: ValueExtractorFlags): string => {
    if (!valueExtractor) {
      return value;
    }
    if (/^@\w+(-\w+)?$/.test(valueExtractor)) {
      return element.getAttribute(valueExtractor.replace('@', '')) || value;
    }
    const matches = value.match(RegExp(valueExtractor, valueExtractorFlags || ''));
    return (matches && matches.join('')) || value;
  };

  const getNodeValue = (elements: Array<HTMLElement>, valueExtractor?: string, valueExtractorFlags?: ValueExtractorFlags): string | boolean => {
    const element = elements[0];
    let value: string | boolean;
    if (element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement) {
      value = element.value;
    } else if (element instanceof HTMLInputElement) {
      if (RADIO_CHECKBOX_NODE_NAME.test(element.type)) {
        value = element.checked;
      } else {
        value = element.value;
      }
    } else if (element.isContentEditable) {
      value = element.textContent || element.innerText;
    } else {
      value = element.innerText;
    }
    if (typeof value === 'string') {
      value = extractValue(element, value, valueExtractor, valueExtractorFlags);
    }
    Logger.colorDebug('GetNodeValue', value);
    return value;
  };

  const compare = (nodeValue: string | boolean, condition: ADDON_CONDITIONS, value: string) => {
    Logger.colorDebug('Compare', { nodeValue, condition, value });
    if (/than/gi.test(condition) && (Number.isNaN(Number(nodeValue)) || Number.isNaN(Number(value)))) {
      throw new ConfigError(`Greater || Less can only compare number '${nodeValue}' '${value}'`, 'Wrong Comparison');
    }
    if (typeof nodeValue === 'boolean') {
      if (nodeValue && condition === ADDON_CONDITIONS['✓ Is Checked ']) {
        return true;
      } else if (!nodeValue && condition === ADDON_CONDITIONS['✕ Is Not Checked ']) {
        return true;
      }
      return false;
    }
    switch (condition) {
      case ADDON_CONDITIONS['= Equals']:
        return new RegExp(`^${value}$`, 'gi').test(nodeValue);
      case ADDON_CONDITIONS['!= Not Equals']:
        return !new RegExp(`^${value}$`, 'gi').test(nodeValue);
      case ADDON_CONDITIONS['~ Contains']:
        return new RegExp(`${value}`, 'gi').test(nodeValue);
      case ADDON_CONDITIONS['!~ Not Contains']:
        return !new RegExp(`${value}`, 'gi').test(nodeValue);
      case ADDON_CONDITIONS['> Greater Than']:
        return Number(nodeValue) > Number(value);
      case ADDON_CONDITIONS['>= Greater Than Equals']:
        return Number(nodeValue) >= Number(value);
      case ADDON_CONDITIONS['< Less Than']:
        return Number(nodeValue) < Number(value);
      case ADDON_CONDITIONS['<= Less Than Equals']:
        return Number(nodeValue) <= Number(value);
      default:
        throw new SystemError('Addon Condition not found', `${condition} condition not found`);
    }
  };

  const start = async ({ elementFinder, value, condition, valueExtractor, valueExtractorFlags, ...props }: Addon, batchRepeat: number, settings?: ActionSettings) => {
    try {
      Logger.colorDebug('Start', { elementFinder, value, condition, valueExtractor, valueExtractorFlags });
      let nodeValue;
      if (/^Func::/gi.test(elementFinder)) {
        nodeValue = await Common.sandboxEval(elementFinder.replace(/^Func::/gi, ''));
      } else {
        elementFinder = elementFinder.replaceAll('<batchRepeat>', String(batchRepeat));
        const elements = await Common.start(elementFinder, settings);
        if (elements) {
          nodeValue = getNodeValue(elements, valueExtractor, valueExtractorFlags);
        }
      }
      if (nodeValue !== undefined) {
        value = value.replaceAll('<batchRepeat>', String(batchRepeat));
        let result = compare(nodeValue, condition, value);
        if (!result) {
          result = await recheckFunc({ nodeValue, elementFinder, value, condition, valueExtractor, valueExtractorFlags, ...props }, batchRepeat, settings);
        }
        Logger.colorDebug('Compare Result', result);
        console.groupEnd();
        return result;
      }
      console.groupEnd();
      return false;
    } catch (error) {
      console.groupEnd();
      throw error;
    }
  };
  const check = async (batchRepeat: number, addon?: Addon, actionSettings?: ActionSettings) => {
    if (addon) {
      const { elementFinder, value, condition, ...props } = addon;
      if (elementFinder && value && condition) {
        console.groupCollapsed(LOGGER_LETTER);
        return await start({ elementFinder, value, condition, ...props }, batchRepeat, actionSettings);
      }
    }
    return true;
  };

  return { check };
})();

export default AddonProcessor;
