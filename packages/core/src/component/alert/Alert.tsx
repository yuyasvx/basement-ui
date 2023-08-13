import { FC, PropsWithChildren, ReactNode, useMemo } from 'react';
import clsx from 'clsx';
import { RootStyle } from '../../domain/StyleClass';
import { BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';
import { Case } from '../../util/Case';
import { MouseEvents } from '../../domain/EventProps';
import { getMouseEventHandler } from '../../util/Handler';
import { AlertContent, AlertContentDetailedProps } from './AlertContent';

const NAME = 'bm-c-alert';
const INNER_NAME = `${NAME}__inner`;
const ICON_NAME = `${NAME}__icon`;
const DETAIL_NAME = `${NAME}__detail`;

export const AlertContentLayout = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical'
} as const;

interface AlertDetailedProps {
  layout?: Case<typeof AlertContentLayout>;
  centered?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  // footerType?: 'default' | 'hide' | 'custom';
}

export type AlertProps = PropsWithChildren<
  AlertDetailedProps & AlertContentDetailedProps & BaseComponentProps & MouseEvents<HTMLDivElement>
>;

export const useAlertHook = (props: AlertProps) => {
  const layoutClassName = useMemo(() => {
    const l = props.layout ?? AlertContentLayout.HORIZONTAL;
    return `-${l}`;
  }, [props.layout]);
  const centeredClassName = useMemo(() => {
    const n = props.centered ?? false;
    return n ? `-centered` : '';
  }, [props.centered]);
  const iconPositionClassName = useMemo(() => {
    const l = props.iconPosition ?? 'left';
    return `-icon-${l}`;
  }, [props.iconPosition]);
  const alertContentClassName = useMemo(
    () => (props.layout === AlertContentLayout.VERTICAL && props.centered ? '-centered' : ''),
    [props.centered, props.layout]
  );

  const bp = getBaseComponentProps(props);
  const me = getMouseEventHandler(props);

  const classNames = clsx(
    NAME,
    RootStyle.BASE,
    RootStyle.CONTENT_BASE,
    props.className,
    layoutClassName,
    centeredClassName,
    iconPositionClassName
  );

  return {
    mainProps: {
      className: classNames,
      ...bp,
      ...me
    },
    innerProps: {
      className: INNER_NAME
    },
    iconProps: {
      className: ICON_NAME
    },
    contentProps: {
      title: props.title,
      footer: props.footer,
      className: useMemo(() => clsx(DETAIL_NAME, alertContentClassName), [alertContentClassName])
    }
  };
};
export const Alert: FC<AlertProps> = props => {
  const { mainProps, innerProps, contentProps, iconProps } = useAlertHook(props);

  return (
    <div {...mainProps}>
      <div {...innerProps}>
        {props.icon && <div {...iconProps}>{props.icon}</div>}
        <AlertContent {...contentProps}>{props.children}</AlertContent>
      </div>
    </div>
  );
};
