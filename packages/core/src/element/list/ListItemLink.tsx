import { AnchorHTMLAttributes, ForwardedRef, PropsWithChildren, forwardRef } from 'react';
import { BaseComponentProps } from '../../base/BaseComponent';
import { MouseEvents } from '../../domain/EventProps';
import { ListItemDetailedProps, useListItemElement } from './ListItem';
import { ListItemContent } from './ListItemContent';

export type ListItemLinkProps = PropsWithChildren<
  BaseComponentProps & ListItemDetailedProps & MouseEvents<HTMLLIElement> & AnchorHTMLAttributes<unknown>
>;

export const ListItemLink = forwardRef((props: ListItemLinkProps, ref: ForwardedRef<HTMLLIElement>) => {
  const { name, newProps, anchorAttributes } = useListItemLinkElement(props);
  return (
    <li {...newProps} ref={ref}>
      <a {...anchorAttributes} className={`${name}__inner`}>
        <ListItemContent
          showIndicator={props.showIndicator}
          indicator={props.indicator}
          icon={props.icon}
          secondary={props.secondary}
        >
          {props.children}
        </ListItemContent>
      </a>
    </li>
  );
});

export function useListItemLinkElement(props: ListItemLinkProps) {
  const { newProps, name } = useListItemElement(props);

  return {
    name,
    newProps: {
      ...newProps
    },
    anchorAttributes: {
      download: props.download,
      href: props.href,
      hrefLang: props.hrefLang,
      media: props.media,
      ping: props.ping,
      target: props.target,
      type: props.type,
      referrerPolicy: props.referrerPolicy
    }
  };
}
