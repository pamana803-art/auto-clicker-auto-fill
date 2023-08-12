export type ActionRequest = {
  messenger: 'action';
  methodName: 'setIcon' | 'setBadgeBackgroundColor' | 'setBadgeText' | 'setTitle';
} & { details: chrome.action.TabIconDetails | chrome.action.BadgeColorDetails | chrome.action.BadgeTextDetails | chrome.action.TitleDetails };

export class ActionMessenger {
  setIcon(details: chrome.action.TabIconDetails, callback: () => void): void {
    chrome.action.setIcon(details, callback);
  }

  setBadgeBackgroundColor(details: chrome.action.BadgeColorDetails, callback: () => void): void {
    chrome.action.setBadgeBackgroundColor(details, callback);
  }

  setBadgeText(details: chrome.action.BadgeTextDetails, callback: () => void): void {
    chrome.action.setBadgeText(details, callback);
  }

  setTitle(details: chrome.action.TitleDetails, callback: () => void): void {
    chrome.action.setTitle(details, callback);
  }
}
