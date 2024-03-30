import { useEffect } from 'react';

const KEY = 'bm-scroll-lock';

const cleanup = () => {
  if (document.body.classList.contains(KEY)) {
    document.body.classList.remove(KEY);
  }
};

export const useScrollLock = (enabled = true) => {
  useEffect(() => {
    if (!enabled) {
      return cleanup;
    }
    if (!document.body.classList.contains(KEY)) {
      document.body.classList.add(KEY);
    }
    return cleanup;
  }, [enabled]);
};
