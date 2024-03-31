import { CSSProperties, FC, PropsWithChildren, ReactNode, useEffect, useRef } from 'react';
import { AppearanceAdaptable, BaseComponentProps } from '../../base/BaseComponent';
import { AppearanceType } from '../../domain/AppearanceType';
import { FormEvents, MouseEvents } from '../../domain/EventProps';
import { Checkmark } from '../../element/markable/Checkmark';
import { IndeterminateMark } from '../../element/markable/IndeterminateMark';
import { Markable } from '../../element/markable/Markable';
import { useAppearanceHook } from '../../hook/AppearanceHook';
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
    AppearanceAdaptable &
    MouseEvents<HTMLLabelElement> &
    FormEvents<HTMLInputElement> &
    CustomizedInputHTMLAttributes
>;

const NAME = 'bm-c-checkbox';
const INNER_CHECKBOX_NAME = 'bm-c-checkbox__inner-checkbox';
const INNER_LABEL_NAME = 'bm-c-checkbox__inner-label';

export const useCheckboxHook = (props: CheckboxProps) => {
  const { inputProps, labelProps, innerProps } = useInputHook(props, NAME, 'checkbox', INNER_LABEL_NAME);
  const inputRef = useRef<HTMLInputElement>(null);
  const appearance = useAppearanceHook(props.appearance ?? AppearanceType.NORMAL, props.autoTint && props.checked);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = props.indeterminate ?? false;
    }
  }, [props.indeterminate]);

  return {
    labelProps,
    inputProps,
    markableProps: {
      appearance,
      style: props.checkboxStyle,
      marked: props.checked ?? props.indeterminate ?? false,
      disabled: props.disabled ?? false,
      className: INNER_CHECKBOX_NAME,
      symbol: props.indeterminate ? <IndeterminateMark /> : <Checkmark />
    },
    innerProps
  };
};

export const Checkbox: FC<CheckboxProps> = (props) => {
  const { labelProps, markableProps, innerProps, inputProps } = useCheckboxHook(props);

  return (
    <label {...labelProps}>
      <input {...inputProps}></input>
      <Markable {...markableProps} />
      {props.children && <span {...innerProps}>{props.children}</span>}
    </label>
  );
};
