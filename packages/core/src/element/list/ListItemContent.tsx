import { FC, PropsWithChildren, ReactNode } from 'react';

interface ListItemContent2Props {
  icon?: ReactNode;
  showIndicator?: boolean;
  indicator?: ReactNode;
  secondary?: ReactNode;
}

const NAME = 'bm-e-list-item';

/**
 * ListItemContent.
 *
 * @internal
 * @param props Props
 * @constructor
 */
export const ListItemContent: FC<PropsWithChildren<ListItemContent2Props>> = (props) => {
  return (
    <>
      {props.showIndicator && <div className={`${NAME}__indicator`}>{props.indicator}</div>}
      {props.icon && <div className={`${NAME}__icon`}>{props.icon}</div>}
      <span className={`${NAME}__content`}>{props.children}</span>
      {props.secondary && <span className={`${NAME}__secondary`}>{props.secondary}</span>}
    </>
  );
};
