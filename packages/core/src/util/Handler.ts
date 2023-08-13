import { MouseEventHandler, PropsWithChildren } from 'react';
import { FocusEvents, FormEvents, KeyEvents, MouseEvents } from '../domain/EventProps';

// type MouseEventHandler = MouseEvent

export const getMouseEventHandler = <U extends Element, T extends MouseEvents<U>>(
  props: PropsWithChildren<T>
): Record<keyof MouseEvents<U>, MouseEventHandler<U> | undefined> => ({
  onClick: props.onClick,
  onMouseOver: props.onMouseOver,
  onDoubleClick: props.onDoubleClick,
  onContextMenu: props.onContextMenu,
  onMouseDown: props.onMouseDown,
  onMouseUp: props.onMouseUp,
  onDrag: props.onDrag,
  onDragStart: props.onDragStart,
  onDragEnd: props.onDragEnd,
  onDragEnter: props.onDragEnter,
  onDragExit: props.onDragExit,
  onDragLeave: props.onDragLeave,
  onDragOver: props.onDragOver,
  onDrop: props.onDrop,
  onMouseEnter: props.onMouseEnter,
  onMouseLeave: props.onMouseLeave,
  onMouseMove: props.onMouseMove,
  onMouseOut: props.onMouseOut
});

export const getKeyEventHandler = <U extends Element, T extends KeyEvents<U>>(
  props: PropsWithChildren<T>
): KeyEvents<U> => ({
  onKeyDown: props.onKeyDown,
  onKeyDownCapture: props.onKeyDownCapture,
  onKeyPress: props.onKeyPress,
  onKeyPressCapture: props.onKeyPressCapture,
  onKeyUp: props.onKeyUp,
  onKeyUpCapture: props.onKeyUpCapture
});

export const getFocusEventHandler = <U extends Element, T extends FocusEvents<U>>(
  props: PropsWithChildren<T>
): FocusEvents<U> => ({
  onFocus: props.onFocus,
  onBlur: props.onBlur
});

export const getFormEventHandler = <U extends Element, T extends FormEvents<U>>(
  props: PropsWithChildren<T>
): FormEvents<U> => ({
  onChange: props.onChange,
  onInput: props.onInput,
  onInvalid: props.onInvalid,
  onReset: props.onReset,
  onSubmit: props.onSubmit
});
