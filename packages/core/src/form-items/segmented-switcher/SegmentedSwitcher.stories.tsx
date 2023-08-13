import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SegmentedSwitcher, SegmentedSwitcherItem } from './SegmentedSwitcher';

export default {
  title: 'Form Item/Segmented Switcher',
  argTypes: {
    // appearance: {
    //   options: Object.values(AppearanceType),
    //   control: { type: 'select' }
    // }
  }
} as Meta;

export const Story: StoryObj = {
  render: args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [val, setVal] = useState('1');
    return (
      <>
        <SegmentedSwitcher>
          <SegmentedSwitcherItem selected={val === '1'} onClick={() => setVal('1')}>
            ABC
          </SegmentedSwitcherItem>
          <SegmentedSwitcherItem selected={val === '2'} onClick={() => setVal('2')}>
            DEFGH
          </SegmentedSwitcherItem>
          <SegmentedSwitcherItem selected={val === '3'} onClick={() => setVal('3')}>
            IJKLMNOP
          </SegmentedSwitcherItem>
        </SegmentedSwitcher>
        <br />
        <br />
        <SegmentedSwitcher>
          <SegmentedSwitcherItem selected={val === '1'} onClick={() => setVal('1')}>
            あ
          </SegmentedSwitcherItem>
          <SegmentedSwitcherItem selected={val === '2'} onClick={() => setVal('2')}>
            い
          </SegmentedSwitcherItem>
          <SegmentedSwitcherItem selected={val === '3'} onClick={() => setVal('3')}>
            う
          </SegmentedSwitcherItem>
        </SegmentedSwitcher>
      </>
    );
  },
  args: {}
};
