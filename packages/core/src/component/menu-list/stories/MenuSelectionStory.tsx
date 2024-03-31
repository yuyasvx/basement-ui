import { FC, useCallback, useState } from 'react';
import { Button } from '../../../form-items/button/Button';
import { MenuList } from '../MenuList';
import { MenuListItem } from '../MenuListItem';

export const MenuSelectionStoryContent: FC = () => {
  const [show, setShow] = useState(false);
  const [currentItem, setCurrentItem] = useState('' as string | undefined);
  const showMenu = useCallback(() => {
    setShow(true);
  }, []);
  const selectHandler = useCallback((itemName?: string) => {
    setCurrentItem(itemName);
    setShow(false);
  }, []);

  return (
    <>
      <Button onClick={showMenu}>メニューを表示する</Button>
      <div>選択した項目：{currentItem}</div>
      {show && (
        <MenuList lockWaitDuration={500} onSelect={selectHandler}>
          <MenuListItem name="item-1">アイテム1</MenuListItem>
          <MenuListItem name="item-2">アイテム2</MenuListItem>
          <MenuListItem name="item-3">アイテム3</MenuListItem>
          <MenuListItem name="item-4">アイテム4</MenuListItem>
          <MenuListItem name="item-5">アイテム5</MenuListItem>
        </MenuList>
      )}
    </>
  );
};
