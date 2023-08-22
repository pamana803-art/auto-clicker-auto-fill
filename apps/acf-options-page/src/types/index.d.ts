/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    dataLayer: any;
    adsLoaded: boolean;
    EXTENSION_ID: string;
    adsbygoogle: any;
  }
}
declare module 'react-table';
export {};
