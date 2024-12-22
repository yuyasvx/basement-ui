import { globalStyle } from '@vanilla-extract/css';
import { ComponentToken } from '../ComponentToken';

globalStyle(`.${ComponentToken.modalFrame.BACKDROP}`, {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: 1,
});

globalStyle(`.${ComponentToken.modalFrame.CONTAINER}`, {
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 2,
});
