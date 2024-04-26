import clsx from 'clsx';
import React, {
  CSSProperties,
  FC,
  forwardRef,
  PropsWithChildren,
  ReactNode,
  RefObject,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef
} from 'react';
import { BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';
import { AnimationTrigger } from '../../domain/AnimationTrigger';
import { CardStyle, useCardStyle } from '../../style-element/card/Card';
import { Case } from '../../util/Case';
import { useForceRefresh } from '../../util/ForceRefreshHook';
import { convertDurationToMillis } from '../../util/UnitConverter';

const NAME = 'bm-c-window';
const CONTROL_NAME = `${NAME}__control`;

const openEvent = new CustomEvent('bm-window-open');

export interface WindowDetailProps {
  show?: boolean;
  control?: ReactNode;
  showControl?: boolean;
  controlPosition?: Case<typeof WindowControlPosition>;
  controlStyle?: CSSProperties;
  absolutePosition?: boolean;
  onClose?: () => void;
  onOpen?: (event: Event) => void;
  animated?: Case<typeof AnimationTrigger>;
}

export const WindowControlPosition = {
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right'
} as const;

export type WindowProps = WindowDetailProps & BaseComponentProps & Partial<CardStyle>;

const WindowControlContainer: FC<
  PropsWithChildren<{ controlPosition: Case<typeof WindowControlPosition>; style?: CSSProperties }>
> = (props) => {
  const className = useMemo(
    () =>
      clsx(
        CONTROL_NAME,
        { '-right': props.controlPosition === 'top-right' },
        { '-left': props.controlPosition === 'top-left' }
      ),
    [props.controlPosition]
  );

  return <div className={className}>{props.children}</div>;
};

export const Window = forwardRef<HTMLDivElement, PropsWithChildren<WindowProps>>((props, ref) => {
  const baseProps = getBaseComponentProps(props);
  const show = props.show ?? true;
  const absolutePosition = props.absolutePosition ?? false;
  const animation = props.animated ?? AnimationTrigger.HIDE;
  const showAnimation = animation === AnimationTrigger.BOTH || animation === AnimationTrigger.SHOW;
  const hideAnimation = animation === AnimationTrigger.BOTH || animation === AnimationTrigger.HIDE;
  const { getShadowStyleClass, getBackgroundStyleClass, getBlurStyleClass, name: cardStyleName } = useCardStyle();
  const showControl = props.showControl ?? true;
  const controlPosition = props.controlPosition ?? 'top-right';
  const pending = useRef(true);
  const windowRef = useRef<HTMLDivElement>(null);
  const r = ref != null ? (ref as RefObject<HTMLDivElement>) : windowRef;
  const closingTimeout = useRef(null as NodeJS.Timeout | null);
  const forceRefresh = useForceRefresh();
  const className = useMemo(
    () =>
      clsx(
        NAME,
        cardStyleName,
        getShadowStyleClass(props.shadow),
        getBackgroundStyleClass(props.background),
        getBlurStyleClass(props.blur),
        props.className,
        { '-absolute': absolutePosition }
      ),
    [
      absolutePosition,
      cardStyleName,
      getBackgroundStyleClass,
      getBlurStyleClass,
      getShadowStyleClass,
      props.background,
      props.blur,
      props.className,
      props.shadow
    ]
  );

  if (!show && !pending.current && !hideAnimation) {
    pending.current = true;
    props.onClose && setTimeout(props.onClose, 0);
  }

  useLayoutEffect(() => {
    const currentRef = r.current;
    if (showAnimation && currentRef) {
      currentRef.classList.add('-opening');
    }
  });

  useEffect(() => {
    const currentRef = r.current;
    if (currentRef && props.onOpen) {
      currentRef.addEventListener('bm-window-open', props.onOpen);
    }

    let animationDurationMs = 0;
    if (currentRef && (showAnimation || hideAnimation)) {
      const cs = window.getComputedStyle(currentRef);
      const rawValue = cs.getPropertyValue('--bm-window-animation-duration');
      animationDurationMs = convertDurationToMillis(rawValue, 200);
    }

    if (pending.current && currentRef) {
      if (closingTimeout.current != null) {
        clearTimeout(closingTimeout.current);
        closingTimeout.current = null;
      }
      currentRef.classList.remove('-closing');
      pending.current = false;
      setTimeout(() => {
        currentRef.classList.remove('-opening');
        currentRef.dispatchEvent(openEvent);
      }, animationDurationMs);

      return () => {
        props.onOpen && currentRef?.removeEventListener('bm-window-open' as keyof HTMLElementEventMap, props.onOpen);
      };
    }

    if (!show && !pending.current && currentRef) {
      hideAnimation && currentRef.classList.add('-closing');

      closingTimeout.current = setTimeout(() => {
        pending.current = true;
        closingTimeout.current = null;
        forceRefresh();
        props.onClose && props.onClose();
      }, animationDurationMs);
    }

    return () => {
      props.onOpen && currentRef?.removeEventListener('bm-window-open' as keyof HTMLElementEventMap, props.onOpen);
    };
  }, [forceRefresh, hideAnimation, props, r, show, showAnimation]);

  return show || !pending.current ? (
    <div className={className} {...baseProps} ref={r} role={'dialog'}>
      {props.control && showControl && (
        <WindowControlContainer controlPosition={controlPosition} style={props.controlStyle}>
          {props.control}
        </WindowControlContainer>
      )}
      {props.children}
    </div>
  ) : null;
});
