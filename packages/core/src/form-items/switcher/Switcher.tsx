import { CSSProperties, FC, PropsWithChildren } from 'react';
import { FormEvents, MouseEvents } from '../../domain/EventProps';
import { BaseComponentProps } from '../../base/BaseComponent';
import { Switchable } from '../../element/switchable/Switchable';
import { CustomizedInputHTMLAttributes, useInputHook } from '../../hook/InputHook';

interface SwitcherDetailedProps {
  switcherStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  autoTint?: boolean;
}

export type SwitcherProps = PropsWithChildren<
  SwitcherDetailedProps &
    BaseComponentProps &
    MouseEvents<HTMLLabelElement> &
    FormEvents<HTMLInputElement> &
    CustomizedInputHTMLAttributes
>;

const NAME = 'bm-c-switcher';
const INNER_LABEL_NAME = `${NAME}__inner-label`;

export const Switcher: FC<SwitcherProps> = props => {
  const { inputProps, labelProps, innerProps } = useInputHook(props, NAME, 'checkbox', INNER_LABEL_NAME);

  return (
    <label {...labelProps}>
      <input {...inputProps}></input>
      <Switchable disabled={props.disabled ?? false} marked={props.checked || false} baseStyle={props.switcherStyle} />
      <span {...innerProps}>{props.children}</span>
    </label>
  );
};
