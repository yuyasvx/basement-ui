import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';
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
    const [large, setLarge] = useState(true);
    const [large2, setLarge2] = useState(true);
    const upd = useCallback(() => {
      setLarge(!large);
    }, [large]);
    const upd2 = useCallback(() => {
      setLarge2(!large2);
    }, [large2]);
    return (
      <ScrollableView
        style={{
          width: '200px', // ユーザが指定可能
          height: large2 ? '200px' : '250px', // ユーザが指定可能
          border: '1px solid #000',
        }}
        scrollBarVerticalOffset={'40px'}
      >
        <div style={{ width: '200px', height: large ? '600px' : '220px', background: '#efefef' }}>
          <button onClick={upd}>コンテンツの変化</button>
          <button onClick={upd2}>ScrollableViewのサイズの変化</button>
        </div>
      </ScrollableView>
    );
  },
  name: 'Props',
  args: {},
};
