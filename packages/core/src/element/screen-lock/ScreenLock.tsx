import { FC, ForwardedRef, forwardRef, PropsWithChildren, useMemo } from 'react';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';
import { MouseEvents } from '../../domain/EventProps';
import { getMouseEventHandler } from '../../util/Handler';
import { Overlay, useOverlayInitializer } from '../../component/overlay/Overlay';
import { useScrollLock } from '../../hook/ScrollLockHook';

const NAME = 'bm-e-lock';

// const ScreenLockContainer: FC<PropsWithChildren> = props => {
//   const initialized = useOverlayInitializer(internalState);
//   if (!initialized) {
//     return <></>;
//   }
//
//   const target = document.getElementById(NAME);
//   if (target == null) {
//     return <></>;
//   }
//
//   return createPortal(props.children, target);
// };

export const ScreenLock = forwardRef((props: PropsWithChildren<ScreenLockProps>, ref: ForwardedRef<HTMLDivElement>) => {
  const baseProps = getBaseComponentProps(props);
  const mouse = getMouseEventHandler(props);
  const className = useMemo(
    () => clsx(NAME, { '-scroll': !props.fixed }, props.className),
    [props.className, props.fixed]
  );
  useScrollLock(props.scrollLock ?? false);

  return createPortal(
    <div {...baseProps} {...mouse} ref={ref} className={className}>
      {props.children}
    </div>,
    document.body
  );
});

export interface ScreenLockDetailedProps {
  scrollLock?: boolean;
  // スクロールしても表示位置が固定になるか。デフォルトtrue。
  fixed?: boolean;
}

export type ScreenLockProps = BaseComponentProps & MouseEvents & ScreenLockDetailedProps;
