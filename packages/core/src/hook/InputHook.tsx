import clsx from 'clsx';
import { CSSProperties, InputHTMLAttributes, useMemo, useRef } from 'react';
import { FormEvents, MouseEvents } from '../domain/EventProps';
import { RootStyle } from '../domain/StyleClass';
import { getFormEventHandler, getMouseEventHandler } from '../util/Handler';
import { getInputAttributes } from '../util/InputAttributes';

export type CustomizedInputHTMLAttributes = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>;

type InputHookProps = MouseEvents<HTMLLabelElement> &
  FormEvents<HTMLInputElement> &
  CustomizedInputHTMLAttributes & { labelStyle?: CSSProperties } & { dataProps?: { [key: string]: unknown } };

export const useInputHook = (
  props: InputHookProps,
  componentName: string,
  inputType: string,
  innerLabelName: string
) => {
  const attributes = getInputAttributes(props);
  const mouseEvents = getMouseEventHandler<HTMLLabelElement, typeof props>(props);
  const formEvents = getFormEventHandler<HTMLInputElement, typeof props>(props);
  const inputRef = useRef<HTMLInputElement>(null);
  const classNames = useMemo(() => clsx(componentName, RootStyle.BASE, RootStyle.TEXT_BASE), [componentName]);

  const labelProps = useMemo(
    () => ({
      className: classNames,
      style: props.style,
      // htmlFor: props.name,
      ...mouseEvents
    }),
    [classNames, mouseEvents, props.style]
  );

  const inputProps = useMemo(
    () => ({
      ...attributes,
      type: inputType,
      id: props.id,
      ref: inputRef,
      tabIndex: props.tabIndex,
      ...formEvents,
      ...props.dataProps
    }),
    [attributes, formEvents, inputType, props.dataProps, props.id, props.tabIndex]
  );

  const innerProps = useMemo(
    () => ({
      className: innerLabelName,
      style: props.labelStyle
    }),
    [innerLabelName, props.labelStyle]
  );

  return {
    labelProps,
    inputProps,
    innerProps
  };
};
