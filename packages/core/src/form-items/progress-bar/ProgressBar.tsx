import { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import clsx from 'clsx';
import { GaugeBar, GaugeBarFiller } from '../../element/gauge/Gauge';
import { BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';

const NAME = 'bm-c-progress-bar';
const ITEM_NAME = `${NAME}__item`;
const INDETERMINATE_NAME = `${NAME}__indeterminate`;

export const ProgressBar: FC<ProgressBarProps> = props => {
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

  return (
    <GaugeBar {...baseProps} className={className}>
      <GaugeBarFiller
        className={fillerClassName}
        gradient={!completed}
        animated
        shadow
        style={{ width: calcFillerLength(value, maxValue, completed) }}
        value={value > 0}
      />
      <GaugeBarFiller className={indeterminateClassName} fill={false} ref={fr} animated={false} />
    </GaugeBar>
  );
};

export type ProgressBarProps = {
  maxValue?: number;
  value?: number;
  completed?: boolean;
  indeterminate?: boolean;
} & BaseComponentProps;
