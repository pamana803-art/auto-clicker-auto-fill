import { useEffect } from 'react';

export function useEffectCoverLayout() {
  useEffect(() => {
    const rootElement = document.querySelector('#root');
    if (rootElement) {
      rootElement.classList = 'd-flex h-100 text-center text-bg-dark';
    }
  }, []);
}
