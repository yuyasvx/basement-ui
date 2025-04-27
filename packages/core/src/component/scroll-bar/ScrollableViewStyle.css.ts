import { globalStyle } from '@vanilla-extract/css';
import { ComponentToken } from '../ComponentToken';

globalStyle(`.${ComponentToken.SCROLLABLE_VIEW}`, {
  position: 'relative',
  display: 'flex',
});

globalStyle(`.${ComponentToken.SCROLLABLE_VIEW} > .${ComponentToken.scrollableView.FRAME}`, {
  overflow: 'scroll',
  flexGrow: '1',
  scrollbarWidth: 'none',
});

globalStyle(`.${ComponentToken.SCROLLABLE_VIEW} > .${ComponentToken.scrollableView.FRAME} > .${ComponentToken.scrollableView.CONTENT}`, {
  width: 'max-content',
  height: 'max-content',
});
