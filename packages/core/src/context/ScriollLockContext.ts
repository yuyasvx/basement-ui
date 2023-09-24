import { useCallback } from 'react';

export function useScrollLockContextInitializer() {
  const lock = useCallback(() => {
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
  }, []);
  const unlock = useCallback(() => {
    document.body.style.width = 'unset';
    document.body.style.height = 'unset';
    document.body.style.overflow = 'unset';
  }, []);

  return {
    lock,
    unlock
  };
}
