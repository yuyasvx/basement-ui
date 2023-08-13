import { FC, PropsWithChildren, ReactNode } from 'react';
import { LIST_ITEM_STYLE } from '../../domain/StyleClass';

interface ListItemContentDetailedProps {
  icon?: ReactNode;
  showIndicator?: boolean;
  indicator?: ReactNode;
  secondary?: ReactNode;
}

export type ListItemContentProps = ListItemContentDetailedProps;

export const ListItemContent: FC<PropsWithChildren<ListItemContentProps>> = props => {
  return (
    <>
      {props.showIndicator && <div className={`${LIST_ITEM_STYLE}__indicator`}>{props.indicator}</div>}
      {props.icon && <div className={`${LIST_ITEM_STYLE}__icon`}>{props.icon}</div>}
      <span className={`${LIST_ITEM_STYLE}__content`}>{props.children}</span>
      {props.secondary && <span className={`${LIST_ITEM_STYLE}__secondary`}>{props.secondary}</span>}
    </>
  );
};
