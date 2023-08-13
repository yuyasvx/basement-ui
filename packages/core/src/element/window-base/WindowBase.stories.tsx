import { Meta, StoryObj } from '@storybook/react';
import { WindowBase } from './WindowBase';

export default {
  title: 'Element/Window Base',
  argTypes: {
    backgroundLevel: {
      options: [0, 1, 2, 3, 4],
      control: { type: 'select' }
    },
    shadowLevel: {
      options: [0, 1, 2, 3, 4],
      control: { type: 'select' }
    },
    blurLevel: {
      options: [0, 1],
      control: { type: 'select' }
    }
  }
} as Meta;

export const Story: StoryObj<typeof WindowBase> = {
  render: args => {
    return (
      <div style={{ position: 'relative' }}>
        <img src="/backg.png" alt="home" style={{ position: 'absolute', top: '0px', background: '#404040' }} />
        <WindowBase
          style={{ position: 'absolute', top: '80px', left: '80px', width: '400px', height: '240px' }}
          {...args}
        ></WindowBase>
      </div>
    );
  },
  args: {
    backgroundLevel: 1,
    shadowLevel: 1,
    blurLevel: 0
  }
};

Story.storyName = '単体';
