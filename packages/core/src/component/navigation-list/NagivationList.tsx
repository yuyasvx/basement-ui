import { FC, PropsWithChildren, useMemo } from 'react';
import clsx from 'clsx';
import { LIST_STYLE } from '../../domain/StyleClass';
import { BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';
import { MouseEvents } from '../../domain/EventProps';
import { getMouseEventHandler } from '../../util/Handler';

interface NavigationListDetailedProps {
  // appearance?: 'plain' | 'bordered' | 'table';
  hoge?: boolean;
}

export type NavigationListProps = NavigationListDetailedProps & BaseComponentProps & MouseEvents<HTMLUListElement>;

const NAME = 'bm-c-navigation-list';
export const NavigationList: FC<PropsWithChildren<NavigationListProps>> = props => {
  return <ul>{props.children}</ul>;
};
