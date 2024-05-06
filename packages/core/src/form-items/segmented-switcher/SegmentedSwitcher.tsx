import clsx from 'clsx';
import { FC, KeyboardEvent, PropsWithChildren, createContext, useCallback, useEffect, useMemo, useRef } from 'react';
import { BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';
import { MouseEvents } from '../../domain/EventProps';
import { FOCUSABLE_STYLE, PUSHABLE_STYLE, RootStyle } from '../../domain/StyleClass';
import { StyleSets, useStyleSet } from '../../style-element/StyleSetHook';
import { VariantAdaptable } from '../../style-element/VariantAdaptable';
import { VariantType } from '../../style-element/VariantType';
import { getMouseEventHandler } from '../../util/Handler';

const NAME = 'bm-c-segmented-switcher';
const INNER_NAME = `${NAME}__inner`;
const BUTTON_NAME = `${NAME}__buttons`;
const BAR_NAME = `${NAME}__bar`;

interface SegmentedSwitcherDetailedProps {
  animated?: boolean;
}
export type SegmentedSwitcherProps = SegmentedSwitcherDetailedProps &
  VariantAdaptable &
  BaseComponentProps &
  MouseEvents<HTMLDivElement> & { disabled?: boolean };

const context = createContext({
  disabled: false
});

export const useSegmentedSwitcherContext = () => {
  return context;
};

export const useSegmentedSwitcherHook = (props: PropsWithChildren<SegmentedSwitcherProps>) => {
  const { name: styleName, classNames: styleClassName } = useStyleSet(StyleSets.SWITCH_ELEMENT, {
    variant: props.variant,
    status: props.disabled ? 'disabled' : undefined
  });
  const className = useMemo(
    () =>
      clsx(styleName, ...styleClassName, NAME, RootStyle.TEXT_BASE, props.className, {
        [FOCUSABLE_STYLE]: props.tabIndex != null && props.tabIndex !== -1
      }),
    [props.className, props.tabIndex, styleClassName, styleName]
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
  const barVariant = useMemo(() => (props.variant === VariantType.FLAT ? '--flat' : ''), [props.variant]);

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
      className: useMemo(() => clsx(BAR_NAME, PUSHABLE_STYLE, barVariant), [barVariant]),
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
