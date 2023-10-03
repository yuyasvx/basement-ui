import { ForwardedRef, forwardRef, PropsWithChildren, useMemo } from 'react';
import clsx from 'clsx';
import { BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';
import { KeyEvents, MouseEvents } from '../../domain/EventProps';
import { getKeyEventHandler, getMouseEventHandler } from '../../util/Handler';

export interface ListDetailedProps {
  // TODO 未対応
  appearance?: 'plain' | 'bordered' | 'table';
}

export type ListProps = ListDetailedProps &
  BaseComponentProps &
  MouseEvents<HTMLUListElement> &
  KeyEvents<HTMLUListElement>;

const NAME = 'bm-e-list';
export const List = forwardRef((props: PropsWithChildren<ListProps>, ref: ForwardedRef<HTMLUListElement>) => {
  const appearance = props.appearance ?? 'plain';
  const decideAppearanceClassName = useMemo(() => `--${appearance}`, [appearance]);
  const classNames = clsx(NAME, decideAppearanceClassName, props.className);
  const me = getMouseEventHandler(props);
  const ke = getKeyEventHandler(props);
  const p = getBaseComponentProps(props);

  return (
    <ul className={classNames} {...me} {...ke} {...p} ref={ref}>
      {props.children}
    </ul>
  );
});
