import { CSSProperties, FC, PropsWithChildren, ReactNode, useEffect, useRef } from 'react';
import { BaseComponentProps, VariantAdaptable } from '../../base/BaseComponent';
import { AppearanceType } from '../../domain/AppearanceType';
import { FormEvents, MouseEvents } from '../../domain/EventProps';
import { Checkmark } from '../../element/markbox/Checkmark';
import { IndeterminateMark } from '../../element/markbox/IndeterminateMark';
import { Markbox } from '../../element/markbox/Markbox';
import { CustomizedInputHTMLAttributes, useInputHook } from '../../hook/InputHook';

interface CheckboxDetailedProps {
  // appearance?: Case<typeof AppearanceType>;
  checkmark?: ReactNode;
  checkboxStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  autoTint?: boolean;
  indeterminate?: boolean;
}

export type CheckboxProps = PropsWithChildren<
  CheckboxDetailedProps &
    BaseComponentProps &
    VariantAdaptable &
    MouseEvents<HTMLLabelElement> &
    FormEvents<HTMLInputElement> &
    CustomizedInputHTMLAttributes
>;

const NAME = 'bm-c-checkbox';

export const Checkbox: FC<CheckboxProps> = (props) => {
  const { labelProps, markboxProps, innerProps, inputProps } = useCheckboxComponent(props);

  return (
    <label {...labelProps}>
      <input {...inputProps}></input>
      <Markbox {...markboxProps} />
      {props.children && <span {...innerProps}>{props.children}</span>}
    </label>
  );
};

export const useCheckboxComponent = (props: CheckboxProps) => {
  const { inputProps, labelProps, innerProps } = useInputHook(props, NAME, 'checkbox', `${NAME}__inner-label`);
  const inputRef = useRef<HTMLInputElement>(null);
  const variant = props.autoTint ? decideVaraint(props.checked ?? false) : props.variant ?? AppearanceType.NORMAL;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = props.indeterminate ?? false;
    }
  }, [props.indeterminate]);

  return {
    labelProps,
    inputProps,
    markboxProps: {
      variant,
      style: props.checkboxStyle,
      marked: props.checked ?? props.indeterminate ?? false,
      disabled: props.disabled ?? false,
      effect: props.disabled ? 'disabled' : undefined,
      className: `${NAME}__inner-checkbox`,
      mark: props.indeterminate ? <IndeterminateMark /> : <Checkmark />
    },
    innerProps
  };
};

function decideVaraint(checked: boolean) {
  return checked ? AppearanceType.TINT : AppearanceType.NORMAL;
}
