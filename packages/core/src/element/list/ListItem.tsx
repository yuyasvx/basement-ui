import clsx from 'clsx';
import { ForwardedRef, PropsWithChildren, ReactNode, forwardRef, useMemo } from 'react';
import { BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';
import { MouseEvents } from '../../domain/EventProps';
import { FOCUSABLE_STYLE, RootStyle } from '../../domain/StyleClass';
import { useStyleElement } from '../../style-element/StyleElementHook';
import { Case } from '../../util/Case';
import { getMouseEventHandler } from '../../util/Handler';
import { ListItemContent } from './ListItemContent';
import { ListItemEffect } from './ListItemEffect';

const NAME = 'bm-e-list-item';

export interface ListItemDetailedProps {
  icon?: ReactNode;
  effect?: Case<typeof ListItemEffect>;
  focusable?: boolean;
  hoverable?: boolean;
  disableEvents?: boolean;
  showIndicator?: boolean;
  indicator?: ReactNode;
  secondary?: ReactNode;
}

export type ListItemProps<EL extends HTMLElement = HTMLLIElement> = BaseComponentProps &
  ListItemDetailedProps &
  MouseEvents<EL>;

export const ListItem = forwardRef((props: PropsWithChildren<ListItemProps>, ref: ForwardedRef<HTMLLIElement>) => {
  const { newProps, mouseEventProps, tabIndex } = useListItemElement(props);
  return (
    <li {...newProps} {...mouseEventProps} tabIndex={tabIndex} ref={ref}>
      <div className={`${NAME}__inner`}>
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
  const elm = useStyleElement(NAME, {
    effect: props.effect
  });
  const classNames = useMemo(
    () =>
      clsx(
        NAME,
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
    name: NAME,
    newProps: {
      id: baseProps.id,
      style: baseProps.style,
      className: classNames
    },
    mouseEventProps: mouseEvents,
    tabIndex: baseProps.tabIndex
  };
};
