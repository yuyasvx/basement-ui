import { createContext, Dispatch, MutableRefObject, SetStateAction, useCallback, useRef, useState } from 'react';

const execEvent = new CustomEvent('bm-list-item-exec-inner');
const hideSubmenuEvent = new CustomEvent('bm-list-item-hide-submenu-inner');

/**
 * メニューリスト全体のコンテキストを定義および作成します。
 *
 * 下記を制御します
 * - ロックされているかされていないか：ロック中の場合はマウスを動かしてもメニュー項目の選択状態が変化せず、クリックしても
 *   決定しません
 * - キー操作対象のメニューリストを制御：上下キーやスペースキーを押した時にどのメニューを操作するか制御します。基本的には
 *   表示している中で最も階層が深いメニューが操作対象になる
 * - 選択肢を決定した時、しばらくロックする：メニューの表示・非表示はこのコンポーネントのスコープ外だが、
 */
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
  // メニュー項目を決定してから、再び選択操作ができるようになるまでの期間。
  const [lockWait] = useState(lockWaitDuration);
  // propsで渡されたonSelect()関数をしまう入れ物
  const onSelect = useRef(undefined as undefined | ((name?: string) => void));

  return { lockedRef, currentMenuElement, lockWait, onSelect };
}

/**
 * メニュー項目のコンテキストを定義・作成します。
 *
 * このコンテキストでは、メニュー項目に対して下記を制御します：
 * - 次のアイテムを選択する：1つ下のメニュー項目を選択します。次が非活性の場合はスキップ。最後の項目だった場合は何もしない
 * - 前のアイテムを選択する：1つ上のメニュー項目を選択します。次が非活性の場合はスキップ。最初の項目だった場合は何もしない
 * - 選択したアイテムの決定：クリックかスペースキーかEnterキーで発動。非活性ではなくロックされてない時だけ選択イベントが発動する
 * - 選択中のアイテムIDの保持
 * - メニュー項目が属しているメニューリストのRef
 */
export const menuItemContext = createContext({
  next: (): void => undefined,
  prev: (): void => undefined,
  exec: (): void => undefined,
  hideSubmenu: (): void => undefined,
  selectedId: null as string | null,
  setSelectedId: {} as Dispatch<SetStateAction<string | null>>,
  // TODO これ要らないかも
  // submenuHovering: {} as MutableRefObject<boolean>,
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
  // const submenuHovering = useRef(false);
  const menuElement = useRef(null as HTMLUListElement | null);

  return { next, prev, exec, selectedId, setSelectedId, menuElement, hideSubmenu }; // submenuHovering,
}
export type MenuItemContext = ReturnType<typeof useMenuItemContextInitializer>;
