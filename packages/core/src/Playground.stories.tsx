import { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'PLAYGROUND',
  argTypes: {
    // appearance: {
    //   options: Object.values(AppearanceType),
    //   control: { type: 'select' }
    // }
  }
} as Meta;

export const Story: StoryObj /* <typeof Checkbox> */ = {
  render: args => {
    return <></>;
  },
  args: {
    // children: 'OK',
    // appearance: AppearanceType.NORMAL,
    // disabled: false,
    // autoTint: false
  }
};
