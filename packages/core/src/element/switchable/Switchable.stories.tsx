import { Meta, StoryObj } from '@storybook/react';
import { CSSProperties } from 'react';
import { VariantType } from '../../style-element/VariantType';
import { SwitcherBase, SwitcherElement, SwitcherElementProps, SwitcherKnob } from './Switchable';
import { SwitcherKnobPosition } from './SwitcherKnobPosition';

export default {
  title: 'Element/Switcher Element',
  argTypes: {
    variant: {
      options: Object.values(VariantType),
      control: { type: 'select' }
    },
    knob: {
      options: Object.values(SwitcherKnobPosition),
      control: { type: 'select' }
    }
  }
} as Meta;

export const Story: StoryObj<SwitcherElementProps> = {
  render: (args) => {
    return (
      <>
        <SwitcherElement {...args} />
        <SwitcherBase {...args}>Base</SwitcherBase>
        <SwitcherKnob {...args} />
      </>
    );
  },
  args: {
    knob: SwitcherKnobPosition.NONE,
    variant: VariantType.NORMAL,
    status: undefined,
    style: {
      '--bm-switcher-width': '20px',
      '--bm-switcher-height': '12px',
      '--bm-switcher-radius': '6px',
      '--bm-switcher-border-width': '1px',
      '--bm-switcher-padding': '2px',
      '--bm-tint-rgb': [232, 167, 0]
    } as CSSProperties
  }
};
