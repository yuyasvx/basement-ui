import { FC, PropsWithChildren, ReactNode, useMemo } from 'react';
import clsx from 'clsx';
import { BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';
import { MouseEvents } from '../../domain/EventProps';
import { getMouseEventHandler } from '../../util/Handler';
import { RootStyle } from '../../domain/StyleClass';

interface ListContainerDetailedProps {
  header?: ReactNode;
  footer?: ReactNode;
  stickyHeader?: boolean;
}

const NAME = 'bm-a-list-container';
const HEADER_NAME = `${NAME}__header`;
const FOOTER_NAME = `${NAME}__footer`;

export type ListContainerProps = BaseComponentProps & ListContainerDetailedProps & MouseEvents<HTMLDivElement>;
export const ListContainer: FC<PropsWithChildren<ListContainerProps>> = props => {
  const p = getBaseComponentProps(props);
  const me = getMouseEventHandler(props);
  const classNames = useMemo(
    () => clsx(NAME, RootStyle.BASE, RootStyle.TEXT_BASE, { '-sticky': props.stickyHeader }, props.className),
    [props.className, props.stickyHeader]
  );

  return (
    <div className={classNames} {...p} {...me}>
      {props.header && <div className={HEADER_NAME}>{props.header}</div>}
      {props.children}
      {props.footer && <div className={FOOTER_NAME}>{props.footer}</div>}
    </div>
  );
};
