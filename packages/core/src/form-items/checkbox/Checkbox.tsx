import { CSSProperties, FC, PropsWithChildren, ReactNode, useEffect, useMemo, useRef } from 'react';
import { BaseComponentProps } from '../../base/BaseComponent';
import { FormEvents, MouseEvents } from '../../domain/EventProps';
import { Checkmark } from '../../element/markbox/Checkmark';
import { IndeterminateMark } from '../../element/markbox/IndeterminateMark';
import { Markbox, MarkboxProps } from '../../element/markbox/Markbox';
import { CustomizedInputHTMLAttributes, useInputHook } from '../../hook/InputHook';
import { StyleSets } from '../../style-element/StyleSetHook';
import { VariantAdaptable } from '../../style-element/VariantAdaptable';
import { VariantType } from '../../style-element/VariantType';

interface CheckboxDetailedProps {
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

export const Checkbox: FC<CheckboxProps> = (props) => {
  const { component } = useCheckboxComponent(props);

  return (
    <label {...component.main.props}>
      <input {...component.input.props}></input>
      <Markbox {...component.markbox.props} />
      {props.children && <span {...component.inner}>{props.children}</span>}
    </label>
  );
};

export const useCheckboxComponent = (props: CheckboxProps) => {
  const componentKey = StyleSets.CHECKBOX;
  const { inputProps, labelProps, innerProps } = useInputHook(
    props,
    componentKey,
    'checkbox',
    `${componentKey}__inner-label`
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const variant = props.autoTint ? decideVaraint(props.checked ?? false) : props.variant ?? VariantType.NORMAL;

  const markboxProps: MarkboxProps = useMemo(
    () => ({
      variant,
      style: props.checkboxStyle,
      marked: props.checked ?? props.indeterminate ?? false,
      disabled: props.disabled ?? false,
      status: props.disabled ? 'disabled' : undefined,
      className: `${componentKey}__inner-checkbox`,
      mark: props.indeterminate ? <IndeterminateMark /> : <Checkmark />
    }),
    [componentKey, props.checkboxStyle, props.checked, props.disabled, props.indeterminate, variant]
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = props.indeterminate ?? false;
    }
  }, [props.indeterminate]);

  return {
    component: {
      main: {
        key: componentKey,
        props: labelProps
      },
      input: {
        props: inputProps
      },
      markbox: {
        props: markboxProps
      },
      inner: {
        props: {
          ...innerProps,
          children: props.children
        }
      }
    }
  };
};

function decideVaraint(checked: boolean) {
  return checked ? VariantType.TINT : VariantType.NORMAL;
}
