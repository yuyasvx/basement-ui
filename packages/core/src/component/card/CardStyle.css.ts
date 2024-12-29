import { globalStyle } from '@vanilla-extract/css';
import { ComponentToken } from '../ComponentToken';
import { CardVariant } from './Card';
import { calcCardShadow } from './CardShadowCalculator';
import { CardStyleVariable } from './CardStyleVariable';

globalStyle(`.${ComponentToken.CARD}`, {
  backgroundColor: `var(--${CardStyleVariable.BASE_COLOR}, #F5F5F5)`,
  borderRadius: `var(--${CardStyleVariable.RADIUS}, 10px)`,
});

const shadow = calcCardShadow(10);

globalStyle(`.${ComponentToken.CARD}.--${CardVariant.SHADOW}`, {
  boxShadow: `var(--${CardStyleVariable.SHADOW_STYLE}, ${shadow.primary.toCSSValue()}, ${shadow.secondary.toCSSValue()})`,
});

globalStyle(`.${ComponentToken.CARD}.-alpha-override`, {
  backgroundColor: `color-mix(in srgb, var(--${CardStyleVariable.BASE_COLOR}, #F5F5F5) var(--${CardStyleVariable.BASE_ALPHA}, 0%), transparent)`,
});

globalStyle(`.${ComponentToken.CARD}.-blur`, {
  backdropFilter: `blur(var(--${CardStyleVariable.BACKDROP_BLUR}, 10px))`,
});

globalStyle(`.${ComponentToken.CARD}.--${CardVariant.BORDER}`, {
  border: `var(--${CardStyleVariable.BORDER_WIDTH}, 1px) solid var(--${CardStyleVariable.BORDER_COLOR}, #CBCBCB)`,
});
