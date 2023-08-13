import { PropsWithChildren, useCallback, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { RootStyle, SWITCHABLE_STYLE } from '../domain/StyleClass';

const SELECTED_FLAG_CLASSNAME = '.-selected';

export const useSegmentedSwitcher = (props: PropsWithChildren, componentName: string) => {
  const className = clsx(SWITCHABLE_STYLE, componentName, RootStyle.TEXT_BASE);
  const barRef = useRef<HTMLDivElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const initializedFlagRef = useRef(false);

  const playMotion = useCallback(() => {
    const barRefCurrent = barRef.current;
    const refCurrent = componentRef.current;
    if (barRefCurrent == null || refCurrent == null) {
      return;
    }
    const selectedObject: HTMLElement | null = refCurrent.querySelector(SELECTED_FLAG_CLASSNAME);
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
      const selectedObject: HTMLElement | null = refCurrent.querySelector(SELECTED_FLAG_CLASSNAME);
      if (selectedObject == null) {
        return;
      }
      selectedObject.classList.replace('--super-flat', '--normal');
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
    const selectedObject = refCurrent.querySelector(SELECTED_FLAG_CLASSNAME);
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
    barRef,
    componentRef,
    props: {
      className,
      ref: componentRef
    }
  };
};
