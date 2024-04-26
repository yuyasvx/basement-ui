import { Meta, StoryObj } from '@storybook/react';
import { CSSProperties } from 'react';
import { List, List2Props } from './List';
import { ListItem } from './ListItem';
import { ListItemEffect } from './ListItemEffect';
import { ListVariantType } from './ListVariantType';

export default {
  title: 'Element/List/List',
  argTypes: {
    variant: {
      options: Object.values(ListVariantType),
      control: { type: 'select' }
    }
  }
} as Meta;

export const Props: StoryObj<List2Props> = {
  render: (args) => (
    <List {...args}>
      <ListItem>リストアイテム</ListItem>
      <ListItem effect={ListItemEffect.SELECTED}>リストアイテム</ListItem>
      <ListItem effect={ListItemEffect.ACTIVE}>リストアイテム</ListItem>
      <ListItem effect={ListItemEffect.DISABLED}>リストアイテム</ListItem>
      <ListItem>リストアイテム</ListItem>
      <ListItem>リストアイテム</ListItem>
      <ListItem>リストアイテム</ListItem>
    </List>
  ),
  args: {
    variant: ListVariantType.NORMAL,
    style: {
      '--bm-list-padding-tb': '5px',
      '--bm-list-padding-lr': '5px',
      '--bm-list-radius': '6px',
      '--bm-list-border-width': '1px'
    } as CSSProperties
  }
};
