import { ButtonHTMLAttributes, ForwardedRef, PropsWithChildren, forwardRef, memo } from 'react';
import { BaseComponentProps } from '../../base/BaseComponent';
import { MouseEvents } from '../../domain/EventProps';
import { ListItemDetailedProps, useListItemElement } from './ListItem';
import { ListItemContent } from './ListItemContent';

export type ListItemButtonProps = BaseComponentProps &
  ListItemDetailedProps &
  MouseEvents<HTMLButtonElement> &
  ButtonHTMLAttributes<HTMLButtonElement>;

export const ListItemButton = memo(
  forwardRef((props: PropsWithChildren<ListItemButtonProps>, ref: ForwardedRef<HTMLLIElement>) => {
    const { newProps, name: componentName, mouseEventProps, tabIndex } = useListItemElement(props);
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
        <button className={`${componentName}__inner`} {...attribute} {...mouseEventProps} tabIndex={tabIndex}>
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
