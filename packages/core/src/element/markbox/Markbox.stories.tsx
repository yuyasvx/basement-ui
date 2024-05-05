import { Meta, StoryObj } from '@storybook/react';
import { AppearanceType } from '../../domain/AppearanceType';
import { Checkmark } from './Checkmark';
import { Markbox } from './Markbox';

export default {
  title: 'Element/Markbox',
  argTypes: {
    variant: {
      options: Object.values(AppearanceType),
      control: { type: 'select' }
    },
    status: {
      options: [undefined, 'hover', 'active', 'disabled'],
      control: { type: 'select' }
    }
  }
} as Meta;

export const PropsStory: StoryObj<typeof Markbox> = {
  render: (args) => {
    return <Markbox {...args} style={{ width: '24px', height: '24px' }} />;
  },
  args: {
    variant: AppearanceType.NORMAL,
    mark: '●',
    marked: true,
    status: undefined
  }
};

PropsStory.storyName = 'Props';

export const BasePropsStory: StoryObj = {
  render: (args) => {
    return <Markbox {...args} marked mark={<Checkmark />} />;
  },
  args: {
    className: 'test',
    style: { width: '32px', height: '32px' },
    id: 'markbox-test',
    nativeProps: { 'data-test': 'true' },
    tabIndex: 0
  }
};

BasePropsStory.storyName = 'Base Props';
