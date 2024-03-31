import { Meta, StoryObj } from '@storybook/react';
import { CSSProperties } from 'react';
import { List, ListProps } from './List';
import { ListContainer } from './ListContainer';
import { ListItem, ListItemProps } from './ListItem';

export default {
  title: 'Element/List',
  argTypes: {
    // appearance: {
    //   options: ['plain', 'bordered', 'table'],
    //   control: { type: 'select' }
    // }
  }
} as Meta;

type ArgsType = ListProps & ListItemProps<HTMLElement>;

export const StorySticky: StoryObj<ArgsType> = {
  render: () => {
    return (
      <>
        <ListContainer
          header="ヘッダー付き(固定あり)"
          style={
            {
              '--bm-list-header-padding-top': '10px',
              '--bm-list-header-padding-left': '10px',
              '--bm-list-header-padding-right': '10px',
              '--bm-list-header-padding-bottom': '5px',
              '--bm-list-radius': '5px'
            } as CSSProperties
          }
          stickyHeader
        >
          <List
            style={
              {
                '--bm-list-item-padding-tb': '10px',
                '--bm-list-item-padding-lr': '10px',
                '--bm-list-item-radius': '6px',
                '--bm-list-item-indicator-width': '16px',
                '--bm-list-item-indicator-height': '16px',
                '--bm-list-item-gap': '5px',
                '--bm-list-radius': '10px',
                '--bm-list-border-width': '5px'
              } as CSSProperties
            }
          >
            <ListItem>あ</ListItem>
            <ListItem>い</ListItem>
            <ListItem>う</ListItem>
            <ListItem>え</ListItem>
            <ListItem>お</ListItem>
            <ListItem>あ</ListItem>
            <ListItem>い</ListItem>
            <ListItem>う</ListItem>
            <ListItem>え</ListItem>
            <ListItem>お</ListItem>
            <ListItem>あ</ListItem>
            <ListItem>い</ListItem>
            <ListItem>う</ListItem>
            <ListItem>え</ListItem>
            <ListItem>お</ListItem>
          </List>
        </ListContainer>
      </>
    );
  },
  args: {
    // disabled: false,
    // showIndicator: false,
    // focusable: false,
    // appearance: 'plain'
  }
};

StorySticky.storyName = 'Stickyなリストのテスト';
