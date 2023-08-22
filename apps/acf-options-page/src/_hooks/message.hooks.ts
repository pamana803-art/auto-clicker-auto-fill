import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

export const useTimeout = (effect: EffectCallback, deps?: DependencyList) => {
  const timeout = useRef<NodeJS.Timeout>();
  useEffect(() => {
    if (deps) {
      clearTimeout(timeout.current);
      timeout.current = setTimeout(effect, 2000);
    }
  }, [deps, effect]);
};
