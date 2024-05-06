import { Meta, StoryObj } from '@storybook/react';
import { CSSProperties, PropsWithChildren } from 'react';
import { VariantAdaptable } from '../../style-element/VariantAdaptable';
import { List } from './List';
import { ListItem } from './ListItem';
import { ListItemLink, ListItemLinkProps } from './ListItemLink';
import { ListItemStatus } from './ListItemStatus';
import { ListVariantType } from './ListVariantType';

export default {
  title: 'Element/List/ListItemLink',
  argTypes: {
    effect: {
      options: [undefined, ...Object.values(ListItemStatus)],
      control: { type: 'select' }
    },
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
  PropsWithChildren<ListItemLinkProps> & { listStyle: CSSProperties } & VariantAdaptable<typeof ListVariantType>
> = {
  render: (args) => {
    const { listStyle, ...rest } = args;
    return (
      <List variant={rest.variant} style={listStyle}>
        <ListItem icon={args.icon} style={args.style} status={args.status}>
          これはListItemです。
        </ListItem>
        <ListItemLink {...rest} />
        <ListItemLink {...rest} />
        <ListItemLink {...rest} />
      </List>
    );
  },
  args: {
    variant: ListVariantType.NORMAL,
    icon: 'icon',
    status: ListItemStatus.NORMAL,
    focusable: false,
    hoverable: false,
    disableEvents: false,
    showIndicator: false,
    indicator: 'x',
    secondary: 'secondary value',
    children: 'value',
    href: 'https://www.google.com/',
    style: {
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
