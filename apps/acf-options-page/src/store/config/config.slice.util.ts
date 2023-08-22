import { Action, Configuration, defaultConfig } from '@dhruv-techapps/acf-common';
import { blogCheckAPI } from '../blog';

export const getConfigName = (url?: string) => {
  if (url && url.match('://.*') !== null) {
    return url.split('/')[2];
  }
  return url;
};

export const checkQueryParams = (_configs: Array<Configuration>, thunkAPI) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const object: any = {};
  let selectedConfigIndex = 0;
  if (window.location.search) {
    const params = window.location.search.replace('?', '').split('&');
    Object.values(params).forEach((param) => {
      const [name, value] = param.split('=');
      object[name] = decodeURIComponent(value);
    });
    if (object.url) {
      selectedConfigIndex = _configs.findIndex((_config) => _config.url === object.url);
      if (selectedConfigIndex === -1 && object.elementFinder) {
        const newConfig = { ...defaultConfig, name: 'getautoclicker.com' };
        newConfig.url = object.url;
        newConfig.actions[0].elementFinder = object.elementFinder;
        _configs.push(newConfig);
        selectedConfigIndex = _configs.length - 1;
      } else if (object.error) {
        const XPathIndex = _configs[selectedConfigIndex].actions.findIndex((action) => action.elementFinder === object.elementFinder);
        if (XPathIndex !== -1) {
          _configs[selectedConfigIndex].actions[XPathIndex].error = 'elementFinder';
        }
      } else if (object.elementFinder) {
        const XPathIndex = _configs[selectedConfigIndex].actions.findIndex((action) => action.elementFinder === object.elementFinder);
        if (XPathIndex === -1) {
          const action: Action = { elementFinder: object.elementFinder };
          _configs[selectedConfigIndex].actions.push(action);
        }
      }
    } else if (object.version) {
      thunkAPI.dispatch(blogCheckAPI(object.version));
    }
  }
  return selectedConfigIndex;
};
