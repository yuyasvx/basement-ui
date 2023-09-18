/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';
import { AppearanceType } from '../../domain/AppearanceType';
import { Checkbox } from './Checkbox';

export default {
  title: 'Form Item/Checkbox',
  argTypes: {
    appearance: {
      options: Object.values(AppearanceType),
      control: { type: 'select' }
    }
  }
} as Meta;

export const Story: StoryObj<typeof Checkbox> = {
  render: args => {
    const [flg, setFlg] = useState(false);
    const onChangeFn = useCallback(() => {
      setFlg(!flg);
    }, [flg]);

    return (
      <>
        <div style={{ display: 'flex', columnGap: '10px' }}>
          <div>
            <Checkbox
              readOnly
              checked={true}
              appearance={args.appearance}
              disabled={args.disabled}
              autoTint={args.autoTint}
              nativeProps={{ 'data-hohoho': true }}
              id={'a'}
            >
              {args.children}
            </Checkbox>
          </div>
          <div>
            <Checkbox
              checked={flg}
              onChange={onChangeFn}
              appearance={args.appearance}
              disabled={args.disabled}
              autoTint={args.autoTint}
            >
              {args.children}
            </Checkbox>
          </div>
          <div>
            <Checkbox
              readOnly
              name={'hogehoge'}
              appearance={args.appearance}
              disabled={args.disabled}
              autoTint={args.autoTint}
            >
              複数行の
              <br />
              チェックボックスです
            </Checkbox>
          </div>
          <div>
            <Checkbox
              readOnly
              appearance={args.appearance}
              disabled={args.disabled}
              autoTint={args.autoTint}
              indeterminate={true}
            >
              未決定
            </Checkbox>
          </div>
        </div>
      </>
    );
  },
  args: {
    children: 'OK',
    appearance: AppearanceType.NORMAL,
    disabled: false,
    autoTint: false
  }
};
