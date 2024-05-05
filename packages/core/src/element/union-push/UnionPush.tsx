import clsx from 'clsx';
import { FC, ForwardedRef, PropsWithChildren, forwardRef, useMemo } from 'react';
import { BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';
import { MouseEvents } from '../../domain/EventProps';
import { StyleSetProps, StyleSets, useStyleSet } from '../../style-element/StyleSetHook';
import { getMouseEventHandler } from '../../util/Handler';

export const UnionPush = forwardRef((props: PropsWithChildren<UnionPushProps>, ref: ForwardedRef<HTMLDivElement>) => {
  const newProps = useUnionPushElement(props);
  return (
    <div {...newProps} ref={ref}>
      {props.children}
    </div>
  );
});

export const UnionPushPrimary = forwardRef((props: PropsWithChildren, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div ref={ref} className={`${StyleSets.UNION_PUSH}__primary`}>
      {props.children}
    </div>
  );
});

export const UnionPushSecondary: FC<PropsWithChildren> = forwardRef(
  (props: PropsWithChildren, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div ref={ref} className={`${StyleSets.UNION_PUSH}__secondary`}>
        {props.children}
      </div>
    );
  }
);

export type UnionPushProps = BaseComponentProps & StyleSetProps & MouseEvents<HTMLDivElement>;

export const useUnionPushElement = (props: UnionPushProps) => {
  const styleSet = useStyleSet(StyleSets.UNION_PUSH, {
    variant: props.variant,
    status: props.status
  });
  const baseProps = getBaseComponentProps(props);
  const mouseEventProps = getMouseEventHandler(props);

  return {
    className: useMemo(() => clsx(styleSet.classNames, props.className), [props.className, styleSet.classNames]),
    ...baseProps,
    ...mouseEventProps
  };
};
