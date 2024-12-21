import { type RefObject, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import type { Case } from '../../lib/Case';
import { useForceRefresh } from '../../utils/ForceRefreshHook';
import { TransitionState } from './enums/TransitionState';
import { TransitionTrigger } from './enums/TransitionTrigger';

const defaultOpenEvent = new CustomEvent('bmui-open');
const defaultCloseEvent = new CustomEvent('bmui-close');
const DATA_KEY = 'bmuiOpenState';

export interface TransitionSupportProps<E extends HTMLElement, CE = unknown> {
  show?: boolean;
  enableTransition?: Case<typeof TransitionTrigger>;
  ref: RefObject<E>;
  onOpen?: (event: Event) => void;
  onClose?: (event: Event) => void;
  duration?: number | 'auto';
  openEvent?: CustomEvent<CE>;
  closeEvent?: CustomEvent<CE>;
}

const getTransitionState = <E extends HTMLElement>(element: E | null | undefined): Case<typeof TransitionState> | undefined => {
  if (element == null) {
    return TransitionState.CLOSED;
  }
  if (element.dataset[DATA_KEY] != null) {
    return element.dataset[DATA_KEY] as Case<typeof TransitionState>;
  }
  if (element.dataset[DATA_KEY] == null) {
    return undefined;
  }
};

const doneTransition = <E extends HTMLElement, CE = unknown>(
  currentRef: E,
  transitionState: typeof TransitionState.OPEN | typeof TransitionState.CLOSED,
  customEvent: CustomEvent<CE>,
  eventCallback: ((event: Event) => void) | undefined,
) => {
  currentRef.dataset[DATA_KEY] = transitionState;

  if (eventCallback != null) {
    currentRef.addEventListener(customEvent.type as keyof HTMLElementEventMap, eventCallback);
  }
  currentRef.dispatchEvent(customEvent);
  if (eventCallback != null) {
    currentRef.removeEventListener(customEvent.type as keyof HTMLElementEventMap, eventCallback);
  }
};

export function useTransitionSupport<E extends HTMLElement, CE = unknown>(props: TransitionSupportProps<E, CE>) {
  const show = props.show ?? true;
  const trigger = props.enableTransition ?? TransitionTrigger.BOTH;
  const enableShowTrigger = trigger === TransitionTrigger.BOTH || trigger === TransitionTrigger.SHOW;
  const enableHideTrigger = trigger === TransitionTrigger.BOTH || trigger === TransitionTrigger.HIDE;
  const durationMs = props.duration === 'auto' ? 0 : (props.duration ?? 200);
  const autoDuration = props.duration === 'auto';
  const openEvent = props.openEvent ?? defaultOpenEvent;
  const closeEvent = props.closeEvent ?? defaultCloseEvent;

  const ref = props.ref;
  const doneTimeout = useRef(null as NodeJS.Timeout | null);
  const closingTimeout = useRef(null as NodeJS.Timeout | null);
  const forceRefresh = useForceRefresh();

  // showフラグの切り替えに即座に反応してOPENING/CLOSINGフラグをつける
  useLayoutEffect(() => {
    const currentRef = ref.current;
    if (show && getTransitionState(currentRef) !== TransitionState.OPEN && currentRef != null) {
      // 即座にOPENINGフラグをつけたい時は、最初のマウントの時のみ
      currentRef.dataset[DATA_KEY] = TransitionState.OPENING;
      if (!enableShowTrigger) {
        // 開始アニメーションが無い場合は途中をすっ飛ばして終わったことにする
        doneTransition(currentRef, TransitionState.OPEN, openEvent, onOpen);
      }
      return;
    }
  });

  // 表示中の制御
  const onOpen = props.onOpen;
  useEffect(() => {
    const currentRef = ref.current;
    if (currentRef == null) {
      return;
    }

    if (!show) {
      return;
    }

    if (enableShowTrigger && getTransitionState(currentRef) === TransitionState.OPENING && !autoDuration) {
      doneTimeout.current = setTimeout(() => {
        doneTransition(currentRef, TransitionState.OPEN, openEvent, onOpen);
        doneTimeout.current = null;
      }, durationMs);
    }

    return () => {
      const timeout = doneTimeout.current;
      if (timeout != null) {
        clearTimeout(timeout);
      }
      doneTimeout.current = null;
    };
  }, [autoDuration, durationMs, enableShowTrigger, onOpen, openEvent, ref, show]);

  //表示中の制御 (自動で発火ver)
  const doneAsOpenWrapper = useCallback(() => {
    const currentRef = ref.current;
    if (currentRef == null) {
      return;
    }
    doneTransition(currentRef, TransitionState.OPEN, openEvent, onOpen);
  }, [onOpen, openEvent, ref]);

  useEffect(() => {
    const currentRef = ref.current;
    if (currentRef == null) {
      return;
    }

    if (!show) {
      return;
    }

    if (enableShowTrigger && getTransitionState(currentRef) === TransitionState.OPENING && autoDuration) {
      currentRef.addEventListener('animationend', doneAsOpenWrapper);
    }

    return () => {
      currentRef.removeEventListener('animationend', doneAsOpenWrapper);
    };
  }, [autoDuration, doneAsOpenWrapper, enableShowTrigger, ref, show]);

  // 非表示中の制御
  const onClose = props.onClose;
  useEffect(() => {
    const currentRef = ref.current;
    if (currentRef == null) {
      return;
    }

    if (show) {
      return;
    }

    if (enableHideTrigger && getTransitionState(currentRef) === TransitionState.CLOSING && !autoDuration) {
      closingTimeout.current = setTimeout(() => {
        doneTransition(currentRef, TransitionState.CLOSED, closeEvent, onClose);
        forceRefresh();
        closingTimeout.current = null;
      }, durationMs);
    }

    return () => {
      const timeout = closingTimeout.current;
      if (timeout != null) {
        clearTimeout(timeout);
      }
      closingTimeout.current = null;
    };
  }, [autoDuration, closeEvent, durationMs, enableHideTrigger, forceRefresh, onClose, ref, show]);

  //非表示中の制御 (自動で発火ver)
  const doneAsCloseWrapper = useCallback(() => {
    const currentRef = ref.current;
    if (currentRef == null) {
      return;
    }
    doneTransition(currentRef, TransitionState.CLOSED, closeEvent, onClose);
    forceRefresh();
  }, [closeEvent, forceRefresh, onClose, ref]);
  useEffect(() => {
    const currentRef = ref.current;
    if (currentRef == null) {
      return;
    }

    if (show) {
      return;
    }

    if (enableHideTrigger && getTransitionState(currentRef) === TransitionState.CLOSING && autoDuration) {
      currentRef.addEventListener('animationend', doneAsCloseWrapper);
    }

    return () => {
      currentRef.removeEventListener('animationend', doneAsCloseWrapper);
    };
  }, [autoDuration, doneAsCloseWrapper, enableHideTrigger, forceRefresh, ref, show]);

  // 表示 → 非表示に切り替えた時、一番最初にこれがよばれる
  if (!show && getTransitionState(ref.current) !== TransitionState.CLOSED && ref.current != null) {
    ref.current.dataset[DATA_KEY] = TransitionState.CLOSING;

    if (!enableHideTrigger) {
      // 終了アニメーションが無い場合は途中をすっ飛ばして終わったことにする
      doneTransition(ref.current, TransitionState.CLOSED, closeEvent, onClose);
    }
  }

  // 表示 -> 非表示にするとき、時差をつけてアンマウントさせる
  // 完全に隠れているわけではない限りは表示状態にする
  return {
    show: show || !(getTransitionState(ref.current) === TransitionState.CLOSED),
  };
}
