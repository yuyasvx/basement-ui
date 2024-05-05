import clsx from 'clsx';
import { FC, ForwardedRef, PropsWithChildren, ReactNode, forwardRef, useMemo } from 'react';
import { BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';
import { StyleSetProps, StyleSets, useStyleSet } from '../../style-element/StyleSetHook';

const NAME = 'bm-e-markbox';

export type MarkboxProps = {
  marked: boolean;
  mark?: ReactNode;
} & StyleSetProps &
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
  const styleElement = useStyleSet(StyleSets.PUSH, {
    variant: props.variant,
    status: props.status
  });
  const baseProps = getBaseComponentProps(props);
  return {
    name: NAME,
    newProps: {
      className: useMemo(
        () =>
          clsx(NAME, styleElement.name, styleElement.variant, styleElement.manual, styleElement.manualStatus, {
            '-marked': props.marked
          }),
        [props.marked, styleElement.manual, styleElement.manualStatus, styleElement.name, styleElement.variant]
      ),
      ...baseProps
    },
    symbolProps: {
      className: `${NAME}__symbol`
    }
  };
};
