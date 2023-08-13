import { CSSProperties, InputHTMLAttributes, useMemo, useRef } from 'react';
import clsx from 'clsx';
import { getInputAttributes } from '../util/InputAttributes';
import { getFormEventHandler, getMouseEventHandler } from '../util/Handler';
import { RootStyle } from '../domain/StyleClass';
import { FormEvents, MouseEvents } from '../domain/EventProps';

export type CustomizedInputHTMLAttributes = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

export type InputHookContext = MouseEvents<HTMLLabelElement> &
  FormEvents<HTMLInputElement> &
  CustomizedInputHTMLAttributes & { labelStyle?: CSSProperties };

export const useInputHook = (
  props: InputHookContext,
  componentName: string,
  inputType: string,
  innerLabelName: string
) => {
  const attributes = getInputAttributes(props);
  const mouseEvents = getMouseEventHandler<HTMLLabelElement, typeof props>(props);
  const formEvents = getFormEventHandler<HTMLInputElement, typeof props>(props);
  const inputRef = useRef<HTMLInputElement>(null);
  const classNames = useMemo(() => clsx(componentName, RootStyle.BASE, RootStyle.TEXT_BASE), [componentName]);

  return {
    labelProps: {
      className: classNames,
      style: props.style,
      htmlFor: props.name,
      ...mouseEvents
    },
    inputProps: {
      ...attributes,
      type: inputType,
      id: props.id,
      ref: inputRef,
      tabIndex: props.tabIndex,
      ...formEvents
    },
    innerProps: {
      className: innerLabelName,
      style: props.labelStyle
    }
  };
};
