import { useMemo } from 'react';
import clsx from 'clsx';
import { getMouseEventHandler } from '../util/Handler';
import { FOCUSABLE_STYLE, RootStyle } from '../domain/StyleClass';
import { ListItemProps } from '../element/list/ListItem';
import { getBaseComponentProps } from '../base/BaseComponent';

export const useListLogic = <EL extends HTMLElement>(props: ListItemProps<EL>) => {
  const mouseEvents = useMemo(() => (props.disabled ? {} : getMouseEventHandler(props)), [props]);
  const statusClassName = useMemo(() => (props.status != null ? `-${props.status}` : '-normal'), [props.status]);
  const baseProps = getBaseComponentProps(props);
  const classNames = useMemo(
    () =>
      clsx(
        'bm-e-list-item',
        RootStyle.TEXT_BASE,
        RootStyle.BASE,
        statusClassName,
        { '-disabled': props.disabled },
        { '-with-indicator': props.showIndicator },
        { [FOCUSABLE_STYLE]: props.focusable }
      ),
    [props.disabled, props.focusable, props.showIndicator, statusClassName]
  );
  if (!props.focusable) {
    baseProps.tabIndex = -1;
  }

  return {
    classNames,
    mouseEvents,
    baseProps,
    newProps: {
      ...baseProps,
      ...mouseEvents,
      className: classNames
    }
  };
};
