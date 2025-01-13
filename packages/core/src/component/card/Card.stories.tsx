import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardVariant } from './Card';

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
    radius: {
      control: {
        type: 'number',
      },
    },
  },
} satisfies Meta;

export const Story: StoryObj<{
  shadowWidth?: number;
  baseColor?: string;
  alpha?: number;
  blur?: number;
  radius?: number;
}> = {
  render(args) {
    return (
      <Card
        variantOption={{ shadow: args.shadowWidth }}
        baseColor={args.baseColor}
        backgroundAlpha={args.alpha}
        backdropBlur={args.blur}
        radius={args.radius}
      >
        <div style={{ padding: '20px', width: '100px', height: '100px' }}>こんにちは</div>
      </Card>
    );
  },
  name: 'Props (Variant: shadow)',
  args: {
    shadowWidth: undefined,
    baseColor: undefined,
    alpha: undefined,
    blur: undefined,
    radius: undefined,
  },
};

export const StoryBordered: StoryObj<{
  borderWidth?: number;
  baseColor?: string;
  alpha?: number;
  blur?: number;
  borderColor?: string;
  radius?: number;
}> = {
  render(args) {
    return (
      <Card
        variantOption={{ borderWidth: args.borderWidth, borderColor: args.borderColor }}
        baseColor={args.baseColor}
        backgroundAlpha={args.alpha}
        backdropBlur={args.blur}
        variant={CardVariant.BORDER}
        radius={args.radius}
      >
        <div style={{ padding: '20px', width: '100px', height: '100px' }}>こんにちは</div>
      </Card>
    );
  },
  name: 'Props (Variant: border)',
  args: {
    borderWidth: undefined,
    borderColor: undefined,
    baseColor: undefined,
    alpha: undefined,
    blur: undefined,
    radius: undefined,
  },
};

export const StoryMouseEvent: StoryObj = {
  render() {
    return (
      <Card onClick={() => alert('クリックされました')}>
        <div style={{ padding: '20px', width: '100px', height: '100px' }}>こんにちは</div>
      </Card>
    );
  },
  name: 'Card Propsは何も指定しないが、標準の属性を渡したとき、反映される',
  args: {},
};
