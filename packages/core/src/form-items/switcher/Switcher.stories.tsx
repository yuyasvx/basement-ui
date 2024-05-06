/* eslint-disable react-hooks/rules-of-hooks */
import { Meta, StoryObj } from '@storybook/react';
import { CSSProperties, useCallback, useState } from 'react';
import { List } from '../../element/list/List';
import { ListItem } from '../../element/list/ListItem';
import { Switcher } from './Switcher';

export default {
  title: 'Form Item/Switcher',
  argTypes: {}
} as Meta;

export const Story: StoryObj<typeof Switcher> = {
  render: (args) => {
    const [state, setState] = useState({ a: true } as Record<string, boolean>);

    const evtHandler = useCallback(
      (evt: React.ChangeEvent<HTMLInputElement>) => {
        state[evt.target.name] = !state[evt.target.name];
        setState({ ...state });
      },
      [state]
    );

    return (
      <div>
        <List
          variant={'bordered'}
          style={
            {
              '--bm-list-item-padding-tb': '5px',
              '--bm-list-item-padding-lr': '10px',
              '--bm-list-border-width': '0',
              ...args.style
            } as CSSProperties
          }
        >
          <ListItem status={'normal'}>
            <Switcher name="a" onChange={evtHandler} checked={state.a ?? false} disabled={args.disabled}>
              視差効果を減らす
            </Switcher>
          </ListItem>
          <ListItem status={'normal'}>
            <Switcher name="b" onChange={evtHandler} checked={state.b ?? false} disabled={args.disabled}>
              コントラストを上げる
            </Switcher>
          </ListItem>
          <ListItem status={'normal'}>
            <Switcher name="c" onChange={evtHandler} checked={state.c ?? false} disabled={args.disabled}>
              透明度を下げる
            </Switcher>
          </ListItem>
          <ListItem status={'normal'}>
            <Switcher name="d" onChange={evtHandler} checked={state.d ?? false} disabled={args.disabled}>
              {args.children}
            </Switcher>
          </ListItem>
        </List>
      </div>
    );
  },
  args: {
    children: 'スイッチャーのラベル',
    // variant: VariantType.NORMAL,
    disabled: false,
    // autoTint: false,
    style: {
      '--bm-switcher-width': '20px',
      '--bm-switcher-height': '12px',
      '--bm-switcher-radius': '6px',
      '--bm-switcher-border-width': '1px',
      '--bm-switcher-padding': '2px',
      '--bm-tint-rgb': [0, 102, 255]
    } as CSSProperties
  },
  name: 'Props'
};
