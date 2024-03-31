import clsx from 'clsx';
import { useMemo } from 'react';
import { backgroundStyle, blurStyle, shadowStyle } from '../../domain/StyleClass';

export type BackgroundLevel = 0 | 1 | 2 | 3 | 4;
export type ShadowLevel = 0 | 1 | 2 | 3 | 4;
export type BlurLevel = 0 | 1;

const NAME = 'bm-a-card';
export const useCardStyle = (style?: CardStyle) => {
  const className = useMemo(
    () =>
      style == null
        ? ''
        : clsx([
            NAME,
            getBackgroundStyleClass(style.background),
            getShadowStyleClass(style.shadow),
            getBlurStyleClass(style.blur)
          ]),
    [style]
  );

  return {
    name: NAME,
    className,
    getBackgroundStyleClass,
    getShadowStyleClass,
    getBlurStyleClass
  };
};

export interface CardStyle {
  background: BackgroundLevel;
  blur: BlurLevel;
  shadow: ShadowLevel;
}

function getBackgroundStyleClass(level?: BackgroundLevel) {
  if (level == null) {
    return backgroundStyle[1];
  }
  if (level === 0) {
    return '';
  }
  return backgroundStyle[level - 1] ?? backgroundStyle[1];
}

function getShadowStyleClass(level?: ShadowLevel) {
  if (level == null || level === 0) {
    return '';
  }
  return shadowStyle[level - 1] ?? shadowStyle[1];
}

function getBlurStyleClass(level?: BlurLevel) {
  if (level == null || level === 0) {
    return '';
  }
  return blurStyle[0];
}
