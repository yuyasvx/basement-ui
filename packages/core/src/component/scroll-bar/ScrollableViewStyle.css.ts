import { globalStyle } from '@vanilla-extract/css';
import { ComponentToken } from '../ComponentToken';

globalStyle(`.${ComponentToken.SCROLLABLE_VIEW}`, {
  position: 'relative',
  display: 'flex',
});

globalStyle(`.${ComponentToken.SCROLLABLE_VIEW} > .${ComponentToken.scrollableView.CONTENT}`, {
  overflow: 'scroll',
  flexGrow: '1',
  scrollbarWidth: 'none',
});
