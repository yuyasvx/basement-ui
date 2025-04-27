import clsx from 'clsx';
import { type CSSProperties, useMemo } from 'react';
import { ComponentToken } from '../../component/ComponentToken';
import { StyleVariable } from '../StyleVariable';
import { calcDropShadow } from './DropShadowCalculator';
import type { DropShadowLevelType } from './DropShadowLevelType';

export type DropShadowStyleProps = {
  shadowWidth?: number;
  shadowColor?: string;
  shadowStrength?: number;
  level?: DropShadowLevelType;
};

export function useDropShadowStyle<P extends DropShadowStyleProps>({ level: propsLevel, shadowColor, shadowStrength, shadowWidth, ...restProps }: P) {
  const styleOverride = useMemo(() => shadowWidth != null || shadowStrength != null, [shadowStrength, shadowWidth]);
  const level = styleOverride ? undefined : propsLevel;
  const shadowValue = useMemo(
    () => (styleOverride ? calcDropShadow(shadowWidth, shadowColor, shadowStrength) : undefined),
    [shadowColor, shadowStrength, shadowWidth, styleOverride],
  );

  const className = useMemo(() => clsx(ComponentToken.DROP_SHADOW, level), [level]);
  const shadowColorStyle = useMemo(
    () =>
      !styleOverride
        ? ({
            [`--${StyleVariable.SHADOW_COLOR}`]: shadowColor,
          } as CSSProperties)
        : undefined,
    [shadowColor, styleOverride],
  );
  const style = useMemo(
    () => ({
      ...shadowValue?.cssStyle,
      ...shadowColorStyle,
    }),
    [shadowColorStyle, shadowValue],
  );

  return {
    newProps: {
      className,
      style,
    },
    restProps,
  };
}
