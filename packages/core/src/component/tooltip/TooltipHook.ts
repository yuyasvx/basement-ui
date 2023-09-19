import { MouseEvent, MutableRefObject, RefObject, useCallback, useMemo, useRef } from 'react';

import clsx from 'clsx';
import { useCardStyle } from '../../hook/CardStyleHook';
import { Case } from '../../util/Case';
import { CARD_STYLE, RootStyle } from '../../domain/StyleClass';
import { useBasementUIContext } from '../../context/BasementUIContext';
import { getBaseComponentProps } from '../../base/BaseComponent';
import { TooltipProps, TooltipPosition } from './Tooltip';

function cursorBasedPosition(
  mouseEvent: MouseEvent<HTMLElement>,
  position: Case<typeof TooltipPosition>,
  tooltip: HTMLDivElement | null,
  offset: number
) {
  const maxSize = { width: window.innerWidth, height: window.innerHeight };
  const toolTipSize = { width: tooltip?.clientWidth ?? 0, height: tooltip?.clientHeight ?? 0 };
  const css: Record<string, string> = { left: `${mouseEvent.clientX}px`, top: `${mouseEvent.clientY}px` };
  let judgedPosition = position;

  if (judgedPosition === TooltipPosition.AUTO) {
    judgedPosition = TooltipPosition.SOUTHEAST;

    const overflowX = mouseEvent.clientX + toolTipSize.width + offset > maxSize.width;
    const overflowY = mouseEvent.clientY + toolTipSize.height + offset > maxSize.height;

    if (overflowX) {
      judgedPosition = TooltipPosition.SOUTHWEST;
    }
    if (overflowY) {
      judgedPosition = TooltipPosition.NORTHEAST;
    }
    if (overflowX && overflowY) {
      judgedPosition = TooltipPosition.NORTHWEST;
    }
  }

  let transform = '';
  if (
    judgedPosition === TooltipPosition.SOUTH ||
    judgedPosition === TooltipPosition.SOUTHEAST ||
    judgedPosition === TooltipPosition.SOUTHWEST
  ) {
    transform += ` translateY(${offset}px)`;
  }

  if (
    judgedPosition === TooltipPosition.NORTH ||
    judgedPosition === TooltipPosition.NORTHEAST ||
    judgedPosition === TooltipPosition.NORTHWEST
  ) {
    transform += ` translateY(calc(-100% - ${offset}px))`;
  }

  if (judgedPosition === TooltipPosition.EAST || judgedPosition === TooltipPosition.WEST) {
    transform += ` translateY(-50%)`;
  }

  if (judgedPosition === TooltipPosition.NORTH || judgedPosition === TooltipPosition.SOUTH) {
    transform += ` translateX(-50%)`;
  }

  if (
    judgedPosition === TooltipPosition.NORTHEAST ||
    judgedPosition === TooltipPosition.SOUTHEAST ||
    judgedPosition === TooltipPosition.EAST
  ) {
    transform += ` translateX(${offset}px)`;
  }

  if (
    judgedPosition === TooltipPosition.NORTHWEST ||
    judgedPosition === TooltipPosition.SOUTHWEST ||
    judgedPosition === TooltipPosition.WEST
  ) {
    transform += ` translateX(calc(-100% - ${offset}px))`;
  }

  css.transform = transform.trimStart();
  return css;
}

export function determinePosition(
  position: Case<typeof TooltipPosition>,
  tooltip: RefObject<HTMLDivElement | null>,
  // target: RefObject<HTMLElement | null>,
  mouseEvent: RefObject<MouseEvent<HTMLElement> | null>,
  offset: number
) {
  const m = mouseEvent.current;
  // if (origin === TooltipOrigin.CURSOR) {
  //
  // }
  if (m == null) {
    return { left: `0px`, top: `0px` };
  }
  return cursorBasedPosition(m, position, tooltip.current, offset);
  // return staticPosition(target.current, tooltip.current, position);
}

export function useTooltip(componentName: string, props: TooltipProps) {
  const { getShadowStyleClass, getBlurStyleClass, getBackgroundStyleClass } = useCardStyle();
  const enableCardStyle = props.enableCardStyle ?? true;
  const className = useMemo(
    () =>
      clsx([
        componentName,
        { [CARD_STYLE]: enableCardStyle },
        RootStyle.TEXT_BASE,
        { [RootStyle.CONTENT_BASE]: enableCardStyle },
        { [getBackgroundStyleClass(3)]: enableCardStyle },
        { [getShadowStyleClass(1)]: enableCardStyle },
        { [getBlurStyleClass(1)]: enableCardStyle },
        props.tooltipClassName
      ]),
    [
      componentName,
      enableCardStyle,
      getBackgroundStyleClass,
      getBlurStyleClass,
      getShadowStyleClass,
      props.tooltipClassName
    ]
  );
  const displayAs = props.displayAs ?? 'inline-block';
  const targetClassName = useMemo(
    () => clsx(`${componentName}-source`, { '-inline': displayAs === 'inline-block' }, props.className),
    [componentName, displayAs, props.className]
  );
  const showDelay = props.showDelay ?? 500;
  const hideDelay = props.hideDelay ?? 500;
  const { tooltip } = useBasementUIContext();
  const mouseOverTimerRef: MutableRefObject<NodeJS.Timeout | undefined> = useRef();
  const mouseLeaveTimerRefs: MutableRefObject<NodeJS.Timeout[]> = useRef([]);
  const targetRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const eventRef = useRef(null as MouseEvent<HTMLElement> | null);
  const tooltipId = useRef(null as null | number);
  // const origin = props.origin ?? TooltipOrigin.CURSOR;

  const mouseOverHandler = useCallback(
    (evt: MouseEvent<HTMLElement>) => {
      eventRef.current = evt;
      if (mouseLeaveTimerRefs.current.length > 0) {
        mouseLeaveTimerRefs.current.forEach(t => {
          clearTimeout(t);
        });
      }

      mouseOverTimerRef.current = setTimeout(() => {
        tooltipId.current = tooltip.add({
          className,
          position: props.position ?? TooltipPosition.AUTO,
          targetRef,
          content: props.content,
          mouseEventRef: eventRef,
          ref: tooltipRef,
          offset: props.offset ?? 8,
          style: props.tooltipStyle
        });
      }, showDelay);
    },
    [className, props.content, props.offset, props.position, props.tooltipStyle, showDelay, tooltip]
  );

  const mouseMoveHandler = useCallback((evt: MouseEvent<HTMLElement>) => {
    eventRef.current = evt;
  }, []);

  const hide = useCallback(() => {
    if (tooltipId.current == null) {
      return;
    }
    tooltip.remove(tooltipId.current);
    tooltipId.current = null;
  }, [tooltip]);

  const mouseLeaveHandler = useCallback(() => {
    if (mouseOverTimerRef.current) {
      clearTimeout(mouseOverTimerRef.current);
    }

    mouseLeaveTimerRefs.current[0] = setTimeout(() => {
      hide();
    }, hideDelay + 1000);

    mouseLeaveTimerRefs.current[1] = setTimeout(() => {
      tooltipRef.current?.classList.add('-closing');
    }, hideDelay);
  }, [hide, hideDelay]);

  return {
    props: {
      ref: targetRef,
      className: targetClassName,
      onMouseOver: mouseOverHandler,
      onMouseMove: mouseMoveHandler,
      onMouseLeave: mouseLeaveHandler,
      ...getBaseComponentProps(props)
    }
  };
}
