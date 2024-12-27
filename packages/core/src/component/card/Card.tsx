import clsx from 'clsx';
import { useMemo } from 'react';
import { useVariant, type VariantAcceptable } from '../../hook/variant/VariantHook';
import type { Case } from '../../lib/Case';
import { ComponentToken } from '../ComponentToken';
import { calcCardShadow } from './CardShadowCalculator';
import { CardStyleVariable } from './CardStyleVariable';

export const CardVariant = {
  SHADOW: 'shadow',
  BORDER: 'border',
} as const;

export type CardProps = {
  variantOption?: {
    shadow?: number;
    borderWidth?: number;
    borderColor?: string;
  };
  baseColor?: string;
  radius?: number;
  backgroundAlpha?: number;
  backdropBlur?: number;
} & VariantAcceptable<typeof CardVariant>;

export function useCardStyle(props: CardProps) {
  const variant = useVariant(props, CardVariant.SHADOW as Case<typeof CardVariant>);
  const shadowValue = useMemo(() => calcCardShadow(props.variantOption?.shadow ?? 10), [props.variantOption?.shadow]);
  const alphaPercent = props.backgroundAlpha != null ? percent(props.backgroundAlpha) : undefined;
  const cls = useMemo(
    () => clsx(ComponentToken.CARD, variant, { '-alpha-override': props.backgroundAlpha != null }, { '-blur': props.backdropBlur != null }),
    [props.backdropBlur, props.backgroundAlpha, variant],
  );

  return {
    newProps: {
      className: cls,
      style: {
        ...shadowValue.cssStyle,
        [`--${CardStyleVariable.BASE_COLOR}`]: props.baseColor,
        [`--${CardStyleVariable.RADIUS}`]: props.radius,
        [`--${CardStyleVariable.BASE_ALPHA}`]: `${alphaPercent}%`,
        [`--${CardStyleVariable.BACKDROP_BLUR}`]: props.backdropBlur != null ? `${props.backdropBlur}px` : undefined,
        [`--${CardStyleVariable.BORDER_WIDTH}`]: props.variantOption?.borderWidth != null ? `${props.variantOption?.borderWidth}px` : undefined,
        [`--${CardStyleVariable.BORDER_COLOR}`]: props.variantOption?.borderColor,
      },
    },
  };
}

export function percent(value: number) {
  const val = value > 1 ? 1 : value < 0 ? 0 : value;
  return val * 100;
}
