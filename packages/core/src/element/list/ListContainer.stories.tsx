import { Meta, StoryObj } from '@storybook/react';
import { CSSProperties } from 'react';
import { VariantAdaptable } from '../../style-element/VariantAdaptable';
import { List } from './List';
import { ListContainer, ListContainerProps } from './ListContainer';
import { ListItem } from './ListItem';
import { ListVariantType } from './ListVariantType';

export default {
  title: 'Element/List/List Container',
  argTypes: {
    variant: {
      options: Object.values(ListVariantType),
      control: { type: 'select' },
      description: 'variantを設定'
    },
    listStyle: {
      description: 'Listコンポーネントのスタイルをプレビューします'
    }
  }
} as Meta;

export const Props: StoryObj<
  ListContainerProps & { listStyle: CSSProperties; listItemStyle: CSSProperties } & VariantAdaptable<
      typeof ListVariantType
    >
> = {
  render: (args) => {
    const { listStyle, listItemStyle, ...rest } = args;
    return (
      <>
        <ListContainer header={args.header} footer={args.footer} style={args.style}>
          <List variant={rest.variant} style={{ ...listStyle, ...listItemStyle }}>
            <ListItem>Wi-Fi</ListItem>
            <ListItem>Bluetooth</ListItem>
            <ListItem>ネットワーク</ListItem>
          </List>
        </ListContainer>
        <ListContainer header={args.header} footer={args.footer} style={args.style}>
          <List variant={rest.variant} style={{ ...listStyle, ...listItemStyle }}>
            <ListItem>通知</ListItem>
            <ListItem>サウンド</ListItem>
            <ListItem>通知センター</ListItem>
          </List>
        </ListContainer>
      </>
    );
  },
  args: {
    variant: ListVariantType.NORMAL,
    children: 'value',
    header: '',
    footer: '',
    style: {
      '--bm-list-header-padding-top': '0px',
      '--bm-list-header-padding-right': '0px',
      '--bm-list-header-padding-bottom': '0px',
      '--bm-list-header-padding-left': '0px',
      '--bm-list-footer-padding-top': '0px',
      '--bm-list-footer-padding-right': '0px',
      '--bm-list-footer-padding-bottom': '0px',
      '--bm-list-footer-padding-left': '0px'
    } as CSSProperties,
    listItemStyle: {
      '--bm-list-item-radius': '5px',
      '--bm-list-item-gap': '5px',
      '--bm-list-item-padding-tb': '5px',
      '--bm-list-item-padding-lr': '5px',
      '--bm-list-item-indicator-width': '5px',
      '--bm-list-item-indicator-height': '15px'
    } as CSSProperties,
    listStyle: {
      '--bm-list-padding-tb': '5px',
      '--bm-list-padding-lr': '5px',
      '--bm-list-radius': '6px'
    } as CSSProperties
  }
};
