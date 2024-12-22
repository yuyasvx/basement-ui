import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { ComponentToken } from '../ComponentToken';
import { ModalFrame } from './ModalFrame';

describe('Snapshot Test', () => {
  test('renders h1 text', () => {
    render(
      <ModalFrame backdropLock backdrop={<div>backdrop</div>}>
        <div>modal content</div>
      </ModalFrame>,
    );
    const portalTarget = document.getElementById(ComponentToken.OVERLAY);
    expect(portalTarget).toMatchSnapshot();
  });
});
