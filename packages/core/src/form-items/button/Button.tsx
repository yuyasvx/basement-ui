import { ButtonHTMLAttributes, FC, PropsWithChildren, ReactNode, useMemo } from 'react';
import clsx from 'clsx';
import { AppearanceAdaptable, BaseComponentProps } from '../../base/BaseComponent';
import { MouseEvents } from '../../domain/EventProps';
import { getAppearanceClassName } from '../../domain/AppearanceType';
import { FOCUSABLE_STYLE, PUSHABLE_STYLE, RootStyle } from '../../domain/StyleClass';

interface ButtonDetailedProps {
  icon?: ReactNode;
}

export type ButtonProps = PropsWithChildren<
  ButtonDetailedProps &
    BaseComponentProps &
    MouseEvents<HTMLButtonElement> &
    ButtonHTMLAttributes<HTMLButtonElement> &
    // ComponentProps<"button"> &
    AppearanceAdaptable
>;

const NAME = 'bm-c-button';
const INNER_ICON_NAME = `${NAME}__icon`;

export const useButtonHook = (props: ButtonProps) => {
  const { icon, ...restProps } = props;

  const disabledClassName = useMemo(() => (props.disabled ? '-disabled' : ''), [props.disabled]);
  const appearanceClassName = getAppearanceClassName(props.appearance);
  const classNames = useMemo(
    () =>
      clsx(
        NAME,
        RootStyle.BASE,
        RootStyle.TEXT_BASE,
        PUSHABLE_STYLE,
        FOCUSABLE_STYLE,
        appearanceClassName,
        props.className,
        disabledClassName
      ),
    [appearanceClassName, disabledClassName, props.className]
  );

  return {
    classNames,
    newProps: {
      ...restProps,
      className: classNames
    },
    innerProps: {
      className: INNER_ICON_NAME
    }
  };
};

export const Button: FC<ButtonProps> = props => {
  const { newProps, innerProps } = useButtonHook(props);
  const { icon, children } = props;

  return (
    <button {...newProps}>
      {icon != null && <span {...innerProps}>{icon}</span>}
      {children != null && <span>{children}</span>}
    </button>
  );
};
