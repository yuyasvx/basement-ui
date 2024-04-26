/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { AppearanceType } from '../../domain/AppearanceType';
import { Radio } from './Radio';

export default {
  title: 'Form Item/Radio',
  argTypes: {
    variant: {
      options: Object.values(AppearanceType),
      control: { type: 'select' }
    }
  }
} as Meta;

export const Story: StoryObj<typeof Radio> = {
  render: (args) => {
    const [select, setSelect] = useState('1');

    return (
      <>
        <div style={{ display: 'flex', columnGap: '10px' }}>
          <div>
            <Radio
              readOnly
              checked={true}
              variant={args.variant}
              disabled={args.disabled}
              autoTint={args.autoTint}
              id={'i-id'}
              nativeProps={{ 'data-aaaa': 123 }}
            >
              {args.children}
            </Radio>
          </div>
          <div>
            <Radio
              variant={args.variant}
              checked={select === '1'}
              onChange={() => setSelect('1')}
              autoTint={args.autoTint}
            >
              選択肢1
            </Radio>
            <Radio
              variant={args.variant}
              checked={select === '2'}
              onChange={() => setSelect('2')}
              autoTint={args.autoTint}
            >
              選択肢2
            </Radio>
            <Radio
              variant={args.variant}
              checked={select === '3'}
              onChange={() => setSelect('3')}
              autoTint={args.autoTint}
            >
              選択肢3
            </Radio>
          </div>
        </div>
      </>
    );
  },
  args: {
    children: 'OK',
    variant: AppearanceType.NORMAL,
    disabled: false,
    autoTint: false
  }
};
