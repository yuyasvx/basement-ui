import clsx from 'clsx';
import React, { forwardRef, type PropsWithChildren, type ReactNode, useCallback, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { type ClassNameCustomizable } from '../../hook/custom-class/CustomClassHook';
import { useOverlayInitializer } from '../../hook/overlay/OverlayInitializerHook';
import { type AlignmentProps, useAlignment } from '../alignment/Alignment';
import { ComponentToken } from '../ComponentToken';

export type ModalFrameProps = PropsWithChildren<{
  backdropLock?: boolean;
  backdrop?: ReactNode;
  onBackdropClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  enableAlignment?: boolean;
}> &
  ClassNameCustomizable &
  AlignmentProps;

function preventPropagation(evt: React.MouseEvent<HTMLElement, MouseEvent>) {
  evt.stopPropagation();
}

export const ModalFrame = forwardRef<HTMLDivElement, ModalFrameProps>((props, ref) => {
  const { enableAlignment, backdropLock, backdrop, children, onBackdropClick, className } = props;
  const modalFrameClass = useMemo(() => clsx(ComponentToken.MODAL_FRAME, className), [className]);

  const { alignmentClassName } = useAlignment(props);
  const modalFrameContainerClass = useMemo(
    () =>
      clsx(
        ComponentToken.modalFrame.CONTAINER,
        { ['-full']: backdropLock && enableAlignment },
        { [alignmentClassName]: backdropLock && enableAlignment },
      ),
    [alignmentClassName, backdropLock, enableAlignment],
  );

  const { overlayElementId } = useOverlayInitializer();
  const target = document.getElementById(overlayElementId);
  const internalRef = useRef(null);
  const r = ref != null ? ref : internalRef;
  const cb = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation();
      onBackdropClick?.(event);
    },
    [onBackdropClick],
  );

  if (target == null) {
    return <></>;
  }

  return createPortal(
    <div className={modalFrameClass} ref={r}>
      {backdropLock && <div className={ComponentToken.modalFrame.BACKDROP}>{backdrop}</div>}
      <div className={modalFrameContainerClass} onClick={cb}>
        <div className={ComponentToken.modalFrame.CONTENT} onClick={preventPropagation}>
          {children}
        </div>
      </div>
    </div>,
    target,
  );
});

ModalFrame.displayName = 'ModalFrame';
