import {
  CSSProperties,
  FC,
  forwardRef,
  PropsWithChildren,
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useRef
} from 'react';
import clsx from 'clsx';
import { BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';
import { CardStyle, useCardStyle } from '../../hook/CardStyleHook';
import { CARD_STYLE } from '../../domain/StyleClass';
import { Case } from '../../util/Case';
import { useForceRefresh } from '../../util/ForceRefreshHook';
import { convertDurationToMillis } from '../../util/UnitConverter';

const NAME = 'bm-c-window';
const CONTROL_NAME = `${NAME}__control`;

const openEvent = new CustomEvent('bm-window-open');

export interface WindowDetailProps {
  show?: boolean;
  control?: ReactNode;
  showControl?: 'auto' | boolean;
  controlPosition?: Case<typeof WindowControlPosition>;
  controlStyle?: CSSProperties;
  absolutePosition?: boolean;
  onClose?: () => void;
  onOpen?: (event: Event) => void;
  animated?: Case<typeof WindowAnimation>;
}

export const WindowControlPosition = {
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right'
} as const;

export const WindowAnimation = {
  SHOW: 'show',
  HIDE: 'hide',
  BOTH: 'both',
  NONE: 'none'
} as const;

export type WindowProps = WindowDetailProps & BaseComponentProps & Partial<CardStyle>;

const WindowControlContainer: FC<
  PropsWithChildren<{ controlPosition: Case<typeof WindowControlPosition>; style?: CSSProperties }>
> = props => {
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
  const animation = props.animated ?? WindowAnimation.HIDE;
  const showAnimation = animation === WindowAnimation.BOTH || animation === WindowAnimation.SHOW;
  const hideAnimation = animation === WindowAnimation.BOTH || animation === WindowAnimation.HIDE;
  const { getShadowStyleClass, getBackgroundStyleClass, getBlurStyleClass } = useCardStyle();
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
        CARD_STYLE,
        getShadowStyleClass(props.shadow),
        getBackgroundStyleClass(props.background),
        getBlurStyleClass(props.blur),
        props.className,
        { '-absolute': absolutePosition }
      ),
    [
      absolutePosition,
      getBackgroundStyleClass,
      getBlurStyleClass,
      getShadowStyleClass,
      props.background,
      props.blur,
      props.className,
      props.shadow
    ]
  );
  // FIXME あまりにもワークアラウンド
  const openingFlag = showAnimation && pending.current ? ' -opening' : '';

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
    <div className={className + openingFlag} {...baseProps} ref={r} role={'dialog'}>
      {props.control && (
        <WindowControlContainer controlPosition={controlPosition} style={props.controlStyle}>
          {props.control}
        </WindowControlContainer>
      )}
      {props.children}
    </div>
  ) : null;
});
