import clsx from 'clsx';
import { CSSProperties, FC, PropsWithChildren, forwardRef, useMemo } from 'react';
import { BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';
import { StyleSetProps, StyleSets, useStyleSet } from '../../style-element/StyleSetHook';
import { Case } from '../../util/Case';
import { SwitcherKnobPosition } from './SwitcherKnobPosition';

export type SwitcherElementProps = PropsWithChildren<{
  knob?: Case<typeof SwitcherKnobPosition>;
  baseStyle?: CSSProperties;
  knobStyle?: CSSProperties;
  className?: string;
}> &
  StyleSetProps &
  BaseComponentProps;

export const SwitcherElement: FC<SwitcherElementProps> = (props) => {
  return (
    <SwitcherBase {...props}>
      <SwitcherKnob {...props} />
    </SwitcherBase>
  );
};

export const SwitcherBase = forwardRef<HTMLDivElement, SwitcherElementProps>((props, ref) => {
  const { newProps, innerProps } = useSwitcherElement(props);
  return (
    <div {...newProps} ref={ref}>
      <div {...innerProps}>{props.children}</div>
    </div>
  );
});

export function useSwitcherElement(props: SwitcherElementProps) {
  const { variant, manual, manualEffect } = useStyleSet(StyleSets.SWITCH_ELEMENT, {
    variant: props.variant,
    status: props.status
  });
  const baseProps = getBaseComponentProps(props);

  return {
    newProps: {
      className: useMemo(
        () => clsx(StyleSets.SWITCH_ELEMENT, props.className, variant, manual, manualEffect),
        [manual, manualEffect, props.className, variant]
      ),
      ...baseProps
    },
    innerProps: {
      className: useMemo(() => clsx(`${StyleSets.SWITCH_ELEMENT}__inner`), [])
    }
  };
}

export const SwitcherKnob = forwardRef<HTMLDivElement, SwitcherElementProps>((props, ref) => {
  const { newProps } = useSwitcherKnobElement(props);

  return (
    <div {...newProps} ref={ref}>
      {props.children}
    </div>
  );
});

export function useSwitcherKnobElement(props: SwitcherElementProps) {
  const knobPosition = props.knob ?? SwitcherKnobPosition.NONE;
  const { name: styleName, variant, manual, manualEffect } = useStyleSet(StyleSets.PUSH, { status: props.status });

  return {
    newProps: {
      className: useMemo(
        () =>
          clsx(`${StyleSets.SWITCH_ELEMENT}__knob`, styleName, variant, manual, manualEffect, {
            '-on': knobPosition === SwitcherKnobPosition.ON,
            '-off': knobPosition === SwitcherKnobPosition.OFF
          }),
        [knobPosition, manual, manualEffect, styleName, variant]
      )
    }
  };
}
