/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from '@storybook/react';

export default {
  title: 'Form Item/Input',
  argTypes: {
    // variant: {
    //   options: Object.values(VariantType),
    //   control: { type: 'select' }
    // }
  }
} as Meta;

export const Story: StoryObj /* <typeof Checkbox> */ = {
  render: () => {
    return (
      <>
        <input type="text" className="bm-a-input-box -focusable bm-text-base bm-base" />
      </>
    );
  },
  args: {
    // children: 'OK',
    // variant: VariantType.NORMAL,
    // disabled: false,
    // autoTint: false
  }
};
