import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { ComponentToken } from '../ComponentToken';
import { ModalFrame } from './ModalFrame';

describe('Modal Frame Snapshot', () => {
  test('Backdrop Lockが有効な時だけBackdropのカスタムができる', () => {
    render(
      <>
        <ModalFrame backdropLock backdrop={<div>backdrop</div>}>
          <div>modal content</div>
        </ModalFrame>
        <ModalFrame backdrop={<div>backdrop</div>}>
          <div>modal content</div>
        </ModalFrame>
      </>,
    );
    const portalTarget = document.getElementById(ComponentToken.OVERLAY);
    expect(portalTarget).toMatchSnapshot();
  });

  test('Backdrop Lockが有効な時だけ中身の位置調整が有効になる', () => {
    render(
      <>
        <ModalFrame backdropLock enableAlignment>
          <div>modal content</div>
        </ModalFrame>
        <ModalFrame enableAlignment>
          <div>modal content</div>
        </ModalFrame>
        <ModalFrame enableAlignment horizontalAlign="start">
          <div>modal content</div>
        </ModalFrame>
        <ModalFrame backdropLock enableAlignment horizontalAlign="start">
          <div>modal content</div>
        </ModalFrame>
      </>,
    );
    const portalTarget = document.getElementById(ComponentToken.OVERLAY);
    expect(portalTarget).toMatchSnapshot();
  });
});
