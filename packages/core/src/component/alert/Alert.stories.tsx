/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../form-items/button/Button';
import { useCardStyle } from '../../style-element/card/Card';
import { Alert, AlertContentLayout } from './Alert';

import { VariantType } from '../../style-element/VariantType';
// import { Checkbox } from './Checkbox';

export default {
  title: 'Component/Alert',
  argTypes: {
    layout: {
      options: Object.values(AlertContentLayout),
      control: { type: 'select' }
    },
    iconPosition: {
      options: ['left', 'right'],
      control: { type: 'select' }
    }
  }
} as Meta;

export const Story: StoryObj<typeof Alert> = {
  render: (args) => {
    const { className } = useCardStyle({ blur: 0, background: 3, shadow: 0 });
    return (
      <>
        <div className={className} style={{ width: '400px' }}>
          <Alert
            centered={args.centered}
            layout={args.layout}
            title={args.title}
            iconPosition={args.iconPosition}
            icon={<div style={{ width: '48px', height: '48px', backgroundColor: '#c0c0c0' }}>icon</div>}
          >
            {args.children}
          </Alert>
        </div>
        <div style={{ width: '20px', height: '20px' }}></div>
        <div className={className}>
          <Alert centered={args.centered} layout={args.layout} title={args.title} iconPosition={args.iconPosition}>
            {args.children}
          </Alert>
        </div>
        <div style={{ width: '20px', height: '20px' }}></div>
        <div className={className} style={{ width: '400px' }}>
          <Alert
            centered={args.centered}
            layout={args.layout}
            iconPosition={args.iconPosition}
            icon={<div style={{ width: '64px', height: '64px', backgroundColor: '#c0c0c0' }}>icon</div>}
          >
            {args.children}
          </Alert>
        </div>
        <div style={{ width: '20px', height: '20px' }}></div>
        <div style={{ width: '20px', height: '20px' }}></div>
        <div className={className} style={{ display: 'inline-block' }}>
          <Alert
            style={{ width: '500px', height: '300px' }}
            iconPosition={args.iconPosition}
            centered={args.centered}
            layout={args.layout}
            title={'長〜いタイトルです'}
            icon={<div style={{ width: '48px', height: '48px', backgroundColor: '#c0c0c0' }}>icon</div>}
            footer={
              <>
                <Button variant={VariantType.TINT} style={{ width: '100px' }}>
                  了解
                </Button>
              </>
            }
          >
            ああああ
          </Alert>
        </div>
      </>
    );
  },
  args: {
    title: 'タイトル',
    children: '詳細です。',
    layout: AlertContentLayout.HORIZONTAL,
    centered: false,
    iconPosition: 'left'
  }
};

export const MouseEventStory: StoryObj<typeof Alert> = {
  render: () => {
    return (
      <>
        <Alert title={'あああ'} onClick={() => alert('クリックしました')}>
          こんにちは
        </Alert>
      </>
    );
  },
  args: {},
  name: 'マウスイベントのテスト'
};
