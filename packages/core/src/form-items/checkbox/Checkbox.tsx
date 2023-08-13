import { CSSProperties, FC, PropsWithChildren, ReactNode, useEffect, useRef } from 'react';
import { AppearanceType } from '../../domain/AppearanceType';
import { AppearanceAdaptable, BaseComponentProps } from '../../base/BaseComponent';
import { FormEvents, MouseEvents } from '../../domain/EventProps';
import { Markable } from '../../element/markable/Markable';
import { IndeterminateMark } from '../../element/markable/IndeterminateMark';
import { Checkmark } from '../../element/markable/Checkmark';
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

export const Checkbox: FC<CheckboxProps> = props => {
  const { labelProps, markableProps, innerProps, inputProps } = useCheckboxHook(props);

  return (
    <label {...labelProps}>
      <input {...inputProps}></input>
      <Markable {...markableProps} />
      {props.children && <span {...innerProps}>{props.children}</span>}
    </label>
  );
};

// export const Checkbox: FC<CheckboxProps> = props => {
//   const mouseEvents = getMouseEventHandler<HTMLLabelElement, typeof props>(props);
//   const formEvents = getFormEventHandler<HTMLInputElement, typeof props>(props);
//   const attributes = getInputAttributes(props);
//   const { disabled, inputRef } = useCheckboxHook(props);
//   const appearance = useAppearanceHook(props.appearance ?? AppearanceType.NORMAL, props.autoTint && props.checked);
//   const classNames = useMemo(() => clsx(NAME, RootStyle.BASE, RootStyle.TEXT_BASE), []);
//
//   return (
//     <label className={classNames} {...mouseEvents} style={props.style} htmlFor={props.name}>
//       <input
//         {...attributes}
//         type="checkbox"
//         id={props.id}
//         ref={inputRef}
//         tabIndex={props.tabIndex}
//         {...formEvents}
//       ></input>
//       <Markable
//         appearance={appearance}
//         symbol={props.indeterminate ? <IndeterminateMark /> : <Checkmark />}
//         style={props.checkboxStyle}
//         marked={props.checked || props.indeterminate || false}
//         disabled={disabled}
//         className={INNER_CHECKBOX_NAME}
//       />
//       <span className={INNER_LABEL_NAME} style={props.labelStyle}>
//         {props.children}
//       </span>
//     </label>
//   );
// };
