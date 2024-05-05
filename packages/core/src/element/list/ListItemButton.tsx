import { ButtonHTMLAttributes, ForwardedRef, PropsWithChildren, forwardRef, memo } from 'react';
import { StyleSets } from '../../style-element/StyleSetHook';
import { ListItemProps, useListItemElement } from './ListItem';
import { ListItemContent } from './ListItemContent';

export type ListItemButtonProps = ListItemProps<HTMLButtonElement> & ButtonHTMLAttributes<HTMLButtonElement>;

export const ListItemButton = memo(
  forwardRef((props: PropsWithChildren<ListItemButtonProps>, ref: ForwardedRef<HTMLLIElement>) => {
    const { newProps, mouseEventProps, tabIndex } = useListItemElement(props);
    const { disabled, form, formAction, formEncType, formMethod, formNoValidate, formTarget, name, type, value } =
      props;
    const attribute = {
      disabled,
      form,
      formAction,
      formEncType,
      formMethod,
      formNoValidate,
      formTarget,
      name,
      type,
      value
    };

    return (
      <li {...newProps} ref={ref}>
        <button className={`${StyleSets.LIST_ITEM}__inner`} {...attribute} {...mouseEventProps} tabIndex={tabIndex}>
          <ListItemContent
            showIndicator={props.showIndicator}
            indicator={props.indicator}
            icon={props.icon}
            secondary={props.secondary}
          >
            {props.children}
          </ListItemContent>
        </button>
      </li>
    );
  })
);
