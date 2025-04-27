import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardVariant } from './Card';

export const Story: StoryObj<{
  shadowWidth?: number;
  shadowStrength?: number;
  shadowColor?: string;
  baseColor?: string;
  alpha?: number;
  blur?: number;
  radius?: number;
}> = {
  render({ alpha, baseColor, blur, radius, shadowColor, shadowStrength, shadowWidth }) {
    return (
      <Card
        variantOption={{ shadowWidth, shadowStrength, shadowColor }}
        baseColor={baseColor}
        backgroundAlpha={alpha}
        backdropBlur={blur}
        radius={radius}
      >
        <div style={{ padding: '20px', width: '100px', height: '100px' }}>こんにちは</div>
      </Card>
    );
  },
  name: 'Props (Variant: shadow)',
  args: {
    shadowWidth: undefined,
    shadowStrength: undefined,
    shadowColor: undefined,
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
  render({ alpha, baseColor, blur, borderColor, borderWidth, radius }) {
    return (
      <Card
        variantOption={{ borderWidth, borderColor }}
        baseColor={baseColor}
        backgroundAlpha={alpha}
        backdropBlur={blur}
        variant={CardVariant.BORDER}
        radius={radius}
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
    shadowStrength: {
      control: {
        type: 'number',
      },
    },
    shadowColor: {
      control: {
        type: 'color',
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
