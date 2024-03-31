import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const NAME = 'bm-c-overlay';

const internalState = {
  initialized: false
};

export function useOverlayInitializer(state: typeof internalState) {
  const [initialized, setInitialized] = useState(internalState.initialized);
  useEffect(() => {
    if (!state.initialized) {
      if (document.getElementById(NAME) != null) {
        state.initialized = true;
        setInitialized(true);
        return;
      }

      const element = document.createElement('div');
      // element.classList.add(NAME);
      element.id = NAME;
      element.style.position = 'absolute';
      element.style.top = '0';
      element.style.left = '0';
      document.body.appendChild(element);
      state.initialized = true;
      setInitialized(true);
    }
  }, [state]);
  return initialized;
}

/**
 * @deprecated Overlay表示を一元管理することにあまり意味が無いように思える。高さや幅を親要素の100%で指定できなくなるから。
 * @param props
 * @constructor
 */
export const Overlay: FC<PropsWithChildren> = (props) => {
  const initialized = useOverlayInitializer(internalState);
  if (!initialized) {
    return <></>;
  }

  const target = document.getElementById(NAME);
  if (target == null) {
    return <></>;
  }

  return createPortal(props.children, target);
};
