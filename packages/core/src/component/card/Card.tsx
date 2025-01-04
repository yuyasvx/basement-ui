import clsx from 'clsx';
import { type FC, type HTMLAttributes, type PropsWithChildren, useMemo } from 'react';
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
    shadow?: number;
    borderWidth?: number;
    borderColor?: string;
  };
  baseColor?: string;
  radius?: number;
  backgroundAlpha?: number;
  backdropBlur?: number;
} & VariantAcceptable<typeof CardVariant>;

export type CardProps = PropsWithChildren<CardStyleProps & HTMLAttributes<HTMLDivElement>>;

export const Card: FC<CardProps> = (props) => {
  const { variantOption, baseColor, radius, backgroundAlpha, backdropBlur, variant, ...restProps } = props;

  const { newProps } = useCardStyle({ variantOption, baseColor, radius, backgroundAlpha, backdropBlur, variant });
  newProps.className = useMemo(() => clsx(newProps.className, props.className), [newProps.className, props.className]);
  newProps.style = { ...newProps.style, ...props.style };

  return <div {...newProps} {...restProps} />;
};

export function useCardStyle(props: CardStyleProps) {
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
        [`--${CardStyleVariable.RADIUS}`]: props.radius != null ? `${props.radius}px` : undefined,
        [`--${CardStyleVariable.BASE_ALPHA}`]: alphaPercent != null ? `${alphaPercent}%` : undefined,
        [`--${CardStyleVariable.BACKDROP_BLUR}`]: props.backdropBlur != null ? `${props.backdropBlur}px` : undefined,
        [`--${CardStyleVariable.BORDER_WIDTH}`]: props.variantOption?.borderWidth != null ? `${props.variantOption?.borderWidth}px` : undefined,
        [`--${CardStyleVariable.BORDER_COLOR}`]: props.variantOption?.borderColor,
      },
    },
  };
}

function percent(value: number) {
  const val = value > 1 ? 1 : value < 0 ? 0 : value;
  return val * 100;
}
