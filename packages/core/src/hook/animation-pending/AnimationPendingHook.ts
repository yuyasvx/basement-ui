import { type RefObject, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { AnimationTrigger } from '../../enums/AnimationTrigger';
import type { Case } from '../../lib/Case';
import { useForceRefresh } from '../../utils/ForceRefreshHook';

const defaultOpenEvent = new CustomEvent('bmui-open');
const defaultCloseEvent = new CustomEvent('bmui-close');
const DATA_KEY = 'bmuiOpenState';

const TransitionState = {
  /*表示途中*/
  PENDING: 'pending',
  /*表示済み*/
  VISIBLE: 'visible',
  /*非表示途中*/
  HIDING: 'hiding',
  /*非表示*/
  HIDDEN: 'hidden',
} as const;

export interface AnimationPendingHookProps<E extends HTMLElement, CE = unknown> {
  show?: boolean;
  animated?: Case<typeof AnimationTrigger>;
  ref: RefObject<E>;
  onVisible?: (event: Event) => void;
  onHidden?: (event: Event) => void;
  duration?: number;
  openEvent?: CustomEvent<CE>;
  closeEvent?: CustomEvent<CE>;
}

const getTransitionState = <E extends HTMLElement>(element: E | null | undefined): Case<typeof TransitionState> | undefined => {
  if (element == null) {
    return TransitionState.HIDDEN;
  }
  if (element.dataset[DATA_KEY] != null) {
    return element.dataset[DATA_KEY] as Case<typeof TransitionState>;
  }
  if (element.dataset[DATA_KEY] == null) {
    return undefined;
  }
};

export function useAnimationPending<E extends HTMLElement, CE = unknown>(props: AnimationPendingHookProps<E, CE>) {
  const show = props.show ?? true;

  const animation = props.animated ?? AnimationTrigger.BOTH;
  const showAnimation = animation === AnimationTrigger.BOTH || animation === AnimationTrigger.SHOW;
  const hideAnimation = animation === AnimationTrigger.BOTH || animation === AnimationTrigger.HIDE;
  const animationDurationMs = props.duration ?? 200;
  const openEvent = props.openEvent ?? defaultOpenEvent;
  const closeEvent = props.closeEvent ?? defaultCloseEvent;

  const ref = props.ref;
  const doneTimeout = useRef(null as NodeJS.Timeout | null);
  const closingTimeout = useRef(null as NodeJS.Timeout | null);
  const forceRefresh = useForceRefresh();

  // showフラグの切り替えに即座に反応してOPENING/CLOSINGフラグをつける
  useLayoutEffect(() => {
    const currentRef = ref.current;
    if (show && getTransitionState(currentRef) !== TransitionState.VISIBLE && currentRef != null) {
      // 即座にOPENINGフラグをつけたい時は、最初のマウントの時のみ
      currentRef.dataset[DATA_KEY] = TransitionState.PENDING;
      if (!showAnimation) {
        // 開始アニメーションが無い場合は途中をすっ飛ばして終わったことにする
        doneAsVisible(currentRef, onVisible);
      }
      return;
    }
  });

  const doneAsVisible = useCallback(
    (currentRef: E, eventCallback: ((event: Event) => void) | undefined) => {
      currentRef.dataset[DATA_KEY] = TransitionState.VISIBLE;

      if (eventCallback != null) {
        currentRef.addEventListener(openEvent.type as keyof HTMLElementEventMap, eventCallback);
      }
      currentRef.dispatchEvent(openEvent);
      if (eventCallback != null) {
        currentRef.removeEventListener(openEvent.type as keyof HTMLElementEventMap, eventCallback);
      }
    },
    [openEvent],
  );

  const doneAsHidden = useCallback(
    (currentRef: E, eventCallback: ((event: Event) => void) | undefined) => {
      currentRef.dataset[DATA_KEY] = TransitionState.HIDDEN;

      if (eventCallback != null) {
        currentRef.addEventListener(closeEvent.type as keyof HTMLElementEventMap, eventCallback);
      }
      currentRef.dispatchEvent(closeEvent);
      if (eventCallback != null) {
        currentRef.removeEventListener(closeEvent.type as keyof HTMLElementEventMap, eventCallback);
      }
    },
    [closeEvent],
  );

  // 表示中の制御
  const onVisible = props.onVisible;
  useEffect(() => {
    const currentRef = ref.current;
    if (currentRef == null) {
      return;
    }

    if (!show) {
      return;
    }

    if (showAnimation && getTransitionState(currentRef) === TransitionState.PENDING) {
      doneTimeout.current = setTimeout(() => {
        doneAsVisible(currentRef, onVisible);
        doneTimeout.current = null;
      }, animationDurationMs);
    }

    return () => {
      const timeout = doneTimeout.current;
      if (timeout != null) {
        clearTimeout(timeout);
      }
      doneTimeout.current = null;
    };
  }, [animationDurationMs, doneAsVisible, onVisible, ref, show, showAnimation]);

  // 非表示中の制御
  const onHidden = props.onHidden;
  useEffect(() => {
    const currentRef = ref.current;
    if (currentRef == null) {
      return;
    }

    if (show) {
      return;
    }

    if (hideAnimation && getTransitionState(currentRef) === TransitionState.HIDING) {
      closingTimeout.current = setTimeout(() => {
        doneAsHidden(currentRef, onHidden);
        forceRefresh();
        closingTimeout.current = null;
      }, animationDurationMs);
    }

    return () => {
      const timeout = closingTimeout.current;
      if (timeout != null) {
        clearTimeout(timeout);
      }
      closingTimeout.current = null;
    };
  }, [animationDurationMs, doneAsHidden, forceRefresh, hideAnimation, onHidden, ref, show]);

  // 表示 → 非表示に切り替えた時、一番最初にこれがよばれる
  if (!show && getTransitionState(ref.current) !== TransitionState.HIDDEN && ref.current != null) {
    ref.current.dataset[DATA_KEY] = TransitionState.HIDING;

    if (!hideAnimation) {
      // 終了アニメーションが無い場合は途中をすっ飛ばして終わったことにする
      doneAsHidden(ref.current, onHidden);
    }
  }

  // 表示 -> 非表示にするとき、時差をつけてアンマウントさせる
  // 完全に隠れているわけではない限りは表示状態にする
  return {
    show: show || !(getTransitionState(ref.current) === TransitionState.HIDDEN),
  };
}
