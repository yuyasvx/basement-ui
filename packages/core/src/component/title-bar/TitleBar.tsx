import { CSSProperties, FC, ForwardedRef, forwardRef, PropsWithChildren, ReactNode, useMemo } from 'react';
import clsx from 'clsx';
import { BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';
import { MouseEvents } from '../../domain/EventProps';

const NAME = 'bm-c-title-bar';
const ACCESSORY_NAME = `${NAME}__accessory`;
const LEFT_ACCESSORY_NAME = `${NAME}__l`;
const RIGHT_ACCESSORY_NAME = `${NAME}__r`;
const CONTENT_NAME = `${NAME}-content`;

export const TitleBar = forwardRef((props: PropsWithChildren<TitleBarProps>, ref: ForwardedRef<HTMLDivElement>) => {
  const baseProps = getBaseComponentProps(props);
  const leftProps = props.leftAccessoryProps ?? {};
  const rightProps = props.rightAccessoryProps ?? {};
  const className = useMemo(
    () => clsx(NAME, { '-center': props.center }, props.className),
    [props.center, props.className]
  );
  const contentClassName = useMemo(() => clsx(CONTENT_NAME), []);
  const leftClassName = useMemo(
    () => clsx(ACCESSORY_NAME, LEFT_ACCESSORY_NAME, { '-shrink': leftProps.autoShrink }, leftProps.className),
    [leftProps.autoShrink, leftProps.className]
  );
  const rightClassName = useMemo(
    () => clsx(ACCESSORY_NAME, RIGHT_ACCESSORY_NAME, { '-shrink': rightProps.autoShrink }, rightProps.className),
    [rightProps.autoShrink, rightProps.className]
  );

  return (
    <div className={className} ref={ref} {...baseProps}>
      {(leftProps.show == null || leftProps.show) && (
        <TitleBarAccessory className={leftClassName} style={leftProps.style}>
          {props.leftAccessory}
        </TitleBarAccessory>
      )}
      <div className={contentClassName}>{props.children}</div>
      {(rightProps.show == null || rightProps.show) && (
        <TitleBarAccessory className={rightClassName} style={rightProps.style}>
          {props.rightAccessory}
        </TitleBarAccessory>
      )}
    </div>
  );
});

export const TitleBarAccessory: FC<PropsWithChildren<BaseComponentProps>> = props => {
  const baseProps = getBaseComponentProps(props);
  return (
    <div {...baseProps} className={props.className}>
      {props.children}
    </div>
  );
};

type TitleBarAccessoryProps = {
  show?: boolean;
  autoShrink?: boolean;
  style?: CSSProperties;
  className?: string;
  id?: string;
};

export type TitleBarProps = {
  center?: boolean;
  leftAccessory?: ReactNode;
  leftAccessoryProps?: TitleBarAccessoryProps;
  rightAccessory?: ReactNode;
  rightAccessoryProps?: TitleBarAccessoryProps;
} & BaseComponentProps &
  MouseEvents<HTMLDivElement>;
