import { renderHook } from '@testing-library/react';
import { useInputHook } from './InputHook';

describe('useInputHook', () => {
  test('nameを付与してもラベルのPropsには付与しない', () => {
    const rendered = renderHook(() =>
      useInputHook({ name: 'example-name' }, 'test-compoent', 'checkbox', 'label-class')
    );
    expect(rendered.result.current.inputProps.name).toBe('example-name');
    expect(rendered.result.current.labelProps).toStrictEqual({
      className: 'test-compoent bm-base bm-text-base',
      onClick: undefined,
      onContextMenu: undefined,
      onDoubleClick: undefined,
      onDrag: undefined,
      onDragEnd: undefined,
      onDragEnter: undefined,
      onDragExit: undefined,
      onDragLeave: undefined,
      onDragOver: undefined,
      onDragStart: undefined,
      onDrop: undefined,
      onMouseDown: undefined,
      onMouseEnter: undefined,
      onMouseLeave: undefined,
      onMouseMove: undefined,
      onMouseOut: undefined,
      onMouseOver: undefined,
      onMouseUp: undefined,
      style: undefined
    });
  });
});
