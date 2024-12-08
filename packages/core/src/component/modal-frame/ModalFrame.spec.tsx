import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { ModalFrame } from './ModalFrame';

describe('Snapshot Test', () => {
  test('renders h1 text', () => {
    const { container } = render(<ModalFrame show />);
    expect(container.childNodes).toMatchSnapshot();
  });
});
