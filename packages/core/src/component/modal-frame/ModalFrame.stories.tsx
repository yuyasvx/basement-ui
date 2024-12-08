import type { Meta, StoryObj } from '@storybook/react';
import { ModalFrame } from './ModalFrame';

export default {
  title: 'Modal Frame',
  argTypes: {
    // animated: {
    //   options: Object.values(AnimationTrigger),
    //   control: { type: 'select' },
    // },
    // iconPosition: {
    //   options: ['left', 'right'],
    //   control: { type: 'select' }
    // }
  },
} satisfies Meta;

export const Story: StoryObj = {
  render() {
    return <ModalFrame show>Hello World</ModalFrame>;
  },
  name: 'Modal Frame Story',
};
