import type { Meta, StoryObj } from '@storybook/react';
import { type FC, memo, useCallback } from 'react';
import { Card } from '../card/Card';
import { ModalFrame, type ModalFrameProps } from './ModalFrame';

export const Story: StoryObj<ModalFrameProps> = {
  render(args) {
    const cb = useCallback(() => {
      alert('バックドロップがクリックされました');
    }, []);

    return (
      <>
        <ModalFrame {...args} onBackdropClick={cb}>
          {/* ModalFrameの中身はメモ化させたほうがいい */}
          <Card style={{ width: '500px', height: '250px' }}>表示内容</Card>
        </ModalFrame>
        <button style={{ marginTop: '280px' }}>ボタン</button>
      </>
    );
  },
  name: 'Props',
  args: {
    backdropLock: false,
    enableAlignment: false,
    verticalAlign: 'center',
    horizontalAlign: 'center',
  },
};

const ChildElement: FC = () => <span>Child Element</span>;
const MemorizedTestComponent = memo(() => (
  <div>
    Hello World
    <ChildElement />
  </div>
));

export const StoryMultiple: StoryObj<ModalFrameProps> = {
  render(args) {
    return (
      <>
        <ModalFrame {...args}>
          <MemorizedTestComponent />
        </ModalFrame>
        <ModalFrame {...args}>
          <div style={{ position: 'fixed', left: 100, top: 100 }}>
            Hello World
            <ChildElement />
          </div>
        </ModalFrame>
      </>
    );
  },
  name: '複数個のModalFrameが同居できること',
  args: {
    backdropLock: false,
  },
};

export const StoryScroll: StoryObj<ModalFrameProps> = {
  render() {
    return (
      <div style={{ width: '150px', height: '3000px', background: '#EEE' }}>
        大きい要素
        <ModalFrame backdropLock>
          {/* ModalFrameの中身はメモ化させたほうがいい */}
          <MemorizedTestComponent />
        </ModalFrame>
      </div>
    );
  },
  name: 'スクロールしても表示は固定であること',
  args: {},
};

export const StoryCustomBackdrop: StoryObj<ModalFrameProps> = {
  render(args) {
    return (
      <div style={{ width: '150px', height: '300px', background: '#EEE' }}>
        あいうえお
        <ModalFrame backdropLock={args.backdropLock} backdrop={<div style={{ width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)' }}></div>}>
          {/* ModalFrameの中身はメモ化させたほうがいい */}
          <MemorizedTestComponent />
        </ModalFrame>
      </div>
    );
  },
  name: 'backdropLock＝trueの時、バックドロップに好きなコンポーネントを仕込めること',
  args: {
    backdropLock: true,
  },
};

export default {
  title: 'Component/Modal Frame',
} satisfies Meta;
