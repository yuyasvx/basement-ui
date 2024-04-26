import clsx from 'clsx';
import { ForwardedRef, PropsWithChildren, RefObject, forwardRef, useLayoutEffect, useMemo, useRef } from 'react';
import { BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';
import { AnimationTrigger } from '../../domain/AnimationTrigger';
import { MouseEvents } from '../../domain/EventProps';
import { Case } from '../../util/Case';
import { getMouseEventHandler } from '../../util/Handler';
import { menuListContext, useMenuListContextInitializer } from './MenuListContext';

const NAME = 'bm-c-menu-list';

export type MenuListContainerProps = PropsWithChildren<{
  initialSelectedItem?: string;
  autoLock?: boolean;
  onSelect?: (name?: string) => void;
  relativePosition?: boolean;
  // TODO mijissou
  disableSubmenu?: boolean;
  animated?: Case<typeof AnimationTrigger>;
}> &
  BaseComponentProps &
  MouseEvents<HTMLDivElement>;

export const MenuListContainer = forwardRef<HTMLDivElement, MenuListContainerProps>((props, ref) => {
  const { initialContext, ref: r, newProps } = useMenuListContainer(props, ref);

  return (
    <menuListContext.Provider value={initialContext}>
      <div ref={r} {...newProps}>
        {props.children}
      </div>
    </menuListContext.Provider>
  );
});

export function useMenuListContainer(props: MenuListContainerProps, ref: ForwardedRef<HTMLDivElement>) {
  const menuListRef = useRef<HTMLDivElement>(null);
  const r = (ref ?? menuListRef) as RefObject<HTMLDivElement>;
  const animationTrigger = props.animated ?? AnimationTrigger.HIDE;
  const animationTimeout = useRef(null as NodeJS.Timeout | null);
  const baseProps = getBaseComponentProps(props);
  const mouseEvents = getMouseEventHandler(props);

  useLayoutEffect(() => {
    if (animationTimeout.current != null) {
      clearTimeout(animationTimeout.current);
    }

    const currentRef = r.current;
    if (currentRef == null) {
      return;
    }
    currentRef.classList.remove('-opening');

    if (animationTrigger === AnimationTrigger.BOTH || animationTrigger === AnimationTrigger.SHOW) {
      currentRef.classList.add('-opening');
      animationTimeout.current = setTimeout(() => {
        currentRef.classList.remove('-opening');
      }, 500);
    }
  }, [animationTrigger, r]);

  return {
    componentName: NAME,
    ref: r,
    initialContext: useMenuListContextInitializer(r, props.autoLock, props.onSelect),
    newProps: {
      ...baseProps,
      className: useMemo(() => clsx(NAME, props.className), [props.className]),
      ...mouseEvents
    }
  };
}
