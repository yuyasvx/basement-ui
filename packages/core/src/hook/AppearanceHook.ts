import { useMemo } from 'react';
import { AppearanceType } from '../domain/AppearanceType';
import { Case } from '../util/Case';

export const useAppearanceHook = (
  appearance?: Case<typeof AppearanceType>,
  useTint = false
): Case<typeof AppearanceType> => {
  return useMemo(() => (useTint ? AppearanceType.TINT : appearance ?? AppearanceType.NORMAL), [appearance, useTint]);
};
