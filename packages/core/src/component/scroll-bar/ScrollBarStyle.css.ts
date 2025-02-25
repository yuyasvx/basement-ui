import { globalStyle } from '@vanilla-extract/css';
import { ComponentToken } from '../ComponentToken';
import { ScrollBarImplType } from './ScrollBar';
import { ScrollBarVariable } from './ScrollBarVariable';

globalStyle(`.${ComponentToken.SCROLL_BAR}`, {
  position: 'absolute',
  width: 'max-content',
});
globalStyle(`.${ComponentToken.SCROLL_BAR}.${ScrollBarImplType.VERTICAL}`, {
  right: 0,
  top: 0,
  height: `var(--${ScrollBarVariable.VERTICAL_GUTTER_WIDTH}, 0px)`,
});

globalStyle(`.${ComponentToken.SCROLL_BAR}[data-bmui-sleep="true"]`, {
  pointerEvents: 'none',
});

globalStyle(`.${ComponentToken.SCROLL_BAR}.${ScrollBarImplType.VERTICAL} .${ComponentToken.scrollBar.frame}`, {
  boxSizing: 'border-box',
  width: `var(--${ScrollBarVariable.FRAME_WIDTH}, 12px)`,
  minHeight: `var(--${ScrollBarVariable.FRAME_MIN_LENGTH}, 0px)`,
  height: `var(--${ScrollBarVariable.VERTICAL_FRAME_LENGTH}, 0px)`,
  display: 'flex',
  transform: `translateY(var(--${ScrollBarVariable.VERTICAL_FRAME_POSITION}, 0px))`,
  padding: '3px',
});

globalStyle(`.${ComponentToken.scrollBar.knob}`, {
  pointerEvents: 'auto',
  flexGrow: 1,
  boxSizing: 'border-box',
  background: 'rgba(96, 96, 96, 0.45)',
  border: '1px solid rgba(255, 255, 255, 0.6)',
  borderRadius: '2px',
});
