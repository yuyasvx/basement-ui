import { Meta, StoryObj } from '@storybook/react';
import { ListItemSeparator } from '../../element/list/ListItem';
import { MenuList, SubmenuList } from './MenuList';
import { MenuListItem } from './MenuListItem';

export default {
  title: 'Component/Menu List',
  argTypes: {
    // layout: {
    //   options: Object.values(AlertContentLayout),
    //   control: { type: 'select' }
    // },
    // iconPosition: {
    //   options: ['left', 'right'],
    //   control: { type: 'select' }
    // }
  }
} as Meta;

export const Story: StoryObj<typeof MenuList> = {
  render: args => {
    return (
      <>
        <MenuList style={{ position: 'absolute', left: '40px', top: '50px' }}>
          <MenuListItem secondary={'⌘ ←'} onExec={() => alert('決定されました')}>
            戻る
          </MenuListItem>
          <MenuListItem disabled>ページを再読み込み</MenuListItem>
          <ListItemSeparator />
          <MenuListItem>ページのソースを表示</MenuListItem>
          <MenuListItem>ページを別名で保存…</MenuListItem>
          <MenuListItem>ページをプリント…</MenuListItem>
          <ListItemSeparator />
          <MenuListItem>要素の詳細を表示</MenuListItem>
          <MenuListItem
            submenu={
              <SubmenuList>
                <MenuListItem>項目1</MenuListItem>
                <MenuListItem>項目2</MenuListItem>
                <MenuListItem>項目3</MenuListItem>
                <MenuListItem>項目4</MenuListItem>
                <MenuListItem>項目5</MenuListItem>
              </SubmenuList>
            }
          >
            その他
          </MenuListItem>
        </MenuList>
      </>
    );
  },
  args: {}
};

Story.name = '単体';
