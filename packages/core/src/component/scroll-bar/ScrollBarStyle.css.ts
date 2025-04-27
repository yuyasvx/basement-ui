import { globalStyle } from '@vanilla-extract/css';
import { ComponentToken } from '../ComponentToken';
import { ScrollBarImplType } from './ScrollBar';
import { ScrollBarVariable } from './ScrollBarVariable';

globalStyle(`.${ComponentToken.SCROLL_BAR}`, {
  position: 'absolute',
  width: 'max-content',
  display: 'flex',
});
globalStyle(`.${ComponentToken.SCROLL_BAR}.${ScrollBarImplType.VERTICAL}`, {
  right: 0,
  top: 0,
  height: `var(--${ScrollBarVariable.VERTICAL_GUTTER_WIDTH}, 0px)`,
  flexDirection: 'column',
});

globalStyle(`.${ComponentToken.SCROLL_BAR} > *`, {
  flexGrow: 0,
  flexShrink: 0,
});

/** スクロールバーのヘッドのオフセットの表現 */
globalStyle(`.${ComponentToken.SCROLL_BAR}.${ScrollBarImplType.VERTICAL}::before`, {
  flexGrow: 0,
  flexShrink: 0,
  content: ' ',
  display: 'block',
  width: '100%',
  height: `var(--${ScrollBarVariable.VERTICAL_HEAD_OFFSET}, 0px)`,
});

globalStyle(`.${ComponentToken.SCROLL_BAR}.${ScrollBarImplType.VERTICAL} .${ComponentToken.scrollBar.knob}`, {
  boxSizing: 'border-box',
  width: `var(--${ScrollBarVariable.FRAME_WIDTH}, 12px)`,
  minHeight: `var(--${ScrollBarVariable.KNOB_MIN_LENGTH}, 0px)`,
  height: `var(--${ScrollBarVariable.VERTICAL_KNOB_LENGTH}, 0px)`,
  display: 'flex',
  transform: `translateY(var(--${ScrollBarVariable.VERTICAL_KNOB_POSITION}, 0px))`,
  padding: '3px',
});

globalStyle(`.${ComponentToken.scrollBar.innerKnob}`, {
  flexGrow: 1,
  background: `var(--${ScrollBarVariable.KNOB_BACKGROUND}, rgba(96, 96, 96, 0.45))`,
  borderRadius: `var(--${ScrollBarVariable.KNOB_RADIUS}, 2px)`,
  boxShadow: `0 0 0 var(--${ScrollBarVariable.KNOB_BORDER_WIDTH}, 1px) var(${ScrollBarVariable.KNOB_BORDER_COLOR}, rgba(255, 255, 255, 0.6))`,
});
