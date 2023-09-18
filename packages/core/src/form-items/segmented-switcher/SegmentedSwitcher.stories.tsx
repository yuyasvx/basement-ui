import { Meta, StoryObj } from '@storybook/react';
import { ChangeEvent, CSSProperties, FC, useCallback, useState } from 'react';
import { AppearanceType } from '../../domain/AppearanceType';
import { SegmentedSwitcher } from './SegmentedSwitcher';
import { SegmentedSwitcherItem } from './SegmentedSwitcherItem';

export default {
  title: 'Form Item/Segmented Switcher',
  argTypes: {
    appearance: {
      options: Object.values(AppearanceType),
      control: { type: 'select' }
    }
  }
} as Meta;

const Preview2: FC = () => {
  const [mode, switchMode] = useState('detail');
  const changeMode = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
    switchMode(evt.target.name);
  }, []);
  return (
    <SegmentedSwitcher
      style={
        {
          '--bm-line-height': '1',
          '--bm-button-padding-tb': '5px'
        } as CSSProperties
      }
    >
      <SegmentedSwitcherItem name={'detail'} selected={mode === 'detail'} onChange={changeMode}>
        詳細
      </SegmentedSwitcherItem>
      <SegmentedSwitcherItem name={'artwork'} selected={mode === 'artwork'} onChange={changeMode}>
        アートワーク
      </SegmentedSwitcherItem>
      <SegmentedSwitcherItem name={'lyrics'} selected={mode === 'lyrics'} onChange={changeMode}>
        歌詞
      </SegmentedSwitcherItem>
      <SegmentedSwitcherItem name={'options'} selected={mode === 'options'} onChange={changeMode}>
        オプション
      </SegmentedSwitcherItem>
      <SegmentedSwitcherItem name={'sort'} selected={mode === 'sort'} onChange={changeMode}>
        読みがな
      </SegmentedSwitcherItem>
      <SegmentedSwitcherItem name={'file'} selected={mode === 'file'} onChange={changeMode}>
        ファイル
      </SegmentedSwitcherItem>
    </SegmentedSwitcher>
  );
};

export const Story: StoryObj<typeof SegmentedSwitcher> = {
  render: args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [val, setVal] = useState('1');
    return (
      <>
        <SegmentedSwitcher tabIndex={1} disabled={args.disabled} animated={args.animated} appearance={args.appearance}>
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
          disabled={args.disabled}
          animated={args.animated}
          appearance={args.appearance}
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
          animated={args.animated}
          appearance={args.appearance}
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
        <SegmentedSwitcher animated={args.animated} appearance={args.appearance}>
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
        <br />
        <br />
        <Preview2 />
      </>
    );
  },
  args: {
    disabled: false,
    animated: true,
    appearance: AppearanceType.NORMAL
  }
};
