import { Meta, StoryObj } from '@storybook/react';
import { CSSProperties } from 'react';
import { Checkmark } from '../markable/Checkmark';
import { List, ListProps } from './List';
import { ListItem, ListItemButton, ListItemLink, ListItemProps, ListItemSeparator } from './ListItem';
import { ListContainer } from './ListContainer';

export default {
  title: 'Element/List',
  argTypes: {
    appearance: {
      options: ['plain', 'bordered', 'table'],
      control: { type: 'select' }
    }
  }
} as Meta;

type ArgsType = ListProps & ListItemProps<HTMLElement>;

export const Story: StoryObj<ArgsType> = {
  render: args => {
    return (
      <>
        <List
          style={
            {
              '--bm-list-item-padding-tb': '3px',
              '--bm-list-item-padding-lr': '10px',
              '--bm-list-item-radius': '4px',
              '--bm-list-item-indicator-width': '16px',
              '--bm-list-item-indicator-height': '16px',
              '--bm-list-item-gap': '5px',
              '--bm-list-radius': '10px'
            } as CSSProperties
          }
          appearance={args.appearance}
        >
          <ListItem
            disabled={args.disabled}
            status="normal"
            focusable={args.focusable}
            showIndicator={args.showIndicator}
          >
            通常のリストアイテム
          </ListItem>
          <ListItem
            disabled={args.disabled}
            status="active"
            focusable={args.focusable}
            showIndicator={args.showIndicator}
          >
            通常のリストアイテム
          </ListItem>
          <ListItem
            disabled={args.disabled}
            status="selected"
            focusable={args.focusable}
            showIndicator={args.showIndicator}
          >
            通常のリストアイテム
          </ListItem>
          <ListItem
            disabled={args.disabled}
            focusable={args.focusable}
            showIndicator={args.showIndicator}
            secondary={'補助的な表示'}
          >
            通常のリストアイテム
          </ListItem>
        </List>

        <List
          style={
            {
              '--bm-list-item-padding-tb': '10px',
              '--bm-list-item-padding-lr': '10px',
              '--bm-list-item-radius': '2px',
              '--bm-list-item-indicator-width': '20px',
              '--bm-list-item-indicator-height': '20px',
              '--bm-list-item-gap': '10px'
            } as CSSProperties
          }
          appearance={args.appearance}
        >
          <ListItemButton
            focusable={args.focusable}
            disabled={args.disabled}
            status="normal"
            onClick={() => alert('HELLO1')}
            showIndicator={args.showIndicator}
            indicator={<Checkmark />}
            icon={<>あ</>}
          >
            ボタン形式のリストアイテム
          </ListItemButton>
          <ListItemButton
            focusable={args.focusable}
            disabled={args.disabled}
            status="active"
            onClick={() => alert('HELLO2')}
            showIndicator={args.showIndicator}
            indicator={<Checkmark />}
            icon={<>あ</>}
          >
            ボタン形式のリストアイテム
          </ListItemButton>
          <ListItemButton
            focusable={args.focusable}
            disabled={args.disabled}
            status="selected"
            onClick={() => alert('HELLO3')}
            showIndicator={args.showIndicator}
            indicator={<Checkmark />}
            icon={<>あ</>}
          >
            ボタン形式のリストアイテム
          </ListItemButton>
          <ListItemButton
            focusable={args.focusable}
            disabled={args.disabled}
            onClick={() => alert('HELLO4')}
            showIndicator={args.showIndicator}
            icon={<>あ</>}
          >
            ボタン形式のリストアイテム
          </ListItemButton>
        </List>

        <List
          style={
            {
              '--bm-list-item-padding-tb': '10px',
              '--bm-list-item-padding-lr': '10px',
              '--bm-list-item-radius': '2px',
              '--bm-list-item-indicator-width': '20px',
              '--bm-list-item-indicator-height': '20px',
              '--bm-list-item-gap': '10px',
              '--bm-list-radius': '5px'
            } as CSSProperties
          }
          appearance={args.appearance}
        >
          <ListItemLink
            focusable={args.focusable}
            disabled={args.disabled}
            status="normal"
            href={'/'}
            showIndicator={args.showIndicator}
            icon={<>あ</>}
          >
            リンク形式のリストアイテム
          </ListItemLink>
          <ListItemLink
            focusable={args.focusable}
            disabled={args.disabled}
            status="active"
            href={'/'}
            showIndicator={args.showIndicator}
            icon={<>あ</>}
          >
            リンク形式のリストアイテム
          </ListItemLink>
          <ListItemLink
            focusable={args.focusable}
            disabled={args.disabled}
            status="selected"
            href={'/'}
            showIndicator={args.showIndicator}
            icon={<>あ</>}
          >
            リンク形式のリストアイテム
          </ListItemLink>
          <ListItemLink
            focusable={args.focusable}
            disabled={args.disabled}
            href={'/'}
            showIndicator={args.showIndicator}
            icon={<>あ</>}
          >
            リンク形式のリストアイテム
          </ListItemLink>
        </List>

        <ListContainer
          header="ヘッダー付き"
          footer={'フッターに説明を入れると良いでしょう'}
          style={
            {
              '--bm-list-header-padding-top': '10px',
              '--bm-list-header-padding-left': '10px',
              '--bm-list-header-padding-right': '10px',
              '--bm-list-header-padding-bottom': '5px',
              '--bm-list-radius': '5px'
            } as CSSProperties
          }
        >
          <List
            style={
              {
                '--bm-list-item-padding-tb': '3px',
                '--bm-list-item-padding-lr': '10px',
                '--bm-list-item-radius': '4px',
                '--bm-list-item-indicator-width': '16px',
                '--bm-list-item-indicator-height': '16px',
                '--bm-list-item-gap': '5px',
                '--bm-list-radius': '5px'
              } as CSSProperties
            }
            appearance={args.appearance}
          >
            <ListItem>あ</ListItem>
            <ListItem>い</ListItem>
            <ListItem>う</ListItem>
            <ListItem>え</ListItem>
            <ListItem>お</ListItem>
          </List>
        </ListContainer>

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
            appearance={args.appearance}
          >
            <ListItem>あ</ListItem>
            <ListItem>い</ListItem>
            <ListItem>う</ListItem>
            <ListItem>え</ListItem>
            <ListItemSeparator />
            <ListItem>お</ListItem>
          </List>
        </ListContainer>
      </>
    );
  },
  args: {
    disabled: false,
    showIndicator: false,
    focusable: false,
    appearance: 'plain'
  }
};

Story.storyName = '単体';
