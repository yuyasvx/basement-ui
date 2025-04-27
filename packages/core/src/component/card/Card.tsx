import clsx from 'clsx';
import { type CSSProperties, forwardRef, type HTMLAttributes, type PropsWithChildren, useMemo } from 'react';
import { useVariant, type VariantAcceptable } from '../../hook/variant/VariantHook';
import type { Case } from '../../lib/Case';
import { DropShadowLevelType } from '../../style/drop-shadow/DropShadowLevelType';
import { type DropShadowStyleProps, useDropShadowStyle } from '../../style/drop-shadow/DropShadowStyleHook';
import { ComponentToken } from '../ComponentToken';
import { CardStyleVariable } from './CardStyleVariable';

export const CardVariant = {
  SHADOW: 'shadow',
  BORDER: 'border',
} as const;

export type CardStyleProps = {
  variantOption?: {
    borderWidth?: number;
    borderColor?: string;
  } & DropShadowStyleProps;
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
  const { backdropBlur, backgroundAlpha, baseColor, radius, variantOption, ...restProps1 } = props;
  const styleOverrideEnabled = useMemo(() => isStyleOverrideEnabled(props), [props]);

  const { restProps: restProps2, variant, variantClassName } = useVariant(restProps1, CardVariant.SHADOW as Case<typeof CardVariant>);
  const dropShadowStyle = useDropShadowStyle(variantOption ?? { level: DropShadowLevelType.LEVEL_10 });
  const alphaPercent = backgroundAlpha != null ? percent(backgroundAlpha) : undefined;
  const cls = useMemo(
    () => clsx(ComponentToken.CARD, variantClassName, { '-alpha-override': backgroundAlpha != null }, { '-blur': backdropBlur != null }),
    [backdropBlur, backgroundAlpha, variantClassName],
  );

  return {
    newProps: {
      className: cls,
      style: mergeStyleOverride(
        styleOverrideEnabled
          ? ({
              [`--${CardStyleVariable.BASE_COLOR}`]: baseColor,
              [`--${CardStyleVariable.RADIUS}`]: radius != null ? `${radius}px` : undefined,
              [`--${CardStyleVariable.BASE_ALPHA}`]: alphaPercent != null ? `${alphaPercent}%` : undefined,
              [`--${CardStyleVariable.BACKDROP_BLUR}`]: backdropBlur != null ? `${backdropBlur}px` : undefined,
              [`--${CardStyleVariable.BORDER_WIDTH}`]: variantOption?.borderWidth != null ? `${variantOption?.borderWidth}px` : undefined,
              [`--${CardStyleVariable.BORDER_COLOR}`]: variantOption?.borderColor,
            } as CSSProperties)
          : undefined,
        variant === CardVariant.SHADOW ? dropShadowStyle.newProps.style : undefined,
      ),
    },
    restProps: restProps2,
  };
}

Card.displayName = 'Card';

function mergeStyleOverride(cardStyle?: CSSProperties, dropShadowStyle?: CSSProperties) {
  if (cardStyle == null && dropShadowStyle == null) {
    return undefined;
  }

  return {
    ...cardStyle,
    ...dropShadowStyle,
  };
}

function percent(value: number) {
  const val = value > 1 ? 1 : value < 0 ? 0 : value;
  return val * 100;
}

function isStyleOverrideEnabled(props: CardStyleProps) {
  const { backdropBlur, backgroundAlpha, baseColor, radius, variantOption } = props;
  return baseColor != null || variantOption != null || radius != null || backgroundAlpha != null || backdropBlur != null;
}
