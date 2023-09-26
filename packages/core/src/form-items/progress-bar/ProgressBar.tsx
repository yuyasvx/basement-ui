import { CSSProperties, FC, useCallback, useEffect, useMemo, useRef } from 'react';
import clsx from 'clsx';
import { GaugeBar, GaugeBarFiller } from '../../element/gauge/Gauge';
import { BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';

const NAME = 'bm-c-progress-bar';
const ITEM_NAME = `${NAME}__item`;
const INDETERMINATE_NAME = `${NAME}__indeterminate`;

export const ProgressBar: FC<ProgressBarProps> = props => {
  const { gaugeBarProps, fillerProps, indeterminateProps } = useProgressBarComponent(props);

  return (
    <GaugeBar {...gaugeBarProps}>
      <GaugeBarFiller {...fillerProps} />
      <GaugeBarFiller {...indeterminateProps} />
    </GaugeBar>
  );
};

export type ProgressBarProps = {
  maxValue?: number;
  value?: number;
  completed?: boolean;
  indeterminate?: boolean;
} & BaseComponentProps;

export function useProgressBarComponent(props: ProgressBarProps) {
  const baseProps = getBaseComponentProps(props);
  const maxValue = props.maxValue ?? 100;
  const value = props.value ?? 0;
  const completed = props.completed ?? false;
  const indeterminate = props.indeterminate ?? false;
  const calcFillerLength = useCallback((value: number, maxValue: number, full: boolean) => {
    if (full || value >= maxValue) {
      return '100%';
    }
    if (value < 0) {
      return '0%';
    }
    return `${(value / maxValue) * 100}%`;
  }, []);
  const className = useMemo(() => clsx(NAME, props.className), [props.className]);
  const fillerClassName = useMemo(
    () => clsx(ITEM_NAME, { '-visible': !indeterminate || completed }),
    [completed, indeterminate]
  );
  const indeterminateClassName = useMemo(
    () =>
      clsx(ITEM_NAME, INDETERMINATE_NAME, { '-visible': indeterminate && !completed }, { '-animated': indeterminate }),
    [completed, indeterminate]
  );
  const fr = useRef<HTMLDivElement>(null);
  // const timeOut = useRef(null as NodeJS.Timeout | null);
  // const indeterminateAnimationEnabled = useRef(false);
  //
  useEffect(() => {
    if ((!indeterminate || completed) && fr.current) {
      fr.current.classList.remove('-animated');
    }
  }, [completed, indeterminate]);

  return {
    gaugeBarProps: {
      ...baseProps,
      className,
      nativeProps: {
        role: 'progressbar',
        'aria-valuemin': 0,
        'aria-valuemax': maxValue,
        'aria-valuenow': value
      }
    },
    fillerProps: {
      className: fillerClassName,
      gradient: !completed,
      animated: true,
      shadow: true,
      style: { width: calcFillerLength(value, maxValue, completed) } as CSSProperties,
      value: value > 0
    },
    indeterminateProps: {
      className: indeterminateClassName,
      fill: false,
      ref: fr,
      animated: false
    }
  };
}
