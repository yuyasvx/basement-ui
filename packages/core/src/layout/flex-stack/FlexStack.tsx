import { FC, PropsWithChildren, useMemo } from 'react';
import clsx from 'clsx';
import { BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';
import { MouseEvents } from '../../domain/EventProps';
import { getMouseEventHandler } from '../../util/Handler';

interface FlexStackDetailedProps {
  direction?: 'horizontal' | 'vertical';
  as?: keyof JSX.IntrinsicElements;
}

const NAME = 'bm-l-flex-stack';

export type FlexStackProps<T> = FlexStackDetailedProps & BaseComponentProps & MouseEvents<T>;

export const useFlexStackHook = <T extends Element>(props: FlexStackProps<T>, componentName: string) => {
  const baseProps = getBaseComponentProps(props);
  const mouseEvents = getMouseEventHandler<T, typeof props>(props);
  const classNames = clsx(componentName, props.className);
  const Component = useMemo(() => props.as ?? 'div', [props.as]);

  return {
    baseProps,
    mouseEvents,
    classNames,
    Component,
    newProps: {
      ...baseProps,
      ...mouseEvents,
      className: classNames
    }
  };
};

export const FlexStack: FC<PropsWithChildren<FlexStackProps<HTMLDivElement>>> = props => {
  const { Component, newProps } = useFlexStackHook(props, NAME);
  return <div {...newProps}>{props.children}</div>;
};
