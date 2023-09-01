import clsx from 'clsx';
import { createContext, FC, PropsWithChildren, useCallback, useEffect, useMemo, useRef } from 'react';
import { PUSHABLE_STYLE, RootStyle } from '../../domain/StyleClass';
import { getMouseEventHandler } from '../../util/Handler';
import { BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';
import { MouseEvents } from '../../domain/EventProps';

const NAME = 'bm-c-segmented-switcher';
const INNER_NAME = `${NAME}__inner`;
const BUTTON_NAME = `${NAME}__buttons`;
const BAR_NAME = `${NAME}__bar`;

export type SegmentedSwitcherProps = BaseComponentProps & MouseEvents<HTMLDivElement> & { disabled?: boolean };

const context = createContext({
  disabled: false
});

export const useSegmentedSwitcherContext = () => {
  return context;
};

export const useSegmentedSwitcherHook = (props: PropsWithChildren<SegmentedSwitcherProps>) => {
  const className = useMemo(
    () => clsx('bm-a-switchable', NAME, RootStyle.TEXT_BASE, props.className, { '-disabled': props.disabled }),
    [props.className, props.disabled]
  );
  const barRef = useRef<HTMLDivElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const initializedFlagRef = useRef(false);

  const playMotion = useCallback(() => {
    const barRefCurrent = barRef.current;
    const refCurrent = componentRef.current;
    if (barRefCurrent == null || refCurrent == null) {
      return;
    }
    refCurrent.classList.add('-pending');
    const selectedObject: HTMLElement | null = refCurrent.querySelector('.-selected');
    if (selectedObject == null) {
      return;
    }
    selectedObject.classList.replace('--normal', '--super-flat');

    barRefCurrent.style.width = `${selectedObject.clientWidth}px`;
    barRefCurrent.style.height = `${selectedObject.clientHeight}px`;
    barRefCurrent.style.transform = `translateX(${selectedObject.offsetLeft}px)`;
    barRefCurrent.style.visibility = 'visible';
    setTimeout(() => {
      barRefCurrent.style.visibility = 'hidden';
      const selectedObject: HTMLElement | null = refCurrent.querySelector('.-selected');
      if (selectedObject == null) {
        return;
      }
      selectedObject.classList.replace('--super-flat', '--normal');
      refCurrent.classList.remove('-pending');
    }, 200);
  }, []);

  useEffect(() => {
    if (!initializedFlagRef.current) {
      initializedFlagRef.current = true;
      return;
    }
    playMotion();
  }, [playMotion, props.children]);

  useEffect(() => {
    const barRefCurrent = barRef.current;
    const refCurrent = componentRef.current;
    if (barRefCurrent == null || refCurrent == null) {
      return;
    }
    const selectedObject = refCurrent.querySelector('.-selected');
    if (selectedObject == null) {
      barRefCurrent.style.width = '0px';
      barRefCurrent.style.height = '0px';
      return;
    }

    const standbyW = selectedObject.clientWidth;
    const standbyH = selectedObject.clientHeight;
    barRefCurrent.style.width = `${standbyW}px`;
    barRefCurrent.style.height = `${standbyH}px`;
  }, []);

  return {
    newProps: {
      className,
      ref: componentRef,
      ...getMouseEventHandler(props),
      ...getBaseComponentProps(props)
    },
    innerProps: {
      className: useMemo(() => clsx('bm-a-switchable__inner', INNER_NAME), [])
    },
    buttonContainerProps: {
      className: useMemo(() => clsx(BUTTON_NAME), [])
    },
    barProps: {
      className: useMemo(() => clsx(BAR_NAME, PUSHABLE_STYLE), []),
      ref: barRef
    },
    context
  };
};

export const SegmentedSwitcher: FC<PropsWithChildren<SegmentedSwitcherProps>> = props => {
  const { context, newProps, innerProps, buttonContainerProps, barProps } = useSegmentedSwitcherHook(props);
  // -------

  return (
    <context.Provider value={{ disabled: props.disabled ?? false }}>
      <div {...newProps}>
        <div {...innerProps}>
          <div {...buttonContainerProps}>{props.children}</div>
          <div {...barProps}></div>
        </div>
      </div>
    </context.Provider>
  );
};
