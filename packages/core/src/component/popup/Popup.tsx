import clsx from 'clsx';
import { type CSSProperties, forwardRef, type HTMLAttributes, type ReactNode, useLayoutEffect, useRef } from 'react';
import type { Case } from '../../lib/Case';
import { ComponentToken } from '../ComponentToken';
import { PopupAlignmentType } from './PopupAlignmentType';
import { autoAlignment, calcAlignment } from './PopupPositionCalculator';
import { PopupVariable } from './PopupVariable';

export type PopupDetailedProps = {
  content?: ReactNode;
  show: boolean;
  autoAlign?: boolean;
  horizontalAlign?: Case<typeof PopupAlignmentType>;
  verticalAlign?: Case<typeof PopupAlignmentType>;
  zIndex?: number;
};

export type PopupProps = PopupDetailedProps & Omit<HTMLAttributes<HTMLDivElement>, 'content'>;

export const Popup = forwardRef<HTMLDivElement, PopupProps>((props, ref) => {
  const { newProps, restProps: restProps1, contentRef } = usePopup(props);
  newProps.className = clsx(newProps.className, props.className);
  newProps.style = { ...newProps.style, ...props.style };
  const { content, children, ...restProps2 } = restProps1;

  return (
    <div ref={ref} {...restProps2} {...newProps}>
      {children}
      {props.show && (
        <div className={ComponentToken.popup.CONTENT} ref={contentRef}>
          {content}
        </div>
      )}
    </div>
  );
});
Popup.displayName = 'Popup';

function usePopup<P extends Omit<PopupDetailedProps, 'content'>>(props: P) {
  const { show, autoAlign, horizontalAlign, verticalAlign, zIndex, ...restProps } = props;
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!show) {
      return;
    }

    const currentContent = contentRef.current;
    if (currentContent == null) {
      return;
    }
    const parent = currentContent.parentElement;
    if (parent == null) {
      return;
    }

    applyPosition(
      currentContent,
      parent.getBoundingClientRect(),
      horizontalAlign ?? PopupAlignmentType.CENTER,
      verticalAlign ?? PopupAlignmentType.OUTER_END,
      autoAlign ?? false,
    );
  }, [autoAlign, horizontalAlign, show, verticalAlign]);

  return {
    newProps: {
      className: ComponentToken.POPUP as string,
      style: {
        [`--${PopupVariable.Z_INDEX}`]: zIndex != null ? zIndex : undefined,
      } as CSSProperties,
    },
    restProps,
    contentRef,
  };
}

function applyPosition(
  contentElement: HTMLDivElement,
  parentDomRect: DOMRect,
  horizontalAlign: Case<typeof PopupAlignmentType>,
  verticalAlign: Case<typeof PopupAlignmentType>,
  autoAlign: boolean,
) {
  const style = calcAlignment(horizontalAlign, verticalAlign, parentDomRect);
  contentElement.style.left = style.left;
  contentElement.style.transform = style.transform;

  contentElement.style.top = style.top ?? 'unset';
  contentElement.style.bottom = style.bottom ?? 'unset';

  if (autoAlign) {
    const adjustedStyle = autoAlignment(parentDomRect, contentElement.getBoundingClientRect(), horizontalAlign, verticalAlign);
    contentElement.style.left = adjustedStyle.left;
    contentElement.style.transform = adjustedStyle.transform;

    contentElement.style.top = adjustedStyle.top ?? 'unset';
    contentElement.style.bottom = adjustedStyle.bottom ?? 'unset';
  }
}
