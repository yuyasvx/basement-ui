import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useRef } from 'react';
import { AnimationTrigger } from '../../enums/AnimationTrigger';
import { type AnimationPendingHookProps, useAnimationPending } from './AnimationPendingHook';
import './AnimationPendingHook.stories.test.css';

export default {
  title: 'Hook/Animation Pending',
  argTypes: {
    animated: {
      options: Object.values(AnimationTrigger),
      control: { type: 'select' },
    },
  },
} satisfies Meta;

export const Story: StoryObj<AnimationPendingHookProps<HTMLDivElement>> = {
  render(args) {
    const ref = useRef(null);
    const { show } = useAnimationPending({ show: args.show, ref, animated: args.animated, duration: args.duration });
    return show ? (
      <div ref={ref} className={'bmui-animation-pending-hook-test'}>
        Hello World<span>child element</span>
      </div>
    ) : (
      <></>
    );
  },
  args: {
    show: true,
    animated: AnimationTrigger.BOTH,
    duration: 1000,
  },
};

export const StoryEvent: StoryObj<AnimationPendingHookProps<HTMLDivElement>> = {
  render(args) {
    const ref = useRef(null);
    const openEvent = useCallback(() => {
      alert('開きました');
    }, []);
    const closeEvent = useCallback(() => {
      alert('閉じました');
    }, []);

    const { show } = useAnimationPending({
      show: args.show,
      ref,
      animated: args.animated,
      duration: args.duration,
      onVisible: openEvent,
      onHidden: closeEvent,
    });
    return show ? (
      <div ref={ref} className={'bmui-animation-pending-hook-test'}>
        Hello World<span>child element</span>
      </div>
    ) : (
      <></>
    );
  },
  name: '開く・閉じるイベントが作動すること',
  args: {
    show: true,
    animated: AnimationTrigger.BOTH,
    duration: 1000,
  },
};
