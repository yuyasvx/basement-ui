import { ButtonHTMLAttributes, FC, PropsWithChildren, ReactNode, useMemo } from 'react';
import clsx from 'clsx';
import { AppearanceAdaptable, BaseComponentProps } from '../../base/BaseComponent';
import { MouseEvents } from '../../domain/EventProps';
import { getAppearanceClassName } from '../../domain/AppearanceType';
import { FOCUSABLE_STYLE, PUSHABLE_STYLE, RootStyle } from '../../domain/StyleClass';
import { useFlexStackLayout } from '../../layout/flex-stack/FlexStack';

interface ButtonDetailedProps {
  icon?: ReactNode;
  focusable?: boolean;
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
const CONTENT_NAME = `${NAME}__content`;

export const useButtonComponent = (props: ButtonProps) => {
  const { className: flexStackClass, itemName } = useFlexStackLayout({ inline: true });
  const { icon, appearance, nativeProps, ...restProps } = props;
  const disabledClassName = useMemo(() => (props.disabled ? '-disabled' : ''), [props.disabled]);
  const appearanceClassName = getAppearanceClassName(appearance);
  const focusable = props.focusable ?? true;
  const classNames = useMemo(
    () =>
      clsx(
        NAME,
        flexStackClass,
        RootStyle.BASE,
        RootStyle.TEXT_BASE,
        PUSHABLE_STYLE,
        { [FOCUSABLE_STYLE]: focusable },
        appearanceClassName,
        props.className,
        disabledClassName
      ),
    [appearanceClassName, disabledClassName, flexStackClass, focusable, props.className]
  );

  return {
    name: NAME,
    newProps: {
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

export const Button: FC<ButtonProps> = props => {
  const { newProps, iconProps, contentProps } = useButtonComponent(props);
  const { icon, children } = props;

  return (
    <button {...newProps}>
      {icon != null && <span {...iconProps}>{icon}</span>}
      {children != null && <span {...contentProps}>{children}</span>}
    </button>
  );
};
