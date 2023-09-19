import { useCallback, useState } from 'react';

export function useForceRefresh() {
  const [v, sv] = useState(true);
  return useCallback(() => {
    sv(!v);
  }, [v]);
}
