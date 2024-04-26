import { CSSProperties, FC, InputHTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { BaseComponentProps, VariantAdaptable } from '../../base/BaseComponent';
import { AppearanceType } from '../../domain/AppearanceType';
import { FormEvents, MouseEvents } from '../../domain/EventProps';
import { BulletMark } from '../../element/markbox/BulletMark';
import { Markbox } from '../../element/markbox/Markbox';
import { useInputHook } from '../../hook/InputHook';

interface RadioDetailedProps {
  checkmark?: ReactNode;
  radioStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  autoTint?: boolean;
  // ↓Checkedは必須。ネイティブのラジオフォームの挙動を完全に再現できないため。
  checked: boolean;
}

type CustomizedInputHTMLAttributes = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'checked'>;
export type RadioProps = PropsWithChildren<
  RadioDetailedProps &
    BaseComponentProps &
    VariantAdaptable &
    MouseEvents<HTMLLabelElement> &
    FormEvents<HTMLInputElement> &
    CustomizedInputHTMLAttributes
>;

const NAME = 'bm-c-radio';

export const Radio: FC<RadioProps> = (props) => {
  const { labelProps, inputProps, markboxProps, innerProps } = useRadioComponent(props);

  return (
    <label {...labelProps}>
      <input {...inputProps} />
      <Markbox mark={<BulletMark />} {...markboxProps} />
      {props.children && <span {...innerProps}>{props.children}</span>}
    </label>
  );
};

export const useRadioComponent = (props: RadioProps) => {
  const { inputProps, labelProps, innerProps } = useInputHook(props, NAME, 'radio', `${NAME}__inner-label`);
  const variant = props.autoTint ? decideVaraint(props.checked ?? false) : props.variant ?? AppearanceType.NORMAL;

  return {
    labelProps,
    inputProps,
    markboxProps: {
      variant,
      style: props.radioStyle,
      marked: props.checked,
      disabled: props.disabled ?? false,
      effect: props.disabled ? 'disabled' : undefined,
      className: `${NAME}__inner-radio`
    },
    innerProps
  };
};

// TODO DRY
function decideVaraint(checked: boolean) {
  return checked ? AppearanceType.TINT : AppearanceType.NORMAL;
}
