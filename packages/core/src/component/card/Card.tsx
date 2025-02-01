import clsx from 'clsx';
import { forwardRef, type HTMLAttributes, type PropsWithChildren, useMemo } from 'react';
import { useVariant, type VariantAcceptable } from '../../hook/variant/VariantHook';
import type { Case } from '../../lib/Case';
import { ComponentToken } from '../ComponentToken';
import { calcCardShadow } from './CardShadowCalculator';
import { CardStyleVariable } from './CardStyleVariable';

export const CardVariant = {
  SHADOW: 'shadow',
  BORDER: 'border',
} as const;

export type CardStyleProps = {
  variantOption?: {
    shadowWidth?: number;
    shadowStrength?: number;
    borderWidth?: number;
    borderColor?: string;
  };
  baseColor?: string;
  radius?: number;
  backgroundAlpha?: number;
  backdropBlur?: number;
} & VariantAcceptable<typeof CardVariant>;

export type CardProps = PropsWithChildren<CardStyleProps & HTMLAttributes<HTMLDivElement>>;

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { className, style } = props;
  const { newProps, restProps } = useCardStyle(props);
  newProps.className = useMemo(() => clsx(newProps.className, className), [className, newProps.className]);
  newProps.style = { ...newProps.style, ...style };

  return <div {...restProps} {...newProps} ref={ref} />;
});

export function useCardStyle<P extends CardStyleProps>(props: P) {
  const { variantOption, baseColor, radius, backgroundAlpha, backdropBlur, ...restProps1 } = props;

  const { variantClassName, restProps: restProps2 } = useVariant(restProps1, CardVariant.SHADOW as Case<typeof CardVariant>);

  const shadowValue = useMemo(
    () => (variantOption?.shadowWidth != null ? calcCardShadow(variantOption.shadowWidth, variantOption.shadowStrength) : undefined),
    [variantOption?.shadowStrength, variantOption?.shadowWidth],
  );
  const alphaPercent = backgroundAlpha != null ? percent(backgroundAlpha) : undefined;
  const cls = useMemo(
    () => clsx(ComponentToken.CARD, variantClassName, { '-alpha-override': backgroundAlpha != null }, { '-blur': backdropBlur != null }),
    [backdropBlur, backgroundAlpha, variantClassName],
  );
  const styleOverrideEnabled = useMemo(() => isStyleOverrideEnabled(props), [props]);

  return {
    newProps: {
      className: cls,
      style: styleOverrideEnabled
        ? {
            ...shadowValue?.cssStyle,
            [`--${CardStyleVariable.BASE_COLOR}`]: baseColor,
            [`--${CardStyleVariable.RADIUS}`]: radius != null ? `${radius}px` : undefined,
            [`--${CardStyleVariable.BASE_ALPHA}`]: alphaPercent != null ? `${alphaPercent}%` : undefined,
            [`--${CardStyleVariable.BACKDROP_BLUR}`]: backdropBlur != null ? `${backdropBlur}px` : undefined,
            [`--${CardStyleVariable.BORDER_WIDTH}`]: variantOption?.borderWidth != null ? `${variantOption?.borderWidth}px` : undefined,
            [`--${CardStyleVariable.BORDER_COLOR}`]: variantOption?.borderColor,
          }
        : undefined,
    },
    restProps: restProps2,
  };
}

Card.displayName = 'Card';

function percent(value: number) {
  const val = value > 1 ? 1 : value < 0 ? 0 : value;
  return val * 100;
}

function isStyleOverrideEnabled(props: CardStyleProps) {
  const { variantOption, baseColor, radius, backgroundAlpha, backdropBlur } = props;
  return baseColor != null || variantOption != null || radius != null || backgroundAlpha != null || backdropBlur != null;
}
