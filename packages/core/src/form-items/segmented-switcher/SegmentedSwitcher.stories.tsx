import { Meta, StoryObj } from '@storybook/react';
import { CSSProperties, useState } from 'react';
import { SegmentedSwitcher } from './SegmentedSwitcher';
import { SegmentedSwitcherItem } from './SegmentedSwitcherItem';

export default {
  title: 'Form Item/Segmented Switcher',
  argTypes: {
    // appearance: {
    //   options: Object.values(AppearanceType),
    //   control: { type: 'select' }
    // }
  }
} as Meta;

export const Story: StoryObj<typeof SegmentedSwitcher> = {
  render: args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [val, setVal] = useState('1');
    return (
      <>
        <SegmentedSwitcher disabled={args.disabled}>
          <SegmentedSwitcherItem selected={val === '1'} onChange={() => setVal('1')}>
            ABC
          </SegmentedSwitcherItem>
          <SegmentedSwitcherItem selected={val === '2'} onChange={() => setVal('2')}>
            DEFGH
          </SegmentedSwitcherItem>
          <SegmentedSwitcherItem selected={val === '3'} onChange={() => setVal('3')}>
            IJKLMNOP
          </SegmentedSwitcherItem>
        </SegmentedSwitcher>
        <br />
        <br />
        <SegmentedSwitcher
          style={
            {
              '--bm-segmented-switcher-radius': '16px'
            } as CSSProperties
          }
        >
          <SegmentedSwitcherItem selected={val === '1'} onChange={() => setVal('1')}>
            あ
          </SegmentedSwitcherItem>
          <SegmentedSwitcherItem selected={val === '2'} onChange={() => setVal('2')}>
            い
          </SegmentedSwitcherItem>
          <SegmentedSwitcherItem selected={val === '3'} onChange={() => setVal('3')}>
            う
          </SegmentedSwitcherItem>
        </SegmentedSwitcher>
        <br />
        <br />
        <SegmentedSwitcher
          style={
            {
              '--bm-segmented-switcher-radius': '8px',
              '--bm-segmented-switcher-padding': '4px'
            } as CSSProperties
          }
        >
          <SegmentedSwitcherItem selected={val === '1'} onChange={() => setVal('1')}>
            アイテム1
          </SegmentedSwitcherItem>
          <SegmentedSwitcherItem selected={val === '2'} onChange={() => setVal('2')}>
            アイテム2
          </SegmentedSwitcherItem>
          <SegmentedSwitcherItem selected={val === '3'} onChange={() => setVal('3')}>
            アイテム3
          </SegmentedSwitcherItem>
        </SegmentedSwitcher>
        <br />
        <br />
        <SegmentedSwitcher>
          <SegmentedSwitcherItem selected={val === '1'} onChange={() => setVal('1')} disabled>
            部分的に
          </SegmentedSwitcherItem>
          <SegmentedSwitcherItem selected={val === '2'} onChange={() => setVal('2')}>
            非活性です
          </SegmentedSwitcherItem>
          <SegmentedSwitcherItem selected={val === '3'} onChange={() => setVal('3')}>
            アイウエオ
          </SegmentedSwitcherItem>
        </SegmentedSwitcher>
      </>
    );
  },
  args: {
    disabled: false
  }
};
