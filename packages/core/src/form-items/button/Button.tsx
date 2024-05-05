import clsx from 'clsx';
import { ButtonHTMLAttributes, ForwardedRef, PropsWithChildren, ReactNode, forwardRef, useMemo } from 'react';
import { BaseComponentProps, VariantAdaptable } from '../../base/BaseComponent';
import { MouseEvents } from '../../domain/EventProps';
import { FOCUSABLE_STYLE, RootStyle } from '../../domain/StyleClass';
import { useFlexStackLayout } from '../../layout/flex-stack/FlexStack';
import { StyleSets, useStyleSet } from '../../style-element/StyleSetHook';

export type ButtonProps = PropsWithChildren<
  {
    icon?: ReactNode;
    focusable?: boolean;
  } & BaseComponentProps &
    MouseEvents<HTMLButtonElement> &
    ButtonHTMLAttributes<HTMLButtonElement> &
    VariantAdaptable
>;

export const useButtonComponent = (props: ButtonProps) => {
  const { className: flexStackClass, itemName } = useFlexStackLayout({ inline: true }); // OK
  const { icon, disabled, variant, nativeProps, ...restProps } = props;

  const focusable = props.focusable ?? true;
  const elm = useStyleSet(StyleSets.PUSH, { variant, status: disabled ? 'disabled' : undefined });
  const classNames = useMemo(
    () =>
      clsx(
        StyleSets.BUTTON,
        elm.name,
        elm.variant,
        elm.manual,
        elm.manualEffect,
        flexStackClass,
        RootStyle.BASE,
        RootStyle.TEXT_BASE,
        { [FOCUSABLE_STYLE]: focusable },
        props.className
      ),
    [elm.manual, elm.manualEffect, elm.name, elm.variant, flexStackClass, focusable, props.className]
  );

  return {
    newProps: {
      disabled,
      ...restProps,
      className: classNames,
      ...nativeProps
    },
    iconProps: {
      children: icon,
      className: useMemo(() => clsx(`${StyleSets.BUTTON}__icon`, itemName), [itemName])
    },
    contentProps: {
      className: useMemo(() => clsx(`${StyleSets.BUTTON}__content`), [])
    }
  };
};

export const Button = forwardRef((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  const { newProps, iconProps, contentProps } = useButtonComponent(props);
  const { children } = props;

  return (
    <button {...newProps} ref={ref}>
      {iconProps.children != null && <span {...iconProps} />}
      {children != null && <span {...contentProps}>{children}</span>}
    </button>
  );
});
