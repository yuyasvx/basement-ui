import { Meta, StoryObj } from '@storybook/react';
import { MouseEvent } from 'react';
import { ListItem, ListItemSeparator } from '../../element/list/ListItem';
import { MenuList, SubmenuList } from './MenuList';
import { MenuListItem } from './MenuListItem';
import { MenuSelectionStoryContent } from './stories/MenuSelectionStory';

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

function itemHandler(evt: MouseEvent<HTMLButtonElement> | CustomEvent) {
  if (evt.target == null) {
    return;
  }
  alert(`${(evt.target as HTMLElement).innerText}を決定しました`);
}

function selectHandler(itemName?: string) {
  alert(`${itemName}を決定しました`);
}

export const Story: StoryObj<typeof MenuList> = {
  render: args => {
    return (
      <>
        <div
          style={{
            position: 'absolute',
            left: '120px',
            top: '80px',
            width: '300px',
            height: '300px',
            backgroundImage: 'linear-gradient(90deg, #eeaaaa, #7777cc)'
          }}
        ></div>
        <MenuList lockWaitDuration={1000} onSelect={selectHandler}>
          <MenuListItem secondary={'⌘ O'} disabled>
            開く
          </MenuListItem>
          <MenuListItem
            secondary={'⌘ ←'}
            submenu={
              <SubmenuList>
                <MenuListItem icon={'🖼️'} handler={itemHandler}>
                  項目1.app
                </MenuListItem>
                <ListItemSeparator />
                <MenuListItem icon={'🔸'} handler={itemHandler}>
                  項目2.app
                </MenuListItem>
                <MenuListItem icon={'⭐️'} handler={itemHandler}>
                  項目3.app
                </MenuListItem>
                <MenuListItem icon={'🟦'} handler={itemHandler}>
                  項目4.app
                </MenuListItem>
                <MenuListItem icon={'⛅️'} handler={itemHandler}>
                  項目5.app
                </MenuListItem>
                <ListItemSeparator />
                <MenuListItem name={'item-app-store'}>App Store…</MenuListItem>
                <MenuListItem>その他…</MenuListItem>
              </SubmenuList>
            }
          >
            このアプリケーションで開く
          </MenuListItem>
          <ListItemSeparator />
          <MenuListItem name={'trash'}>ゴミ箱に入れる</MenuListItem>
          <ListItemSeparator />
          <MenuListItem>情報を見る</MenuListItem>
          <MenuListItem>名前を変更</MenuListItem>
          <MenuListItem>ファイルを圧縮</MenuListItem>
          <MenuListItem>複製</MenuListItem>
          <MenuListItem>エイリアスを作成</MenuListItem>
          <MenuListItem>クイックルック</MenuListItem>
          <ListItemSeparator />
          <MenuListItem>コピー</MenuListItem>
          <MenuListItem>共有…</MenuListItem>
          <ListItemSeparator />
          <ListItem>
            <div style={{ width: '100%', height: '60px', background: '#C0C0C0' }}></div>
          </ListItem>
          <ListItemSeparator />
          <MenuListItem
            submenu={
              <SubmenuList>
                <MenuListItem>サブメニュー1</MenuListItem>
                <MenuListItem>サブメニュー2</MenuListItem>
                <MenuListItem>サブメニュー3</MenuListItem>
              </SubmenuList>
            }
          >
            クイックアクション
          </MenuListItem>
          <ListItemSeparator />
          <MenuListItem
            submenu={
              <SubmenuList>
                <MenuListItem
                  submenu={
                    <SubmenuList>
                      <MenuListItem>サブメニュー1</MenuListItem>
                      <MenuListItem>サブメニュー2</MenuListItem>
                      <MenuListItem>サブメニュー3</MenuListItem>
                    </SubmenuList>
                  }
                >
                  サブメニュー1
                </MenuListItem>
                <MenuListItem>サブメニュー2</MenuListItem>
                <MenuListItem>サブメニュー3</MenuListItem>
              </SubmenuList>
            }
          >
            サービス
          </MenuListItem>
          <MenuListItem>メニューにフォーカスが当たっている状態で</MenuListItem>
          <MenuListItem>上下キーを押下すると操作できます</MenuListItem>
        </MenuList>
      </>
    );
  },
  args: {},
  name: '単体'
};

export const MenuSelectionStory: StoryObj = {
  render: args => {
    return <MenuSelectionStoryContent />;
  },
  args: {},
  name: '選択可能なメニューの実装'
};
