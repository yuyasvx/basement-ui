import type { Meta, StoryObj } from '@storybook/react';
import { ScrollableView } from './ScrollableView';

export default {
  title: 'Component/Scroll Bar Test',
  argTypes: {
    // horizontalAlign: {
    //   control: { type: 'select' },
    //   options: Object.values(PopupAlignmentType),
    // },
    // verticalAlign: {
    //   control: { type: 'select' },
    //   options: Object.values(PopupAlignmentType),
    // },
    // zIndex: {
    //   control: { type: 'number' },
    // },
  },
} satisfies Meta;

export const Story: StoryObj = {
  render() {
    return (
      <ScrollableView
        style={{
          width: '200px', // ユーザが指定可能
          height: '200px', // ユーザが指定可能
        }}
      >
        <div style={{ width: '200px', height: '600px', background: '#efefef' }}>
          吾<br />輩<br />は<br />猫<br />で<br />あ<br />る
        </div>
      </ScrollableView>
    );
  },
  name: 'Props',
  args: {},
};
