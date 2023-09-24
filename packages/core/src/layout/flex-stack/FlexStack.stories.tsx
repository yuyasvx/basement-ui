import { Meta, StoryObj } from '@storybook/react';
import { CSSProperties } from 'react';
import { Button } from '../../form-items/button/Button';
import { Window } from '../../component/window/Window';
import { RootStyle } from '../../domain/StyleClass';
import { ListContainer } from '../../element/list/ListContainer';
import { List } from '../../element/list/List';
import { ListItem, ListItemSeparator } from '../../element/list/ListItem';
import { FlexStackJustify, FlexStackProps, useFlexStackLayout } from './FlexStack';

export default {
  title: 'Layout Hook/Flex Stack',
  argTypes: {
    justify: {
      options: [undefined, ...Object.values(FlexStackJustify)],
      control: { type: 'select' }
    }
  }
} as Meta;

export const Story: StoryObj<FlexStackProps & { gap: string }> = {
  render: args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { className: flexClassName, itemName: flexItem } = useFlexStackLayout(args);

    return (
      <Window>
        <div className={flexClassName} style={{ height: '80px', '--bm-flex-stack-gap': args.gap } as CSSProperties}>
          <Button className={flexItem} style={{ minWidth: '32px', height: '32px' }}>
            A
          </Button>
          <Button className={flexItem} style={{ minWidth: '32px', height: '40px' }}>
            B
          </Button>
          <Button className={flexItem} style={{ minWidth: '32px', height: '24px' }}>
            C
          </Button>
        </div>
      </Window>
    );
  },
  args: {
    reversed: false,
    inline: false,
    vertical: false,
    justify: undefined,
    gap: '5px'
  }
};

Story.storyName = '単体';

export const ListStory: StoryObj<FlexStackProps> = {
  render: args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { className: flexClassName, itemName: flexItem } = useFlexStackLayout(args);

    return (
      <Window
        background={4}
        shadow={2}
        style={
          {
            width: '300px',
            '--bm-list-item-padding-lr': '6px',
            '--bm-list-item-padding-tb': '6px',
            '--bm-list-separator-margin-lr': '0'
          } as CSSProperties
        }
      >
        <ListContainer>
          <List>
            <ListItem>
              <div className={flexClassName}>
                <span className={flexItem}>コピー</span>
                <img className={flexItem} src="/home-icon.svg" alt="home" style={{ width: '24px', height: 'auto' }} />
              </div>
            </ListItem>
            <ListItem status="active">
              <div className={flexClassName}>
                <span className={flexItem}>カット</span>
                <img className={flexItem} src="/home-icon.svg" alt="home" style={{ width: '24px', height: 'auto' }} />
              </div>
            </ListItem>
            <ListItem disabled>
              <div className={flexClassName}>
                <span className={flexItem}>ペースト</span>
                <img className={flexItem} src="/home-icon.svg" alt="home" style={{ width: '24px', height: 'auto' }} />
              </div>
            </ListItem>
            <ListItemSeparator />
            <ListItem>
              <div className={flexClassName}>
                <span className={flexItem}>削除</span>
                <img className={flexItem} src="/home-icon.svg" alt="home" style={{ width: '24px', height: 'auto' }} />
              </div>
            </ListItem>
          </List>
        </ListContainer>
      </Window>
    );
  },
  args: {
    reversed: false,
    inline: false,
    vertical: false,
    justify: 'space-between'
  }
};

ListStory.storyName = 'リストアイテムに利用';
