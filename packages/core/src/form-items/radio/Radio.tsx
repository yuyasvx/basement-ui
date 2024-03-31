import { CSSProperties, FC, InputHTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { AppearanceAdaptable, BaseComponentProps } from '../../base/BaseComponent';
import { AppearanceType } from '../../domain/AppearanceType';
import { FormEvents, MouseEvents } from '../../domain/EventProps';
import { BulletMark } from '../../element/markable/BulletMark';
import { Markable } from '../../element/markable/Markable';
import { useAppearanceHook } from '../../hook/AppearanceHook';
import { useInputHook } from '../../hook/InputHook';

interface RadioDetailedProps {
  checkmark?: ReactNode;
  radioStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  autoTint?: boolean;
  // ↓Checkedは必須。ネイティブのラジオフォームの挙動を完全に再現できないため。
  checked: boolean;
  // indeterminate?: boolean;
}

const NAME = 'bm-c-radio';
const INNER_RADIO_NAME = `${NAME}__inner-radio`;
const INNER_LABEL_NAME = `${NAME}__inner-label`;

type CustomizedInputHTMLAttributes = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'checked'>;
export type RadioProps = PropsWithChildren<
  RadioDetailedProps &
    BaseComponentProps &
    AppearanceAdaptable &
    MouseEvents<HTMLLabelElement> &
    FormEvents<HTMLInputElement> &
    CustomizedInputHTMLAttributes
>;

export const useRadioHook = (props: RadioProps) => {
  const { inputProps, labelProps, innerProps } = useInputHook(props, NAME, 'radio', INNER_LABEL_NAME);
  // const mouseEvents = getMouseEventHandler<HTMLLabelElement, typeof props>(props);
  // const formEvents = getFormEventHandler<HTMLInputElement, typeof props>(props);
  // const attributes = getInputAttributes(props);
  // const { disabled, inputRef } = useCheckboxHook(props);
  const appearance = useAppearanceHook(props.appearance ?? AppearanceType.NORMAL, props.autoTint && props.checked);
  // const classNames = useMemo(() => clsx(NAME, RootStyle.BASE, RootStyle.TEXT_BASE), []);

  return {
    labelProps,
    inputProps,
    // labelProps: {
    //   className: classNames,
    //   ...mouseEvents,
    //   style: props.style,
    //   htmlFor: props.name
    // },
    // inputProps: {
    //   ...attributes,
    //   type: 'radio',
    //   id: props.id,
    //   ref: inputRef,
    //   tabIndex: props.tabIndex,
    //   ...formEvents
    // },
    markableProps: {
      appearance,
      style: props.radioStyle,
      marked: props.checked,
      disabled: props.disabled ?? false,
      className: INNER_RADIO_NAME
    },
    innerProps
    // innerLabelProps: {
    //   className: INNER_LABEL_NAME,
    //   style: props.labelStyle
    // }
  };
};

export const Radio: FC<RadioProps> = (props) => {
  const { labelProps, inputProps, markableProps, innerProps } = useRadioHook(props);

  return (
    <label {...labelProps}>
      <input {...inputProps} />
      <Markable symbol={<BulletMark />} {...markableProps} />
      {props.children && <span {...innerProps}>{props.children}</span>}
    </label>
  );
};
