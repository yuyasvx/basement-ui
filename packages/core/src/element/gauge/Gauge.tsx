import clsx from 'clsx';
import { CSSProperties, FC, ForwardedRef, PropsWithChildren, forwardRef, useMemo } from 'react';
import { BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';

const NAME = 'bm-e-gauge';
const FILLER_NAME = `${NAME}__filler`;

export const GaugeBar: FC<PropsWithChildren<BaseComponentProps>> = (props) => {
  const baseProps = getBaseComponentProps(props);
  const className = useMemo(() => clsx(NAME, props.className), [props.className]);
  return (
    <div {...baseProps} className={className}>
      {props.children}
    </div>
  );
};

export const GaugeBarFiller = forwardRef(
  (props: PropsWithChildren<GaugeBarFillerProps>, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <div
        className={clsx(
          FILLER_NAME,
          props.className,
          { '-fill': props.fill ?? true },
          { '-shadow': props.shadow },
          { '-gradient': props.gradient },
          { '-animated': props.animated ?? true },
          { '-value': props.value }
        )}
        style={props.style}
        ref={ref}
      >
        {props.children}
      </div>
    );
  }
);

export type GaugeBarFillerProps = {
  className?: string;
  style?: CSSProperties;
  shadow?: boolean;
  gradient?: boolean;
  animated?: boolean;
  fill?: boolean;
  value?: boolean;
};
