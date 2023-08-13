import { FC, useCallback, useRef, useEffect, PropsWithChildren, useMemo } from 'react';
import clsx from 'clsx';
import { PUSHABLE_STYLE, RootStyle } from '../../domain/StyleClass';
import { MouseEvents } from '../../domain/EventProps';
import { getMouseEventHandler } from '../../util/Handler';
import { BaseComponentProps } from '../../base/BaseComponent';

const NAME = 'bm-c-segmented-switcher';
const INNER_NAME = `${NAME}__inner`;
const BUTTON_NAME = `${NAME}__button`;

export type SegmentedSwitcherProps = BaseComponentProps & MouseEvents<HTMLDivElement>;

export const SegmentedSwitcher: FC<PropsWithChildren<SegmentedSwitcherProps>> = props => {
  const className = clsx('bm-a-switchable', NAME, RootStyle.TEXT_BASE);
  const barRef = useRef<HTMLDivElement>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const initializedFlagRef = useRef(false);
  const playMotion = useCallback(() => {
    const barRefCurrent = barRef.current;
    const refCurrent = componentRef.current;
    if (barRefCurrent == null || refCurrent == null) {
      return;
    }
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

  return (
    <div className={className} ref={componentRef}>
      <div className={'bm-a-switchable__inner bm-c-segmented-switcher__inner'}>
        <div className={'bm-c-segmented-switcher__buttons'}>{props.children}</div>
        <div className={`bm-c-segmented-switcher__bar ${PUSHABLE_STYLE}`} ref={barRef}></div>
      </div>
    </div>
  );
};

const ITEM_NAME = 'bm-c-segmented-switcher__button';
export const SegmentedSwitcherItem: FC<
  PropsWithChildren<{ selected?: boolean } & MouseEvents<HTMLDivElement>>
> = props => {
  const appearanceClassName = useMemo(() => (props.selected ? '--normal' : '--super-flat'), [props.selected]);
  const selectedClassName = useMemo(() => (props.selected ? '-selected' : ''), [props.selected]);
  const className = clsx(PUSHABLE_STYLE, ITEM_NAME, appearanceClassName, selectedClassName);
  const mouse = getMouseEventHandler(props);

  return (
    <div className={className} {...mouse}>
      {props.children}
    </div>
  );
};
