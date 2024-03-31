import clsx from 'clsx';
import { FC, KeyboardEvent, PropsWithChildren, createContext, useCallback, useEffect, useMemo, useRef } from 'react';
import { AppearanceAdaptable, BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';
import { AppearanceType, getAppearanceClassName } from '../../domain/AppearanceType';
import { MouseEvents } from '../../domain/EventProps';
import { FOCUSABLE_STYLE, PUSHABLE_STYLE, RootStyle } from '../../domain/StyleClass';
import { getMouseEventHandler } from '../../util/Handler';

const NAME = 'bm-c-segmented-switcher';
const INNER_NAME = `${NAME}__inner`;
const BUTTON_NAME = `${NAME}__buttons`;
const BAR_NAME = `${NAME}__bar`;

interface SegmentedSwitcherDetailedProps {
  animated?: boolean;
}
export type SegmentedSwitcherProps = SegmentedSwitcherDetailedProps &
  AppearanceAdaptable &
  BaseComponentProps &
  MouseEvents<HTMLDivElement> & { disabled?: boolean };

const context = createContext({
  disabled: false
});

export const useSegmentedSwitcherContext = () => {
  return context;
};

export const useSegmentedSwitcherHook = (props: PropsWithChildren<SegmentedSwitcherProps>) => {
  const className = useMemo(
    () =>
      clsx('bm-e-switchable', getAppearanceClassName(props.appearance), NAME, RootStyle.TEXT_BASE, props.className, {
        '-disabled': props.disabled,
        [FOCUSABLE_STYLE]: props.tabIndex != null && props.tabIndex !== -1
      }),
    [props.appearance, props.className, props.disabled, props.tabIndex]
  );
  const barRef = useRef<HTMLDivElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const initializedFlagRef = useRef(false);
  const animated = props.animated ?? true;

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

  const initialize = useCallback(() => {
    const barRefCurrent = barRef.current;
    const refCurrent = componentRef.current;
    if (barRefCurrent == null || refCurrent == null) {
      return;
    }
    const selectedObject: HTMLElement | null = refCurrent.querySelector('.-selected');
    if (selectedObject == null) {
      barRefCurrent.style.width = '0px';
      barRefCurrent.style.height = '0px';
      return;
    }

    const standbyW = selectedObject.clientWidth;
    const standbyH = selectedObject.clientHeight;
    barRefCurrent.style.transform = `translateX(${selectedObject.offsetLeft}px)`;
    barRefCurrent.style.width = `${standbyW}px`;
    barRefCurrent.style.height = `${standbyH}px`;
  }, []);

  useEffect(() => {
    if (!initializedFlagRef.current || !animated) {
      initialize();
      initializedFlagRef.current = true;
      return;
    }
    if (animated) {
      playMotion();
    }
  }, [animated, initialize, playMotion, props.children]);

  // NormalとFlatのみをサポート
  const barAppearance = useMemo(() => (props.appearance === AppearanceType.FLAT ? '--flat' : ''), [props.appearance]);

  const keyNavigation = useCallback((evt: KeyboardEvent<HTMLDivElement>) => {
    const refCurrent = componentRef.current;
    if (refCurrent != null && (evt.key === 'ArrowRight' || evt.key === 'ArrowLeft')) {
      evt.preventDefault();
      const children: NodeListOf<HTMLElement> = refCurrent.querySelectorAll('.bm-c-segmented-switcher__item');
      let index = -1;
      children.forEach((e, num) => {
        if (e.classList.contains('-selected')) {
          index = num;
        }
      });

      if (index < 0) {
        children.item(0).click();
        return;
      }

      if (evt.key === 'ArrowRight' && index + 1 <= children.length - 1) {
        children.item(index + 1).click();
      }

      if (evt.key === 'ArrowLeft' && index - 1 >= 0) {
        children.item(index - 1).click();
      }
    }
  }, []);

  return {
    newProps: {
      className,
      ref: componentRef,
      ...getMouseEventHandler(props),
      ...getBaseComponentProps(props),
      onKeyDown: keyNavigation,
      role: 'radiogroup',
      'aria-disabled': props.disabled ?? false
    },
    innerProps: {
      className: useMemo(() => clsx('bm-e-switchable__inner', INNER_NAME), [])
    },
    buttonContainerProps: {
      className: useMemo(() => clsx(BUTTON_NAME), [])
    },
    barProps: {
      className: useMemo(() => clsx(BAR_NAME, PUSHABLE_STYLE, barAppearance), [barAppearance]),
      ref: barRef
    },
    context
  };
};

export const SegmentedSwitcher: FC<PropsWithChildren<SegmentedSwitcherProps>> = (props) => {
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
