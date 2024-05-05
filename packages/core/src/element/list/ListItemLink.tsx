import { AnchorHTMLAttributes, ForwardedRef, forwardRef } from 'react';
import { StyleSets } from '../../style-element/StyleSetHook';
import { ListItemProps, useListItemElement } from './ListItem';
import { ListItemContent } from './ListItemContent';

export type ListItemLinkProps = ListItemProps<HTMLAnchorElement> & AnchorHTMLAttributes<unknown>;

export const ListItemLink = forwardRef((props: ListItemLinkProps, ref: ForwardedRef<HTMLLIElement>) => {
  const { newProps, anchorAttributes } = useListItemLinkElement(props);
  return (
    <li {...newProps} ref={ref}>
      <a {...anchorAttributes} className={`${StyleSets.LIST_ITEM}__inner`}>
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
  const { newProps } = useListItemElement(props);

  return {
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
