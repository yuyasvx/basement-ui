import type { Case } from '../../lib/Case';

export interface VariantAcceptable<ENUM> {
  variant?: Case<ENUM>;
}

export function useVariant<ENUM, P extends VariantAcceptable<ENUM>>(props: P, defaultValue: Case<ENUM>) {
  const { variant, ...restProps } = props;
  const val = variant ?? defaultValue;
  return {
    variantClassName: `--${val}`,
    restProps,
  };
}
