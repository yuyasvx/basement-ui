import { useMemo } from 'react';
import type { Case } from '../../lib/Case';

export interface VariantAcceptable<ENUM> {
  variant?: Case<ENUM>;
}

export function useVariant<ENUM>(props: VariantAcceptable<ENUM>, defaultValue: Case<ENUM>) {
  const val = props.variant ?? defaultValue;
  return useMemo(() => `--${val}`, [val]);
}
