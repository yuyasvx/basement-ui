import { globalStyle } from '@vanilla-extract/css';
import { calcDropShadow } from '../../style/drop-shadow/DropShadowCalculator';
import { StyleVariable } from '../../style/StyleVariable';
import { ComponentToken } from '../ComponentToken';
import { CardVariant } from './Card';
import { CardStyleVariable } from './CardStyleVariable';

globalStyle(`.${ComponentToken.CARD}`, {
  backgroundColor: `var(--${CardStyleVariable.BASE_COLOR}, #F5F5F5)`,
  borderRadius: `var(--${CardStyleVariable.RADIUS}, 10px)`,
});

const shadow = calcDropShadow(undefined, `var(--${StyleVariable.SHADOW_COLOR}, #000000)`, undefined);

globalStyle(`.${ComponentToken.CARD}.--${CardVariant.SHADOW}`, {
  boxShadow: `var(--${StyleVariable.SHADOW_STYLE}, ${shadow.primary.toCSSValue()}, ${shadow.secondary.toCSSValue()})`,
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
