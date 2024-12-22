import type { Meta, StoryObj } from '@storybook/react';
import { type FC, useCallback, useRef } from 'react';
import { TransitionTrigger } from './enums/TransitionTrigger';
import { type TransitionSupportProps, useTransitionSupport } from './TransitionSupportHook';
import './TransitionSupportHook.stories.test.css';

export default {
  title: 'Hook/Transition Support',
  argTypes: {
    enableTransition: {
      options: Object.values(TransitionTrigger),
      control: { type: 'select' },
    },
  },
} satisfies Meta;

const ChildElement: FC = () => <span>Child Element</span>;

export const Story: StoryObj<TransitionSupportProps<HTMLDivElement>> = {
  render(args) {
    const ref = useRef(null);
    const { show } = useTransitionSupport({
      show: args.show,
      ref,
      enableTransition: args.enableTransition,
      duration: args.duration,
    });
    return show ? (
      <div ref={ref} className={'bmui-animation-pending-hook-test'}>
        Hello World
        <ChildElement />
      </div>
    ) : (
      <></>
    );
  },
  args: {
    show: true,
    enableTransition: TransitionTrigger.BOTH,
    duration: 1000,
  },
};

export const StoryEvent: StoryObj<TransitionSupportProps<HTMLDivElement>> = {
  render(args) {
    const ref = useRef(null);
    const openEvent = useCallback(() => {
      alert('開きました');
    }, []);
    const closeEvent = useCallback(() => {
      alert('閉じました');
    }, []);

    const { show } = useTransitionSupport({
      show: args.show,
      ref,
      enableTransition: args.enableTransition,
      duration: args.duration,
      onOpen: openEvent,
      onClose: closeEvent,
    });
    return show ? (
      <div ref={ref} className={'bmui-animation-pending-hook-test'}>
        Hello World
        <ChildElement />
      </div>
    ) : (
      <></>
    );
  },
  name: '開く・閉じるイベントが作動すること',
  args: {
    show: true,
    enableTransition: TransitionTrigger.BOTH,
    duration: 1000,
  },
};

export const StoryAutoDuration: StoryObj<TransitionSupportProps<HTMLDivElement>> = {
  render(args) {
    const ref = useRef(null);
    const openEvent = useCallback(() => {
      alert('開きました');
    }, []);

    const { show } = useTransitionSupport({
      show: args.show,
      ref,
      enableTransition: args.enableTransition,
      duration: 'auto',
      onOpen: openEvent,
    });

    return show ? (
      <div ref={ref} className={'bmui-animation-pending-hook-test2'}>
        Hello World
        <ChildElement />
      </div>
    ) : (
      <></>
    );
  },
  name: 'CSSアニメーションが設定されている場合、トランジション時間＝autoが作用する(Beta)',
  args: {
    show: true,
    enableTransition: TransitionTrigger.BOTH,
  },
};
