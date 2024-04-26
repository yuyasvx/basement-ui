import clsx from 'clsx';
import { FC, ForwardedRef, PropsWithChildren, ReactNode, forwardRef, useMemo } from 'react';
import { BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';
import { StyleElementProps, StyleElements, useStyleElement } from '../../style-element/StyleElementHook';

const NAME = 'bm-e-markbox';

export type MarkboxProps = {
  marked: boolean;
  mark?: ReactNode;
} & StyleElementProps &
  BaseComponentProps;

export const Markbox = forwardRef((props: MarkboxProps, ref: ForwardedRef<HTMLDivElement>) => {
  const { newProps, symbolProps } = useMarkboxElement(props);
  return (
    <div ref={ref} {...newProps}>
      <MarkboxSymbolContainer {...symbolProps}>{props.mark}</MarkboxSymbolContainer>
    </div>
  );
});

export const MarkboxSymbolContainer: FC<PropsWithChildren<BaseComponentProps>> = (props) => {
  return <div className={props.className}>{props.children}</div>;
};

export const useMarkboxElement = (props: MarkboxProps) => {
  const styleElement = useStyleElement(StyleElements.PUSH, {
    variant: props.variant,
    effect: props.effect
  });
  const baseProps = getBaseComponentProps(props);
  return {
    name: NAME,
    newProps: {
      className: useMemo(
        () =>
          clsx(NAME, styleElement.name, styleElement.variant, styleElement.manual, styleElement.manualEffect, {
            '-marked': props.marked
          }),
        [props.marked, styleElement.manual, styleElement.manualEffect, styleElement.name, styleElement.variant]
      ),
      ...baseProps
    },
    symbolProps: {
      className: `${NAME}__symbol`
    }
  };
};
