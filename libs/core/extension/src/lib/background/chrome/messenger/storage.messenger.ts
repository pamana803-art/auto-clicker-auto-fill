type StorageMessengerProps = {
  items: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
};

export class StorageMessenger {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async get({ items }: StorageMessengerProps): Promise<{ [key: string]: any }> {
    return chrome.storage.local.get(items);
  }

  async set({ items }: StorageMessengerProps): Promise<void> {
    return chrome.storage.local.set(items);
  }

  async remove({ keys }: { keys: string | string[] }): Promise<void> {
    return chrome.storage.local.remove(keys);
  }
}
