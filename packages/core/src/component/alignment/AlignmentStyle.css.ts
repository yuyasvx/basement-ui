import { globalStyle } from '@vanilla-extract/css';
import { ComponentToken } from '../ComponentToken';

globalStyle(`.${ComponentToken.ALIGNMENT}`, {
  display: 'flex',
});

globalStyle(`.${ComponentToken.ALIGNMENT} > *`, {
  flexGrow: '0',
  flexShrink: '0',
});

['start', 'center', 'end'].forEach((propName) => {
  globalStyle(`.${ComponentToken.ALIGNMENT}.-h-${propName}`, {
    justifyContent: propName,
  });

  globalStyle(`.${ComponentToken.ALIGNMENT}.-v-${propName}`, {
    alignItems: propName,
  });
});
