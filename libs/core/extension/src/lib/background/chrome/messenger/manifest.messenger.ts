type ManifestResult = {
  [key: string]: string | ManifestResult;
};

export type ManifestRequest = {
  class: 'manifest';
  methodName: 'values' | 'value';
};

export class ManifestMessenger {
  async values({ keys }: { keys: string[] }): Promise<ManifestResult> {
    if (!keys || !Array.isArray(keys)) {
      throw new Error('Keys is not provided or not of type Array');
    }
    const result: ManifestResult = {};
    keys.forEach((key) => {
      result[key] = this.#process(key);
    });
    return { ...result };
  }

  async value({ key }: { key: string }): Promise<ManifestResult> {
    if (!key || typeof key !== 'string') {
      throw new Error('Key is not provided or key is not of type string');
    }
    return { [key]: this.#process(key) };
  }

  #process = (key: string): string | ManifestResult => {
    let manifest: chrome.runtime.Manifest = chrome.runtime.getManifest();
    const keys = key.split('.');
    keys.forEach((prop) => {
      if (manifest) {
        manifest = manifest[prop];
      }
    });
    return manifest;
  };
}
