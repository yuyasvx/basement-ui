import { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';

export default {
  title: 'Form Item/Progress Bar',
  argTypes: {
    // appearance: {
    //   options: Object.values(AppearanceType),
    //   control: { type: 'select' }
    // }
  }
} as Meta;

export const Story: StoryObj<typeof ProgressBar> = {
  render: args => {
    return (
      <>
        <ProgressBar {...args} />
        <div style={{ width: '20px', height: '20px' }}></div>
        <ProgressBar {...args} style={{ width: '450px' }} />
        <div style={{ width: '20px', height: '20px' }}></div>
        <ProgressBar {...args} style={{ height: '20px' }} />
      </>
    );
  },
  args: {
    value: 10,
    maxValue: 100,
    completed: false,
    indeterminate: false
  }
};
