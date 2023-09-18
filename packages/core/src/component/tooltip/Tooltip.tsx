import {
  Dispatch,
  FC,
  forwardRef,
  Fragment,
  MouseEvent,
  MutableRefObject,
  PropsWithChildren,
  ReactNode,
  RefObject,
  SetStateAction,
  useEffect,
  useState
} from 'react';
import { Case } from '../../util/Case';
import { BaseComponentProps } from '../../base/BaseComponent';
import { useBasementUIContext } from '../../context/BasementUIContext';
import { Overlay } from '../overlay/Overlay';
import { determinePosition, useTooltip } from './TooltipHook';

const NAME = 'bm-c-tooltip';

interface Tooltip2DetailedProps {
  content?: ReactNode;
  position?: Case<typeof TooltipPosition>;
  displayAs?: Case<typeof TooltipSourceDisplayMode>;
  showDelay?: number;
  hideDelay?: number;
  disabled?: boolean;
  offset?: number;
  hideTriggers?: Case<typeof TooltipHideTrigger>[];
}

const TooltipHideTrigger = {
  MOUSE_LEAVE: 'mouse-leave',
  ESC: 'esc',
  CLICK: 'click',
  SCROLL: 'scroll'
} as const;

export type Tooltip2Props = Tooltip2DetailedProps & BaseComponentProps;

export const Tooltip: FC<PropsWithChildren<Tooltip2Props>> = props => {
  const displayAs = props.displayAs ?? 'inline-block';
  const { props: newProps } = useTooltip(NAME, props);
  return (
    <>
      {displayAs === 'block' ? (
        <div {...newProps} ref={newProps.ref as RefObject<HTMLDivElement>}>
          {props.children}
        </div>
      ) : (
        <span {...newProps}>{props.children}</span>
      )}
    </>
  );
};

export type Tooltip2InnerProps = PropsWithChildren<{
  className: string;
  position: Case<typeof TooltipPosition>;
  targetRef: RefObject<HTMLElement>;
  mouseEventRef: MutableRefObject<MouseEvent<HTMLElement> | null>;
  offset: number;
}>;

const TooltipInner = forwardRef<HTMLDivElement, Tooltip2InnerProps>((props, ref) => {
  const { className, position, targetRef, mouseEventRef } = props;

  const r = ref as RefObject<HTMLDivElement> | null;

  useEffect(() => {
    if (r && r.current) {
      const style = determinePosition(position ?? TooltipPosition.AUTO, r, mouseEventRef, props.offset);
      r.current.style.position = 'fixed';
      r.current.style.left = style.left;
      r.current.style.top = style.top;
      r.current.style.transform = style.transform;
      r.current.style.visibility = 'visible';
    }
  }, [mouseEventRef, position, props.offset, r, targetRef]);

  return (
    <div className={className} style={{ visibility: 'hidden', pointerEvents: 'none' }} ref={ref}>
      {props.children}
    </div>
  );
});

export const TooltipRenderer: FC<PropsWithChildren> = props => {
  const { tooltip } = useBasementUIContext();
  const [contents, setContents] = useState(tooltip.contents.current);

  useEffect(() => {
    tooltip.dispatchers.current.tooltipRenderer = setContents as Dispatch<SetStateAction<unknown>>;

    return () => {
      tooltip.dispatchers.current.tooltipRenderer = undefined;
    };
  }, [tooltip.dispatchers]);

  return (
    <>
      <Overlay>
        {Object.entries(contents).map(entry =>
          entry[1] == null ? (
            <Fragment key={entry[0]} />
          ) : (
            <TooltipInner
              key={entry[0]}
              className={entry[1].className}
              mouseEventRef={entry[1].mouseEventRef}
              targetRef={entry[1].targetRef}
              position={entry[1].position}
              ref={entry[1].ref}
              offset={entry[1].offset}
            >
              {entry[1].content}
            </TooltipInner>
          )
        )}
      </Overlay>
    </>
  );
};

export const TooltipSourceDisplayMode = {
  INLINE_BLOCK: 'inline-block',
  BLOCK: 'block'
} as const;

// export const TooltipOrigin = {
//   CURSOR: 'cursor',
//   CHILDREN: 'children'
// } as const;

export const TooltipPosition = {
  AUTO: 'auto',
  NORTH: 'north',
  EAST: 'east',
  SOUTH: 'south',
  WEST: 'west',
  NORTHWEST: 'northwest',
  NORTHEAST: 'northeast',
  SOUTHEAST: 'southeast',
  SOUTHWEST: 'southwest'
} as const;
