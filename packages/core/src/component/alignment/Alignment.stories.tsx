import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../card/Card';
import { Alignment, type AlignmentProps } from './Alignment';
import { AlignmentType } from './AlignmentType';

export default {
  title: 'Component/Alignment',
  argTypes: {
    horizontalAlign: {
      control: { type: 'select' },
      options: Object.values(AlignmentType),
    },
    verticalAlign: {
      control: { type: 'select' },
      options: Object.values(AlignmentType),
    },
  },
} satisfies Meta;

export const Story: StoryObj<AlignmentProps> = {
  render(args) {
    return (
      <Alignment {...args}>
        <Card style={{ width: '400px', height: '300px' }}>カードです</Card>
      </Alignment>
    );
  },
  name: 'Props',
  args: {
    horizontalAlign: 'center',
    verticalAlign: 'center',
  },
};
