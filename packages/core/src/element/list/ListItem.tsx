import clsx from 'clsx';
import { ForwardedRef, PropsWithChildren, ReactNode, forwardRef, useMemo } from 'react';
import { BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';
import { MouseEvents } from '../../domain/EventProps';
import { FOCUSABLE_STYLE, RootStyle } from '../../domain/StyleClass';
import { StyleSetProps, StyleSets, useStyleSet } from '../../style-element/StyleSetHook';
import { getMouseEventHandler } from '../../util/Handler';
import { ListItemContent } from './ListItemContent';
import { ListItemEffect } from './ListItemEffect';

export interface ListItemDetailedProps {
  icon?: ReactNode;
  focusable?: boolean;
  hoverable?: boolean;
  disableEvents?: boolean;
  showIndicator?: boolean;
  indicator?: ReactNode;
  secondary?: ReactNode;
}

export type ListItemProps<EL extends HTMLElement = HTMLLIElement> = BaseComponentProps &
  ListItemDetailedProps &
  MouseEvents<EL> &
  Omit<StyleSetProps<typeof ListItemEffect>, 'variant'>;

export const ListItem = forwardRef((props: PropsWithChildren<ListItemProps>, ref: ForwardedRef<HTMLLIElement>) => {
  const { newProps, mouseEventProps, tabIndex, innerProps } = useListItemElement(props);
  return (
    <li {...newProps} {...mouseEventProps} tabIndex={tabIndex} ref={ref}>
      <div {...innerProps}>
        <ListItemContent
          showIndicator={props.showIndicator}
          indicator={props.indicator}
          icon={props.icon}
          secondary={props.secondary}
        >
          {props.children}
        </ListItemContent>
      </div>
    </li>
  );
});

export const useListItemElement = <EL extends HTMLElement>(props: ListItemProps<EL>) => {
  const mouseEvents = useMemo(() => (props.disableEvents ? {} : getMouseEventHandler(props)), [props]);
  const baseProps = getBaseComponentProps(props);
  const elm = useStyleSet(StyleSets.LIST_ITEM, {
    status: props.status
  });
  const classNames = useMemo(
    () =>
      clsx(
        StyleSets.LIST_ITEM,
        RootStyle.TEXT_BASE,
        RootStyle.BASE,
        elm.manual,
        elm.manualEffect,
        { '-with-indicator': props.showIndicator },
        { [FOCUSABLE_STYLE]: props.focusable }
      ),
    [elm.manual, elm.manualEffect, props.focusable, props.showIndicator]
  );
  if (!props.focusable) {
    baseProps.tabIndex = -1;
  }

  return {
    newProps: {
      id: baseProps.id,
      style: baseProps.style,
      className: classNames
    },
    innerProps: {
      className: `${StyleSets.LIST_ITEM}__inner`
    },
    mouseEventProps: mouseEvents,
    tabIndex: baseProps.tabIndex
  };
};
