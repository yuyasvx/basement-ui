import clsx from 'clsx';
import { FC, ForwardedRef, PropsWithChildren, forwardRef, useMemo } from 'react';
import { BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';
import { MouseEvents } from '../../domain/EventProps';
import { StyleElementProps, useStyleElement } from '../../style-element/StyleElementHook';
import { getMouseEventHandler } from '../../util/Handler';

const NAME = 'bm-e-union-push';

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
    <div ref={ref} className={`${NAME}__primary`}>
      {props.children}
    </div>
  );
});

export const UnionPushSecondary: FC<PropsWithChildren> = forwardRef(
  (props: PropsWithChildren, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div ref={ref} className={`${NAME}__secondary`}>
        {props.children}
      </div>
    );
  }
);

export type UnionPushProps = BaseComponentProps & StyleElementProps & MouseEvents<HTMLDivElement>;

export const useUnionPushElement = (props: UnionPushProps) => {
  const styleElement = useStyleElement(NAME, {
    variant: props.variant,
    effect: props.effect
  });
  const baseProps = getBaseComponentProps(props);
  const mouseEventProps = getMouseEventHandler(props);

  return {
    className: useMemo(
      () => clsx(styleElement.name, styleElement.variant, styleElement.manualEffect, props.className),
      [props.className, styleElement.manualEffect, styleElement.name, styleElement.variant]
    ),
    ...baseProps,
    ...mouseEventProps
  };
};
