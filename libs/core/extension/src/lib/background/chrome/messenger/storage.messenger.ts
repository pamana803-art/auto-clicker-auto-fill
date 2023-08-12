export type StorageMessengerSetProps = { [key: string]: any };

export type StorageMessengerGetProps = string | string[] | { [key: string]: any } | null | undefined;

export type StorageMessengerRemoveProps = string | string[];

export type StorageRequest = {
  messenger: 'storage';
  methodName: 'get' | 'set' | 'remove';
} & (StorageMessengerGetProps | StorageMessengerSetProps | StorageMessengerRemoveProps);

export class StorageMessenger {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async get({ keys }: { keys: StorageMessengerGetProps }): Promise<{ [key: string]: any }> {
    return chrome.storage.local.get(keys);
  }

  async set({ items }: { items: StorageMessengerSetProps }): Promise<void> {
    return chrome.storage.local.set(items);
  }

  async remove({ keys }: { keys: StorageMessengerRemoveProps }): Promise<void> {
    return chrome.storage.local.remove(keys);
  }
}
