export * from './lib';
declare global {
  interface Window {
    __currentAction: number;
  }
}
