import type { Meta, StoryObj } from '@storybook/react';
import { useCardStyle } from './Card';

export default {
  title: 'Component/Card',
  argTypes: {
    alpha: {
      control: {
        type: 'number',
      },
    },
    blur: {
      control: {
        type: 'number',
      },
    },
    shadowWidth: {
      control: {
        type: 'number',
      },
    },
    borderWidth: {
      control: {
        type: 'number',
      },
    },
    borderColor: {
      control: {
        type: 'color',
      },
    },
    baseColor: {
      control: {
        type: 'color',
      },
    },
  },
} satisfies Meta;

export const Story: StoryObj<{ shadowWidth?: number; baseColor?: string; alpha?: number; blur?: number }> = {
  render(args) {
    const { newProps } = useCardStyle({
      variantOption: { shadow: args.shadowWidth },
      baseColor: args.baseColor,
      backgroundAlpha: args.alpha,
      backdropBlur: args.blur,
    });
    return (
      <div {...newProps}>
        <div style={{ padding: '20px', width: '100px', height: '100px' }}>こんにちは</div>
      </div>
    );
  },
  name: 'Props (Variant: shadow)',
  args: {
    shadowWidth: undefined,
    baseColor: undefined,
    alpha: undefined,
    blur: undefined,
  },
};

export const StoryBordered: StoryObj<{
  borderWidth?: number;
  baseColor?: string;
  alpha?: number;
  blur?: number;
  borderColor?: string;
}> = {
  render(args) {
    const { newProps } = useCardStyle({
      variant: 'border',
      variantOption: { borderWidth: args.borderWidth, borderColor: args.borderColor },
      baseColor: args.baseColor,
      backgroundAlpha: args.alpha,
      backdropBlur: args.blur,
    });
    return (
      <div {...newProps}>
        <div style={{ padding: '20px', width: '100px', height: '100px' }}>こんにちは</div>
      </div>
    );
  },
  name: 'Props (Variant: border)',
  args: {
    borderWidth: undefined,
    borderColor: undefined,
    baseColor: undefined,
    alpha: undefined,
    blur: undefined,
  },
};
