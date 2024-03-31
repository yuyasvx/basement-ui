import { Meta, StoryObj } from '@storybook/react';
import { ScreenLock, ScreenLockProps } from './ScreenLock';

// TODO 出来具合がわからないのでコミットはしたが後で確認
export default {
  title: 'Element/Screen Lock',
  argTypes: {
    // layout: {
    //   options: Object.values(AlertContentLayout),
    //   control: { type: 'select' }
    // },
    // iconPosition: {
    //   options: ['left', 'right'],
    //   control: { type: 'select' }
    // }
  }
} as Meta;

type ScrollLockStoryType = ScreenLockProps & { show: boolean };
export const Story: StoryObj<ScrollLockStoryType> = {
  render: (args) => {
    const { show, ...restArgs } = args;
    return (
      <>
        <div style={{ width: '100vw', height: '2000px', backgroundColor: '#CFCFCF' }}>テスト</div>
        {show && <ScreenLock {...restArgs}>画面を覆っています</ScreenLock>}
      </>
    );
  },
  args: {
    scrollLock: false,
    className: 'example-class',
    fixed: true,
    show: true
  },
  name: '単体'
};
