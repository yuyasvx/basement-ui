import { FC, PropsWithChildren, useMemo } from 'react';
import clsx from 'clsx';
import { BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';
import { MouseEvents } from '../../domain/EventProps';
import { LIST_STYLE } from '../../domain/StyleClass';
import { getMouseEventHandler } from '../../util/Handler';

interface ListDetailedProps {
  // TODO 未対応
  appearance?: 'plain' | 'bordered' | 'table';
}

export type ListProps = ListDetailedProps & BaseComponentProps & MouseEvents<HTMLUListElement>;

// const NAME = 'bm-c-navigation-list';
export const List: FC<PropsWithChildren<ListProps>> = props => {
  const appearance = props.appearance ?? 'plain';
  const decideAppearanceClassName = useMemo(() => `--${appearance}`, [appearance]);
  const classNames = clsx(LIST_STYLE, decideAppearanceClassName, props.className);
  const me = getMouseEventHandler(props);
  const p = getBaseComponentProps(props);

  return (
    <ul className={classNames} {...me} {...p}>
      {props.children}
    </ul>
  );
};
