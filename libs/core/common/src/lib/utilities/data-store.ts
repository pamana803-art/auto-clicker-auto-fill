/* eslint-disable @typescript-eslint/no-explicit-any */
export class DataStore {
  private static inst: DataStore;

  [index: string]: any | ((s: string, v: any) => void);

  public static getInst(): DataStore {
    if (!this.inst) {
      this.inst = new DataStore();
    }
    return this.inst;
  }

  setItem(key: string, value: any) {
    this[key] = value;
  }

  getItem<T>(key: string): T {
    return this[key];
  }
}
