/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from '@storybook/react';
import { WindowBase } from '../../element/window-base/WindowBase';
import { Button } from '../../form-items/button/Button';
import { AppearanceType } from '../../domain/AppearanceType';
import { Alert, AlertContentLayout } from './Alert';
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
  render: args => {
    return (
      <>
        <WindowBase shadowLevel={1} backgroundLevel={4} style={{ width: '400px' }}>
          <Alert
            centered={args.centered}
            layout={args.layout}
            title={args.title}
            iconPosition={args.iconPosition}
            icon={<div style={{ width: '48px', height: '48px', backgroundColor: '#c0c0c0' }}>icon</div>}
          >
            {args.children}
          </Alert>
        </WindowBase>
        <div style={{ width: '20px', height: '20px' }}></div>
        <WindowBase shadowLevel={1} backgroundLevel={4}>
          <Alert centered={args.centered} layout={args.layout} title={args.title} iconPosition={args.iconPosition}>
            {args.children}
          </Alert>
        </WindowBase>
        <div style={{ width: '20px', height: '20px' }}></div>
        <WindowBase shadowLevel={1} backgroundLevel={4} style={{ width: '400px' }}>
          <Alert
            centered={args.centered}
            layout={args.layout}
            iconPosition={args.iconPosition}
            icon={<div style={{ width: '64px', height: '64px', backgroundColor: '#c0c0c0' }}>icon</div>}
          >
            {args.children}
          </Alert>
        </WindowBase>
        <div style={{ width: '20px', height: '20px' }}></div>
        {/* <WindowBase */}
        {/*  shadowLevel={1} */}
        {/*  backgroundLevel={4} */}
        {/*  style={ */}
        {/*    { */}
        {/*      width: '500px', */}
        {/*      '--bm-tint-rgb': '158, 233, 0', */}
        {/*      '--bm-tint-dim-rgb': '137, 202, 0', */}
        {/*      '--bm-foreground-rgb-2': '0,0,0' */}
        {/*    } as CSSProperties */}
        {/*  } */}
        {/* > */}
        {/*  <Alert */}
        {/*    iconPosition={args.iconPosition} */}
        {/*    centered={args.centered} */}
        {/*    layout={args.layout} */}
        {/*    title={ */}
        {/*      '“Dx00401016”の命令が“Dx00000000”のメモリを参照しました。メモリが“read”になることはできませんでした。' */}
        {/*    } */}
        {/*    icon={<div style={{ width: '48px', height: '48px', backgroundColor: '#c0c0c0' }}>icon</div>} */}
        {/*    footer={ */}
        {/*      <> */}
        {/*        <Button appearance={AppearanceType.FLAT}>キャンセル</Button> */}
        {/*        <Button appearance={AppearanceType.TINT}>OK</Button> */}
        {/*      </> */}
        {/*    } */}
        {/*  > */}
        {/*    プログラムを終了するには"OK"をクリックしてください。 */}
        {/*    <br /> */}
        {/*    プログラムをデバッグするには"キャンセル"をクリックしてください。 */}
        {/*    <br /> */}
        {/*    <input type="text" className="bm-a-input-box -focusable bm-text-base bm-base" /> */}
        {/*  </Alert> */}
        {/* </WindowBase> */}
        <div style={{ width: '20px', height: '20px' }}></div>
        <WindowBase shadowLevel={1} backgroundLevel={4} style={{ display: 'inline-block' }}>
          <Alert
            style={{ width: '500px', height: '300px' }}
            iconPosition={args.iconPosition}
            centered={args.centered}
            layout={args.layout}
            title={'長〜いタイトルです'}
            icon={<div style={{ width: '48px', height: '48px', backgroundColor: '#c0c0c0' }}>icon</div>}
            footer={
              <>
                <Button appearance={AppearanceType.TINT} style={{ width: '100px' }}>
                  了解
                </Button>
              </>
            }
          >
            ああああ
          </Alert>
        </WindowBase>
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
  render: args => {
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
