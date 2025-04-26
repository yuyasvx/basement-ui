import clsx from 'clsx';
import {
  type CSSProperties,
  forwardRef,
  type HTMLAttributes,
  type PropsWithChildren,
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { ComponentToken } from '../ComponentToken';
import { ScrollableViewManager } from './ScrollableViewManager';
import { ScrollBar } from './ScrollBar';
import { ScrollBarVariable } from './ScrollBarVariable';

export type ScrollableViewDetailedProps = {
  scrollBarVerticalOffset?: string;
};

export type ScrollableViewProps = PropsWithChildren<ScrollableViewDetailedProps> & HTMLAttributes<HTMLDivElement>;

export const ScrollableView = forwardRef<HTMLDivElement, ScrollableViewProps>((props, ref) => {
  const internalRef = useRef<HTMLDivElement>(null);
  const { children, ...rest1 } = props;
  const { newProps, restProps } = useScrollableView(rest1, (ref as RefObject<HTMLDivElement>) ?? internalRef);
  newProps.style = { ...newProps.style, ...restProps.style };
  return (
    <div {...restProps} {...newProps}>
      <div data-bmui-view-type="content" className={ComponentToken.scrollableView.CONTENT}>
        {children}
      </div>
      <ScrollBar />
    </div>
  );
});

ScrollableView.displayName = 'ScrollableView';

export function useScrollableView<P extends ScrollableViewDetailedProps, RE extends HTMLElement>(
  { scrollBarVerticalOffset, ...restProps }: P,
  ref: RefObject<RE>,
) {
  const managerRef = useRef(new ScrollableViewManager());
  const manager = managerRef.current;
  const className = useMemo(() => clsx(ComponentToken.SCROLLABLE_VIEW), []);

  const preHandleScroll = useCallback(() => {
    manager.acceptScrolling();
  }, [manager]);

  useEffect(() => {
    manager.viewElement = ref.current ?? undefined;
    manager.startScrollObservation(preHandleScroll);
    manager.enableObserver();

    return () => {
      manager.disableObserver();
      manager.endScrollObservation(preHandleScroll);
    };
  }, [manager, preHandleScroll, ref]);

  return {
    newProps: {
      className,
      style: {
        [`--${ScrollBarVariable.VERTICAL_HEAD_OFFSET}`]: scrollBarVerticalOffset,
      } as CSSProperties,
      ref,
    },
    restProps: restProps,
  };
}
