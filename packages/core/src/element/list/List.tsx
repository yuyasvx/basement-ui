import clsx from 'clsx';
import { ForwardedRef, PropsWithChildren, forwardRef, useMemo } from 'react';
import { BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';
import { KeyEvents, MouseEvents } from '../../domain/EventProps';
import { StyleSets, useStyleSet } from '../../style-element/StyleSetHook';
import { VariantAdaptable } from '../../style-element/VariantAdaptable';
import { getKeyEventHandler, getMouseEventHandler } from '../../util/Handler';
import { ListVariantType } from './ListVariantType';

export type ListProps = PropsWithChildren<
  VariantAdaptable<typeof ListVariantType> &
    BaseComponentProps &
    MouseEvents<HTMLUListElement> &
    KeyEvents<HTMLUListElement> & { containerRef?: unknown }
>;

export const List = forwardRef((props: ListProps, ref: ForwardedRef<HTMLUListElement>) => {
  const { newProps } = useListElement(props);
  return (
    <ul {...newProps} ref={ref}>
      {props.children}
    </ul>
  );
});

export function useListElement(props: ListProps) {
  const elm = useStyleSet<typeof ListVariantType>(StyleSets.LIST, { variant: props.variant });
  const me = getMouseEventHandler(props);
  const ke = getKeyEventHandler(props);
  const p = getBaseComponentProps(props);

  return {
    name: StyleSets.LIST,
    newProps: {
      className: useMemo(() => clsx(StyleSets.LIST, elm.variant, props.className), [elm.variant, props.className]),
      ...me,
      ...ke,
      ...p
    }
  };
}
