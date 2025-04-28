import { globalStyle } from '@vanilla-extract/css';
import { ComponentToken } from '../ComponentToken';

globalStyle(`.${ComponentToken.scrollableView.INDEX}`, {
  position: 'relative',
  display: 'flex',
});

globalStyle(`.${ComponentToken.scrollableView.INDEX} > .${ComponentToken.scrollableView.FRAME}`, {
  overflow: 'scroll',
  flexGrow: '1',
  scrollbarWidth: 'none',
});

globalStyle(`.${ComponentToken.scrollableView.INDEX} > .${ComponentToken.scrollableView.FRAME} > .${ComponentToken.scrollableView.CONTENT}`, {
  width: 'max-content',
  height: 'max-content',
});
