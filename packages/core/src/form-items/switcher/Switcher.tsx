import clsx from 'clsx';
import { CSSProperties, FC, PropsWithChildren, useMemo } from 'react';
import { BaseComponentProps } from '../../base/BaseComponent';
import { FormEvents, MouseEvents } from '../../domain/EventProps';
import { SwitcherElement } from '../../element/switchable/Switchable';
import { SwitcherKnobPosition } from '../../element/switchable/SwitcherKnobPosition';
import { CustomizedInputHTMLAttributes, useInputHook } from '../../hook/InputHook';
import { FlexStackProps, useFlexStackLayout } from '../../layout/flex-stack/FlexStack';
import { VariantType } from '../../style-element/VariantType';

interface SwitcherDetailedProps {
  switcherStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  autoTint?: boolean;
  layoutOption?: FlexStackProps;
}

export type SwitcherProps = PropsWithChildren<SwitcherDetailedProps> &
  BaseComponentProps &
  MouseEvents<HTMLLabelElement> &
  FormEvents<HTMLInputElement> &
  CustomizedInputHTMLAttributes;

const NAME = 'bm-c-switcher';
const INNER_LABEL_NAME = `${NAME}__inner-label`;

export const Switcher: FC<SwitcherProps> = (props) => {
  const { className: flexClass, itemName: flexItemClass } = useFlexStackLayout(props.layoutOption ?? {});
  const { inputProps, labelProps, innerProps } = useInputHook(props, NAME, 'checkbox', INNER_LABEL_NAME);

  const labelClassName = useMemo(() => clsx(labelProps.className, flexClass), [flexClass, labelProps.className]);
  const innerClassName = useMemo(
    () => clsx(innerProps.className, flexItemClass),
    [flexItemClass, innerProps.className]
  );
  const disabled = props.disabled ?? false;
  const effect = disabled ? 'disabled' : undefined;
  const knobPosition = props.checked ? SwitcherKnobPosition.ON : SwitcherKnobPosition.OFF;
  const variant = props.checked ? VariantType.TINT : VariantType.NORMAL;

  return (
    <label {...labelProps} className={labelClassName}>
      <input {...inputProps} />
      <SwitcherElement
        status={effect}
        knob={knobPosition}
        baseStyle={props.switcherStyle}
        variant={variant}
        className={flexItemClass}
      />
      <span {...innerProps} className={innerClassName}>
        {props.children}
      </span>
    </label>
  );
};
