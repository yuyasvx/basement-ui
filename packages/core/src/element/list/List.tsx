import clsx from 'clsx';
import { ForwardedRef, PropsWithChildren, forwardRef, useMemo } from 'react';
import { BaseComponentProps, VariantAdaptable, getBaseComponentProps } from '../../base/BaseComponent';
import { KeyEvents, MouseEvents } from '../../domain/EventProps';
import { useStyleElement } from '../../style-element/StyleElementHook';
import { getKeyEventHandler, getMouseEventHandler } from '../../util/Handler';
import { ListVariantType } from './ListVariantType';

export type List2Props = PropsWithChildren<
  VariantAdaptable<typeof ListVariantType> &
    BaseComponentProps &
    MouseEvents<HTMLUListElement> &
    KeyEvents<HTMLUListElement> & { containerRef?: unknown }
>;

export const List = forwardRef((props: List2Props, ref: ForwardedRef<HTMLUListElement>) => {
  const { newProps } = useListElement(props);
  return (
    <ul {...newProps} ref={ref}>
      {props.children}
    </ul>
  );
});

export function useListElement(props: List2Props) {
  const componentName = 'bm-e-list';
  const elm = useStyleElement<typeof ListVariantType>(componentName, { variant: props.variant });
  const me = getMouseEventHandler(props);
  const ke = getKeyEventHandler(props);
  const p = getBaseComponentProps(props);

  return {
    name: componentName,
    newProps: {
      className: useMemo(() => clsx(componentName, elm.variant, props.className), [elm.variant, props.className]),
      ...me,
      ...ke,
      ...p
    }
  };
}
