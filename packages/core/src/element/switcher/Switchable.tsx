import { CSSProperties, FC, PropsWithChildren, useMemo } from 'react';
import clsx from 'clsx';
import { MarkableContext, useMarkableClassHook } from '../markable/Markable';

export interface SwitcherElementProps {
  indeterminate?: boolean;
  baseStyle?: CSSProperties;
  knobStyle?: CSSProperties;
  className?: string;
}

export interface SwitcherKnobProps {
  disabled: boolean;
  checked: boolean;
  indeterminate?: boolean;
  style?: CSSProperties;
  className?: string;
}

const NAME = 'bm-e-switchable';
const INNER_NAME = `${NAME}__inner`;
const KNOB_NAME = `${NAME}__knob`;

export const SwitcherBase: FC<PropsWithChildren<{ className?: string }>> = props => {
  const classNames = useMemo(() => clsx(NAME, props.className), [props.className]);
  return <div className={classNames}>{props.children}</div>;
};

export const Switchable: FC<SwitcherElementProps & MarkableContext> = props => {
  const { markableClass } = useMarkableClassHook(props);
  return (
    <SwitcherBase className={markableClass}>
      <div className={INNER_NAME}>
        <div className={KNOB_NAME}></div>
      </div>
    </SwitcherBase>
  );
};
