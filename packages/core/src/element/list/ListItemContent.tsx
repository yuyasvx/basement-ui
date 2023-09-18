import { FC, PropsWithChildren, ReactNode } from 'react';

interface ListItemContentDetailedProps {
  icon?: ReactNode;
  showIndicator?: boolean;
  indicator?: ReactNode;
  secondary?: ReactNode;
}

export type ListItemContentProps = ListItemContentDetailedProps;

const NAME = 'bm-e-list-item';
export const ListItemContent: FC<PropsWithChildren<ListItemContentProps>> = props => {
  return (
    <>
      {props.showIndicator && <div className={`${NAME}__indicator`}>{props.indicator}</div>}
      {props.icon && <div className={`${NAME}__icon`}>{props.icon}</div>}
      <span className={`${NAME}__content`}>{props.children}</span>
      {props.secondary && <span className={`${NAME}__secondary`}>{props.secondary}</span>}
    </>
  );
};
