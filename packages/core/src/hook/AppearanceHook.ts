import { useMemo } from 'react';
import { Case } from '../util/Case';
import { AppearanceType } from '../domain/AppearanceType';

export const useAppearanceHook = (
  appearance?: Case<typeof AppearanceType>,
  useTint = false
): Case<typeof AppearanceType> => {
  return useMemo(() => (useTint ? AppearanceType.TINT : appearance ?? AppearanceType.NORMAL), [appearance, useTint]);
};
