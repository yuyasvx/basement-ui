import { Meta, StoryObj } from '@storybook/react';
import { CSSProperties } from 'react';
import { List, ListProps } from './List';
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

export const Props: StoryObj<ListProps> = {
  render: (args) => (
    <List {...args}>
      <ListItem>リストアイテム</ListItem>
      <ListItem status={ListItemEffect.SELECTED}>リストアイテム</ListItem>
      <ListItem status={ListItemEffect.ACTIVE}>リストアイテム</ListItem>
      <ListItem status={ListItemEffect.DISABLED}>リストアイテム</ListItem>
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
