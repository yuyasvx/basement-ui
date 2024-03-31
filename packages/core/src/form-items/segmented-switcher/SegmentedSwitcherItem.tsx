import clsx from 'clsx';
import { FC, PropsWithChildren, useContext, useMemo } from 'react';
import { BaseComponentProps } from '../../base/BaseComponent';
import { FormEvents, MouseEvents } from '../../domain/EventProps';
import { getFormEventHandler, getMouseEventHandler } from '../../util/Handler';
import { useSegmentedSwitcherContext } from './SegmentedSwitcher';

const NAME = 'bm-c-segmented-switcher__item';

interface SegmentedSwitcherItemDetailedProps {
  selected?: boolean;
  disabled?: boolean;
  name?: string;
}

export type SegmentedSwitcherItemProps = SegmentedSwitcherItemDetailedProps &
  BaseComponentProps &
  MouseEvents<HTMLLabelElement> &
  FormEvents<HTMLInputElement>;

export const SegmentedSwitcherItem: FC<PropsWithChildren<SegmentedSwitcherItemProps>> = (props) => {
  const ctx = useContext(useSegmentedSwitcherContext());
  const disabled = useMemo(() => ctx.disabled || (props.disabled ?? false), [ctx.disabled, props.disabled]);
  // const appearanceClassName = useMemo(() => (props.selected ? '-selected' : ''), [props.selected]);
  const selectedClassName = useMemo(() => (props.selected ? '-selected' : ''), [props.selected]);
  const className = clsx(NAME, selectedClassName, { '-disabled': disabled }, props.className);
  const mouse = getMouseEventHandler(props);
  const formEvents = getFormEventHandler<HTMLInputElement, typeof props>(props);

  return (
    <label {...mouse} className={className}>
      <input
        type="radio"
        name={props.name}
        tabIndex={-1}
        checked={props.selected ?? false}
        disabled={disabled}
        {...formEvents}
      />
      <span>{props.children}</span>
    </label>
  );
};
