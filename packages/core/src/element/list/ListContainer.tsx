import clsx from 'clsx';
import { ForwardedRef, PropsWithChildren, ReactNode, forwardRef, useMemo } from 'react';
import { BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';
import { MouseEvents } from '../../domain/EventProps';
import { RootStyle } from '../../domain/StyleClass';
import { getMouseEventHandler } from '../../util/Handler';

const NAME = 'bm-e-list-container';

export interface ListContainerDetailedProps {
  header?: ReactNode;
  footer?: ReactNode;
  stickyHeader?: boolean;
}

export type ListContainerProps = PropsWithChildren<
  ListContainerDetailedProps & BaseComponentProps & MouseEvents<HTMLDivElement>
>;

export const ListContainer = forwardRef((props: ListContainerProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { newProps } = useListContainerElement(props);

  return (
    <div {...newProps} ref={ref}>
      {props.header && <div className={`${NAME}__header`}>{props.header}</div>}
      {props.children}
      {props.footer && <div className={`${NAME}__footer`}>{props.footer}</div>}
    </div>
  );
});

export function useListContainerElement(props: ListContainerProps) {
  const p = getBaseComponentProps(props);
  const me = getMouseEventHandler(props);
  const classNames = useMemo(
    () => clsx(NAME, RootStyle.BASE, RootStyle.TEXT_BASE, { '-sticky': props.stickyHeader }, props.className),
    [props.className, props.stickyHeader]
  );

  return {
    name: NAME,
    newProps: {
      className: classNames,
      ...p,
      ...me
    }
  };
}
