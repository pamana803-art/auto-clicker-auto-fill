export type StorageMessengerSetProps = { [key: string]: any };

export type StorageMessengerGetProps = string | string[] | { [key: string]: any } | null | undefined;

export type StorageMessengerRemoveProps = string | string[];

export type StorageRequest = {
  messenger: 'storage';
  methodName: 'get' | 'set' | 'remove';
  message: StorageMessengerGetProps | StorageMessengerSetProps | StorageMessengerRemoveProps;
};

export class StorageMessenger {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async get(keys: StorageMessengerGetProps): Promise<{ [key: string]: any }> {
    return chrome.storage.local.get(keys);
  }

  async set(items: StorageMessengerSetProps): Promise<void> {
    return chrome.storage.local.set(items);
  }

  async remove(keys: StorageMessengerRemoveProps): Promise<void> {
    return chrome.storage.local.remove(keys);
  }
}
