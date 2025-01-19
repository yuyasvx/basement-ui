import { globalStyle } from '@vanilla-extract/css';
import { ComponentToken } from '../ComponentToken';
import { PopupVariable } from './PopupVariable';

globalStyle(`.${ComponentToken.POPUP}`, {
  position: 'relative',
  width: 'max-content',
  height: 'max-content',
});

globalStyle(`.${ComponentToken.POPUP} > .${ComponentToken.popup.CONTENT}`, {
  position: 'absolute',
  width: 'max-content',
  height: 'max-content',
  zIndex: `var(--${PopupVariable.Z_INDEX}, 1)`,
});
