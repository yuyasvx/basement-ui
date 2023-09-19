import { Meta, StoryObj } from '@storybook/react';
import { CSSProperties } from 'react';
import { BasementUIProvider } from '../../context/BasementUIContext';
import { Button } from '../../form-items/button/Button';
import { Tooltip, TooltipPosition, TooltipSourceDisplayMode } from './Tooltip';

export default {
  title: 'Component/Tooltip',
  argTypes: {
    position: {
      options: [undefined, ...Object.values(TooltipPosition)],
      control: { type: 'select' }
    },
    // origin: {
    //   options: [undefined, ...Object.values(TooltipOrigin)],
    //   control: { type: 'select' }
    // },
    displayAs: {
      options: [undefined, ...Object.values(TooltipSourceDisplayMode)],
      control: { type: 'inline-radio' }
    }
    // background: {
    //   options: [0, 1, 2, 3, 4],
    //   control: { type: 'select' }
    // },
    // blur: {
    //   options: [0, 1],
    //   control: { type: 'select' }
    // }
  }
} as Meta;

export const Story: StoryObj<typeof Tooltip> = {
  render: args => {
    return (
      <BasementUIProvider>
        <Tooltip
          content={args.content}
          displayAs={'inline-block'}
          showDelay={args.showDelay}
          hideDelay={args.hideDelay}
          position={args.position}
          offset={args.offset}
          enableCardStyle={args.enableCardStyle}
        >
          ここにマウスカーソルを当てると、説明が表示されます その1
        </Tooltip>
        <br />
        <Tooltip
          content={'スタイルの調整も行えます'}
          displayAs={'inline-block'}
          showDelay={args.showDelay}
          hideDelay={args.hideDelay}
          position={args.position}
          offset={args.offset}
          tooltipStyle={{ '--bm-card-radius': '10px', '--bm-content-padding': '20px' } as CSSProperties}
          className={'test'}
          tooltipClassName={'test-2'}
          enableCardStyle={args.enableCardStyle}
        >
          ここにマウスカーソルを当てると、説明が表示されます その2
        </Tooltip>
        <br />
        <Tooltip
          content={<img src="/home-icon.svg" alt="home" style={{ width: '40px', height: '40px' }} />}
          displayAs={'block'}
          showDelay={args.showDelay}
          hideDelay={args.hideDelay}
          position={args.position}
          offset={args.offset}
          style={{ width: '500px', height: '800px', background: '#CFCFCF' }}
          enableCardStyle={args.enableCardStyle}
        >
          ここにマウスカーソルを当てると、説明が表示されます その3
        </Tooltip>
        <Tooltip content={'ボタンの説明です。'} enableCardStyle={args.enableCardStyle}>
          <Button>ボタンの説明</Button>
        </Tooltip>
      </BasementUIProvider>
    );
  },
  args: {
    content: 'ツールチップの文言',
    position: TooltipPosition.AUTO,
    displayAs: TooltipSourceDisplayMode.INLINE_BLOCK,
    showDelay: 500,
    hideDelay: 500,
    // origin: TooltipOrigin.CURSOR,
    // show: undefined
    offset: 8,
    enableCardStyle: true
  }
};

Story.storyName = '単体';
