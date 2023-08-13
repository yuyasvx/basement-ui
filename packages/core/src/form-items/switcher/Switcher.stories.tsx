/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from '@storybook/react';
import { CSSProperties, useCallback, useState } from 'react';
import { Switcher } from './Switcher';

export default {
  title: 'Form Item/Switcher',
  argTypes: {
    // appearance: {
    //   options: Object.values(AppearanceType),
    //   control: { type: 'select' }
    // }
  }
} as Meta;

export const Story: StoryObj<typeof Switcher> = {
  render: args => {
    const [markedFlag, setMarkedFlag] = useState(true);
    const clickHandler = useCallback(() => {
      setMarkedFlag(!markedFlag);
    }, [markedFlag]);
    return (
      <>
        <div>
          <Switcher onChange={clickHandler} checked={markedFlag} disabled={args.disabled}>
            {args.children}
          </Switcher>
          <div style={{ width: '20px', height: '20px' }}></div>
          <Switcher
            onChange={clickHandler}
            checked={markedFlag}
            disabled={args.disabled}
            style={
              {
                '--bm-switcher-padding': '4px',
                '--bm-switcher-radius': '8px',
                '--bm-switcher-width': '24px'
              } as CSSProperties
            }
          >
            {args.children}
          </Switcher>
          <div style={{ width: '20px', height: '20px' }}></div>
          <Switcher
            onChange={clickHandler}
            checked={markedFlag}
            disabled={args.disabled}
            style={
              {
                '--bm-switcher-padding': '0px',
                '--bm-switcher-radius': '16px',
                '--bm-switcher-width': '36px',
                '--bm-switcher-height': '20px',
                '--bm-switcher-border-width': '4px'
              } as CSSProperties
            }
          >
            {args.children}
          </Switcher>
          <div style={{ width: '20px', height: '20px' }}></div>
          <Switcher
            onChange={clickHandler}
            checked={markedFlag}
            disabled={args.disabled}
            style={
              {
                '--bm-switcher-padding': '4px',
                '--bm-switcher-radius': '16px',
                '--bm-switcher-width': '40px',
                '--bm-switcher-height': '20px',
                '--bm-switcher-border-width': '1px',
                '--bm-tint-rgb': '232,167,0'
              } as CSSProperties
            }
          >
            {args.children}
          </Switcher>
        </div>
      </>
    );
  },
  args: {
    children: 'スイッチャーのラベル',
    // appearance: AppearanceType.NORMAL,
    disabled: false
    // autoTint: false
  },
  name: 'CSS変数による装飾テスト'
};
