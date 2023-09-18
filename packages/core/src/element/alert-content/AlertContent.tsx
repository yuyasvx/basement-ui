import { FC, PropsWithChildren, ReactNode, useMemo } from 'react';
import clsx from 'clsx';
import { BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';
import { RootStyle } from '../../domain/StyleClass';
import { MouseEvents } from '../../domain/EventProps';
import { getMouseEventHandler } from '../../util/Handler';

const NAME = 'bm-e-alert-content';
const DESCRIPTION_NAME = `${NAME}__description`;
const FOOTER_NAME = `${NAME}__footer`;
const SPACER_NAME = `${NAME}__spacer`;

export interface AlertContentDetailedProps {
  title?: ReactNode;
  footer?: ReactNode;
  centered?: boolean;
  footerPosition?: 'bottom' | 'right';
  footerItemDirection?: '';
}

export type AlertContentProps = AlertContentDetailedProps & BaseComponentProps & MouseEvents<HTMLDivElement>;

export const useAlertContentHook = (props: AlertContentProps) => {
  const centeredClassName = useMemo(() => {
    const n = props.centered ?? false;
    return n ? `-centered` : '';
  }, [props.centered]);

  const classNames = clsx(NAME, RootStyle.TEXT_BASE, centeredClassName, props.className);
  const me = getMouseEventHandler(props);
  const bp = getBaseComponentProps(props);

  return {
    mainProps: {
      className: classNames,
      ...bp,
      ...me
    },
    descriptionProps: {
      className: DESCRIPTION_NAME
    },
    spacerProps: {
      className: SPACER_NAME
    },
    footerProps: {
      className: FOOTER_NAME
    }
  };
};

export const AlertContent: FC<PropsWithChildren<AlertContentProps>> = props => {
  const { mainProps, descriptionProps, footerProps, spacerProps } = useAlertContentHook(props);
  return (
    <div {...mainProps}>
      {props.title && <h2>{props.title}</h2>}
      {props.children && <div {...descriptionProps}>{props.children}</div>}
      {props.footer && <div {...spacerProps}></div>}
      {props.footer && <div {...footerProps}>{props.footer}</div>}
    </div>
  );
};
