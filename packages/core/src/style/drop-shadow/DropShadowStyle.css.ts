import { globalStyle } from '@vanilla-extract/css';
import { ComponentToken } from '../../component/ComponentToken';
import { calcDropShadow } from './DropShadowCalculator';
import { DropShadowLevelType } from './DropShadowLevelType';
import { DropShadowStyleVariable } from './DropShadowStyleVariable';

const shadow = calcDropShadow(undefined, `var(--${DropShadowStyleVariable.SHADOW_COLOR}, #000000)`, undefined);

globalStyle(`.${ComponentToken.DROP_SHADOW}`, {
  boxShadow: `var(--${DropShadowStyleVariable.SHADOW_STYLE}, ${shadow.primary.toCSSValue()}, ${shadow.secondary.toCSSValue()})`,
});

const shadow2 = calcDropShadow(2, `var(--${DropShadowStyleVariable.SHADOW_COLOR}, #000000)`, undefined);
globalStyle(`.${ComponentToken.DROP_SHADOW}.${DropShadowLevelType.LEVEL_2}`, {
  boxShadow: `var(--${DropShadowStyleVariable.SHADOW_STYLE}, ${shadow2.primary.toCSSValue()}, ${shadow2.secondary.toCSSValue()})`,
});

const shadow5 = calcDropShadow(5, `var(--${DropShadowStyleVariable.SHADOW_COLOR}, #000000)`, undefined);
globalStyle(`.${ComponentToken.DROP_SHADOW}.${DropShadowLevelType.LEVEL_5}`, {
  boxShadow: `var(--${DropShadowStyleVariable.SHADOW_STYLE}, ${shadow5.primary.toCSSValue()}, ${shadow5.secondary.toCSSValue()})`,
});

const shadow10 = calcDropShadow(10, `var(--${DropShadowStyleVariable.SHADOW_COLOR}, #000000)`, undefined);
globalStyle(`.${ComponentToken.DROP_SHADOW}.${DropShadowLevelType.LEVEL_10}`, {
  boxShadow: `var(--${DropShadowStyleVariable.SHADOW_STYLE}, ${shadow10.primary.toCSSValue()}, ${shadow10.secondary.toCSSValue()})`,
});

const shadow20 = calcDropShadow(20, `var(--${DropShadowStyleVariable.SHADOW_COLOR}, #000000)`, undefined);
globalStyle(`.${ComponentToken.DROP_SHADOW}.${DropShadowLevelType.LEVEL_20}`, {
  boxShadow: `var(--${DropShadowStyleVariable.SHADOW_STYLE}, ${shadow20.primary.toCSSValue()}, ${shadow20.secondary.toCSSValue()})`,
});

const shadow30 = calcDropShadow(30, `var(--${DropShadowStyleVariable.SHADOW_COLOR}, #000000)`, undefined);
globalStyle(`.${ComponentToken.DROP_SHADOW}.${DropShadowLevelType.LEVEL_30}`, {
  boxShadow: `var(--${DropShadowStyleVariable.SHADOW_STYLE}, ${shadow30.primary.toCSSValue()}, ${shadow30.secondary.toCSSValue()})`,
});

const shadow40 = calcDropShadow(40, `var(--${DropShadowStyleVariable.SHADOW_COLOR}, #000000)`, undefined);
globalStyle(`.${ComponentToken.DROP_SHADOW}.${DropShadowLevelType.LEVEL_40}`, {
  boxShadow: `var(--${DropShadowStyleVariable.SHADOW_STYLE}, ${shadow40.primary.toCSSValue()}, ${shadow40.secondary.toCSSValue()})`,
});
