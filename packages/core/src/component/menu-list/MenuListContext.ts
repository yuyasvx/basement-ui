import { createContext, Dispatch, MutableRefObject, SetStateAction, useCallback, useRef, useState } from 'react';

const execEvent = new CustomEvent('bm-list-item-exec-inner');
const hideSubmenuEvent = new CustomEvent('bm-list-item-hide-submenu-inner');

export const menuListContext = createContext({
  lockedRef: {} as MutableRefObject<boolean>,
  currentMenuElement: {} as MutableRefObject<HTMLUListElement | null>,
  lockWait: 0,
  onSelect: {} as MutableRefObject<((name?: string) => void) | undefined>
});

export function useMenuListContextInitializer(lockWaitDuration = 0) {
  // 選択操作ができる状態か
  const lockedRef = useRef(false);
  // 現在選択対象のメニュー自体のRef
  const currentMenuElement = useRef(null as HTMLUListElement | null);

  const [lockWait] = useState(lockWaitDuration);

  const onSelect = useRef(undefined as undefined | ((name?: string) => void));

  return { lockedRef, currentMenuElement, lockWait, onSelect };
}

export const menuItemContext = createContext({
  next: (): void => undefined,
  prev: (): void => undefined,
  exec: (): void => undefined,
  hideSubmenu: (): void => undefined,
  selectedId: null as string | null,
  setSelectedId: {} as Dispatch<SetStateAction<string | null>>,
  submenuHovering: {} as MutableRefObject<boolean>,
  menuElement: {} as MutableRefObject<HTMLUListElement | null>
});

export function useMenuItemContextInitializer(initialSelectedItem: string | null = null) {
  const extractListItems = useCallback(() => {
    const menu = menuElement.current;
    if (menu == null) {
      return null;
    }
    return menu.querySelectorAll<HTMLButtonElement>('[data-bm-menu-item]');
  }, []);

  const getSelectedItemIdx = useCallback((items: NodeListOf<HTMLButtonElement>) => {
    let selectedItemIdx = -1;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.dataset.bmSelected === 'true') {
        selectedItemIdx = i;
        break;
      }
    }

    return selectedItemIdx;
  }, []);

  const next = useCallback(() => {
    const items = extractListItems();
    if (items == null) {
      return;
    }
    const selectedItemIdx = getSelectedItemIdx(items);
    let targetDataName;
    // 次の非活性でない項目を探す
    for (let i = selectedItemIdx + 1; i < items.length; i++) {
      const item = items[i];
      if (!item.disabled) {
        targetDataName = item.dataset.bmMenuItem;
        break;
      }
    }

    if (targetDataName != null) {
      setSelectedId(targetDataName);
    }
  }, [extractListItems, getSelectedItemIdx]);

  const prev = useCallback(() => {
    const items = extractListItems();
    if (items == null) {
      return;
    }

    const selectedItemIdx = getSelectedItemIdx(items);
    let targetDataName;
    // 前の非活性でない項目を探す
    for (let i = (selectedItemIdx === -1 ? items.length : selectedItemIdx) - 1; i >= 0; i--) {
      const item = items[i];
      if (!item.disabled) {
        targetDataName = item.dataset.bmMenuItem;
        break;
      }
    }

    if (targetDataName != null) {
      setSelectedId(targetDataName);
    }
  }, [extractListItems, getSelectedItemIdx]);

  const exec = useCallback(() => {
    const items = extractListItems();
    if (items == null) {
      return;
    }

    const selectedItemIdx = getSelectedItemIdx(items);
    if (selectedItemIdx === -1) {
      return;
    }
    const item = items[selectedItemIdx];
    item.dispatchEvent(execEvent);
  }, [extractListItems, getSelectedItemIdx]);

  const hideSubmenu = useCallback(() => {
    const items = extractListItems();
    if (items == null) {
      return;
    }

    const selectedItemIdx = getSelectedItemIdx(items);
    if (selectedItemIdx === -1) {
      return;
    }
    const item = items[selectedItemIdx];
    item.dispatchEvent(hideSubmenuEvent);
  }, [extractListItems, getSelectedItemIdx]);

  const [selectedId, setSelectedId] = useState(null as string | null);
  const submenuHovering = useRef(false);
  const menuElement = useRef(null as HTMLUListElement | null);

  return { next, prev, exec, selectedId, setSelectedId, submenuHovering, menuElement, hideSubmenu };
}
export type MenuItemContext = ReturnType<typeof useMenuItemContextInitializer>;
