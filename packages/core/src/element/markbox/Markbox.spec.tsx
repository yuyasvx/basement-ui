import { cleanup, render, renderHook } from '@testing-library/react';
import { AppearanceType } from '../../domain/AppearanceType';
import { Markbox, useMarkboxElement } from './Markbox';

describe('Markbox Element Snapshot', () => {
  afterEach(() => {
    cleanup();
  });

  test('必須Propsのみ', () => {
    const { asFragment } = render(<Markbox mark={'X'} marked={false} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('Props', () => {
    const { asFragment } = render(<Markbox mark={'X'} marked variant={AppearanceType.TINT} effect={'disabled'} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('Base Props', () => {
    const { asFragment } = render(
      <Markbox
        mark={'-'}
        marked
        id={'example'}
        tabIndex={2}
        style={{ width: '100px' }}
        className="example-class"
        nativeProps={{ 'data-test': true }}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('useMarkboxElement', () => {
  test('Style Elementが適用されている', () => {
    const rendered = renderHook(() => useMarkboxElement({ variant: AppearanceType.NORMAL, mark: 'X', marked: true }));
    expect(rendered.result.current.newProps.className).toBe('bm-e-markbox bm-s-push --normal -marked');
  });

  test('Markを解除するとclassNameに反映される', () => {
    const rendered = renderHook(() => useMarkboxElement({ variant: AppearanceType.NORMAL, mark: 'X', marked: false }));
    expect(rendered.result.current.newProps.className).toBe('bm-e-markbox bm-s-push --normal');
  });
});
