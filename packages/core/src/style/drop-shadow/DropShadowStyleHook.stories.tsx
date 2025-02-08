import type { Meta, StoryObj } from '@storybook/react';
import { DropShadowLevelType } from './DropShadowLevelType';
import { type DropShadowStyleProps, useDropShadowStyle } from './DropShadowStyleHook';

export default {
  title: 'Hook/Drop Shadow Style',
  argTypes: {
    shadowWidth: {
      control: { type: 'number' },
    },
    shadowColor: {
      control: { type: 'color' },
    },
    shadowStrength: {
      control: { type: 'number' },
    },
    level: {
      options: Object.values(DropShadowLevelType),
    },
  },
} satisfies Meta;

export const Story: StoryObj<DropShadowStyleProps> = {
  render(args) {
    const { newProps } = useDropShadowStyle(args);
    const { className, style } = newProps;

    return (
      <div style={{ ...style, width: '200px', height: '200px', background: '#EFEFEF' }} className={className}>
        コンテンツ
      </div>
    );
  },
  name: 'Props',
  args: {
    shadowWidth: undefined,
    shadowColor: undefined,
    shadowStrength: undefined,
    level: undefined,
  },
};
