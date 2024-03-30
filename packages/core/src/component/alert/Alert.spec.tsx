import { cleanup, render, renderHook } from '@testing-library/react';
import { Alert, AlertContentLayout, useAlertComponent } from './Alert';

describe('Alert Component Snapshot', () => {
  afterEach(() => {
    cleanup();
  });

  test('Propsなし', () => {
    const { asFragment } = render(<Alert />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('Propsあり_レイアウト縦_中央揃えあり', () => {
    const { asFragment } = render(
      <Alert
        layout={AlertContentLayout.VERTICAL}
        centered
        icon={<div>icon</div>}
        iconPosition="right"
        title={<strong>title</strong>}
        footer={<div>footer</div>}
        footerPosition="right"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Propsあり_レイアウト縦_中央揃えなし', () => {
    const { asFragment } = render(
      <Alert
        layout={AlertContentLayout.VERTICAL}
        centered={false}
        icon={<div>icon</div>}
        iconPosition="right"
        title={<strong>title</strong>}
        footer={<div>footer</div>}
        footerPosition="right"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Propsあり_レイアウト横', () => {
    const { asFragment } = render(
      <Alert
        layout={AlertContentLayout.HORIZONTAL}
        centered
        icon={<div>icon</div>}
        iconPosition="right"
        title={<strong>title</strong>}
        footer={<div>footer</div>}
        footerPosition="right"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Alert Component Hook', () => {
  it('', () => {
    const { result } = renderHook(() => useAlertComponent({}));
    expect(result.current.mainProps.className).toBe(`bm-c-alert bm-base bm-content-base -horizontal -icon-left`);
  });
});
