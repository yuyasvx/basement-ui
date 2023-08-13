import { SyntheticEvent, ChangeEvent, MouseEventHandler, FormEventHandler, KeyboardEventHandler } from 'react';

export interface MouseEvents<EL = Element> {
  onClick?: MouseEventHandler<EL>;
  onMouseOver?: MouseEventHandler<EL>;
  onDoubleClick?: MouseEventHandler<EL>;
  onContextMenu?: MouseEventHandler<EL>;
  onMouseDown?: MouseEventHandler<EL>;
  onMouseUp?: MouseEventHandler<EL>;
  onDrag?: MouseEventHandler<EL>;
  onDragStart?: MouseEventHandler<EL>;
  onDragEnd?: MouseEventHandler<EL>;
  onDragEnter?: MouseEventHandler<EL>;
  onDragExit?: MouseEventHandler<EL>;
  onDragLeave?: MouseEventHandler<EL>;
  onDragOver?: MouseEventHandler<EL>;
  onDrop?: MouseEventHandler<EL>;
  onMouseEnter?: MouseEventHandler<EL>;
  onMouseLeave?: MouseEventHandler<EL>;
  onMouseMove?: MouseEventHandler<EL>;
  onMouseOut?: MouseEventHandler<EL>;
}

export interface KeyEvents<EL = Element> {
  onKeyDown?: KeyboardEventHandler<EL>;
  onKeyDownCapture?: KeyboardEventHandler<EL>;
  onKeyPress?: KeyboardEventHandler<EL>;
  onKeyPressCapture?: KeyboardEventHandler<EL>;
  onKeyUp?: KeyboardEventHandler<EL>;
  onKeyUpCapture?: KeyboardEventHandler<EL>;
}

export interface FocusEvents<EL = Element> {
  onFocus?: <EL, EV = Event>(event: SyntheticEvent<EL, EV>) => void;
  onBlur?: <EL, EV = Event>(event: SyntheticEvent<EL, EV>) => void;
}

export interface FormEvents<EL = Element> {
  onChange?: (evt: ChangeEvent<EL>) => void;
  onInput?: FormEventHandler<EL>;
  onInvalid?: FormEventHandler<EL>;
  onReset?: FormEventHandler<EL>;
  onSubmit?: FormEventHandler<EL>;
}

export interface PointerEvents<EL = Element> {
  onPointerDown?: <EL, EV = Event>(event: SyntheticEvent<EL, EV>) => void;
  onPointerMove?: <EL, EV = Event>(event: SyntheticEvent<EL, EV>) => void;
  onPointerUp?: <EL, EV = Event>(event: SyntheticEvent<EL, EV>) => void;
  onPointerCancel?: <EL, EV = Event>(event: SyntheticEvent<EL, EV>) => void;
  onGotPointerCapture?: <EL, EV = Event>(event: SyntheticEvent<EL, EV>) => void;
  onLostPointerCapture?: <EL, EV = Event>(event: SyntheticEvent<EL, EV>) => void;
  onPointerEnter?: <EL, EV = Event>(event: SyntheticEvent<EL, EV>) => void;
  onPointerLeave?: <EL, EV = Event>(event: SyntheticEvent<EL, EV>) => void;
  onPointerOver?: <EL, EV = Event>(event: SyntheticEvent<EL, EV>) => void;
  onPointerOut?: <EL, EV = Event>(event: SyntheticEvent<EL, EV>) => void;
}
