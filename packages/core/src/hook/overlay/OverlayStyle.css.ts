import { globalStyle } from '@vanilla-extract/css';
import { ComponentToken } from '../../component/ComponentToken';

/**
 * @internal
 */
globalStyle(`#${ComponentToken.OVERLAY}`, {
  position: 'absolute',
  top: 0,
  left: 0,
});
