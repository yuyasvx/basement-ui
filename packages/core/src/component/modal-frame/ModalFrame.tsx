import clsx from 'clsx';
import React, { forwardRef, type PropsWithChildren, type ReactNode, useCallback, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { type ClassNameCustomizable } from '../../hook/custom-class/CustomClassHook';
import { useOverlayInitializer } from '../../hook/overlay/OverlayInitializerHook';
import { ComponentToken } from '../ComponentToken';

export type ModalFrameProps = PropsWithChildren<{
  backdropLock?: boolean;
  backdrop?: ReactNode;
  onBackdropClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}> &
  ClassNameCustomizable;

export const ModalFrame = forwardRef<HTMLDivElement, ModalFrameProps>((props, ref) => {
  const cls = useMemo(() => clsx(ComponentToken.MODAL_FRAME, props.className), [props.className]);
  const { overlayElementId } = useOverlayInitializer();
  const target = document.getElementById(overlayElementId);
  const { children, backdropLock, backdrop } = props;
  const internalRef = useRef(null);
  const r = ref != null ? ref : internalRef;
  const cb = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
      props.onBackdropClick?.(event);
    },
    [props],
  );

  if (target == null) {
    return <></>;
  }

  return createPortal(
    <div className={cls} ref={r}>
      {backdropLock && (
        <div className={ComponentToken.modalFrame.BACKDROP} onClick={cb}>
          {backdrop}
        </div>
      )}
      <div className={ComponentToken.modalFrame.CONTAINER}>{children}</div>
    </div>,
    target,
  );
});
