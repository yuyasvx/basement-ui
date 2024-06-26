import { Meta, StoryObj } from '@storybook/react';
import { VariantType } from '../../style-element/VariantType';
import { BulletMark } from '../markbox/BulletMark';
import { UnionPush, UnionPushPrimary, UnionPushProps, UnionPushSecondary } from './UnionPush';

export default {
  title: 'Element/Union Push',
  argTypes: {
    variant: {
      options: Object.values(VariantType),
      control: { type: 'select' }
    }
  }
} as Meta;

export const Story: StoryObj = {
  render: (args: UnionPushProps) => {
    return (
      <UnionPush variant={args.variant}>
        <UnionPushPrimary>ここに中身</UnionPushPrimary>
        <UnionPushSecondary>
          <div style={{ width: '16px', height: '16px' }}>
            <BulletMark />
          </div>
        </UnionPushSecondary>
      </UnionPush>
    );
  },
  args: {
    variant: VariantType.NORMAL
  }
};
