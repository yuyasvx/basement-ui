import { FC, PropsWithChildren } from 'react';
import { BaseComponentProps } from '../../base/BaseComponent';
import { MouseEvents } from '../../domain/EventProps';

interface NavigationListDetailedProps {
  // appearance?: 'plain' | 'bordered' | 'table';
  hoge?: boolean;
}

export type NavigationListProps = NavigationListDetailedProps & BaseComponentProps & MouseEvents<HTMLUListElement>;

const NAME = 'bm-c-navigation-list';
export const NavigationList: FC<PropsWithChildren<NavigationListProps>> = props => {
  return <ul>{props.children}</ul>;
};
