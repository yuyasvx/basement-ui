import {
  CSSProperties,
  FC,
  forwardRef,
  Fragment,
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

const NAME = 'bm-c-window';
const CONTROL_NAME = `${NAME}__control`;

// const closeEvent = new CustomEvent('bm-window-closed');

export interface WindowDetailProps {
  show?: boolean;
  control?: ReactNode;
  showControl?: 'auto' | boolean;
  controlPosition?: 'top-left' | 'top-right';
  controlStyle?: CSSProperties;
  disablePositionStyle?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  animated?: Case<typeof WindowAnimation>;
}

export const WindowAnimation = {
  SHOW: 'show',
  HIDE: 'hide',
  BOTH: 'both',
  NONE: 'none'
} as const;

export type WindowProps = WindowDetailProps & BaseComponentProps & Partial<CardStyle>;

const WindowControlContainer: FC<PropsWithChildren<{ controlPosition: string; style?: CSSProperties }>> = props => {
  // TODO スタイル強制ねじ込みを辞める
  const newStyle = props.style ? { ...props.style } : {};
  newStyle.position = 'absolute';
  if (props.controlPosition === 'top-right' && newStyle.right == null) {
    newStyle.right = '0';
  }

  return (
    <div className={CONTROL_NAME} style={newStyle}>
      {props.children}
    </div>
  );
};

export const Window = forwardRef<HTMLDivElement, PropsWithChildren<WindowProps>>((props, ref) => {
  const baseProps = getBaseComponentProps(props);
  // TODO どうします？
  // const disablePositionStyle = props.disablePositionStyle ?? false;
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
        { '-pending': showAnimation && pending.current }
      ),
    [
      getBackgroundStyleClass,
      getBlurStyleClass,
      getShadowStyleClass,
      props.background,
      props.blur,
      props.className,
      props.shadow,
      showAnimation
    ]
  );

  if (!hideAnimation && !props.show && !pending.current) {
    pending.current = true;
  }

  if (!showAnimation && props.show) {
    pending.current = false;
  }

  useEffect(() => {
    if (showAnimation && pending.current && r.current) {
      if (closingTimeout.current != null) {
        clearTimeout(closingTimeout.current);
        closingTimeout.current = null;
      }
      r.current.classList.remove('-closing');
      r.current.classList.add('-opening');
      pending.current = false;
      setTimeout(() => {
        r.current && r.current.classList.remove('-pending');
      }, 0);
      setTimeout(() => {
        r.current && r.current.classList.remove('-opening');
      }, 200);
      return;
    }

    if (hideAnimation && !props.show && !pending.current && r.current) {
      r.current.classList.add('-closing');
      pending.current = true;

      closingTimeout.current = setTimeout(() => {
        pending.current = true;
        closingTimeout.current = null;
        forceRefresh();
        props.onClose && props.onClose();
      }, 200);
    }
    // TODO hideAnimationがなくてもonCloseを動作させる
  }, [forceRefresh, hideAnimation, props, props.show, r, showAnimation]);

  return props.show || !pending.current ? (
    <div className={className} {...baseProps} ref={r}>
      {props.control && (
        <WindowControlContainer controlPosition={controlPosition} style={props.controlStyle}>
          {props.control}
        </WindowControlContainer>
      )}
      {props.children}
    </div>
  ) : (
    <Fragment></Fragment>
  );
});
