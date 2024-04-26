import clsx from 'clsx';
import { ButtonHTMLAttributes, ForwardedRef, PropsWithChildren, ReactNode, forwardRef, useMemo } from 'react';
import { BaseComponentProps, VariantAdaptable } from '../../base/BaseComponent';
import { MouseEvents } from '../../domain/EventProps';
import { FOCUSABLE_STYLE, RootStyle } from '../../domain/StyleClass';
import { useFlexStackLayout } from '../../layout/flex-stack/FlexStack';
import { StyleElements, useStyleElement } from '../../style-element/StyleElementHook';

export type ButtonProps = PropsWithChildren<
  {
    icon?: ReactNode;
    focusable?: boolean;
  } & BaseComponentProps &
    MouseEvents<HTMLButtonElement> &
    ButtonHTMLAttributes<HTMLButtonElement> &
    VariantAdaptable
>;

const NAME = 'bm-c-button';
const INNER_ICON_NAME = `${NAME}__icon`;
const CONTENT_NAME = `${NAME}__content`;

export const useButtonComponent = (props: ButtonProps) => {
  const { className: flexStackClass, itemName } = useFlexStackLayout({ inline: true }); // OK
  const { icon: _, disabled, variant, nativeProps, ...restProps } = props;

  const focusable = props.focusable ?? true;
  const elm = useStyleElement(StyleElements.PUSH, { variant, effect: disabled ? 'disabled' : undefined });
  const classNames = useMemo(
    () =>
      clsx(
        NAME,
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
    name: NAME,
    newProps: {
      disabled,
      ...restProps,
      className: classNames,
      ...nativeProps
    },
    iconProps: {
      className: useMemo(() => clsx(INNER_ICON_NAME, itemName), [itemName])
    },
    contentProps: {
      className: useMemo(() => clsx(CONTENT_NAME), [])
    }
  };
};

export const Button = forwardRef((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  const { newProps, iconProps, contentProps } = useButtonComponent(props);
  const { icon, children } = props;

  return (
    <button {...newProps} ref={ref}>
      {icon != null && <span {...iconProps}>{icon}</span>}
      {children != null && <span {...contentProps}>{children}</span>}
    </button>
  );
});
