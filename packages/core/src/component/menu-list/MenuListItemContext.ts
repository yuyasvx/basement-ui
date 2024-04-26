import { createContext, useRef, useState } from 'react';
import { submenuEventHub } from './SubmenuEventHub';
import { MenuListItemId } from './value/MenuListItemId';

const execEvent = new CustomEvent('bm-list-item-exec-inner');
// const hideSubmenuEvent = new CustomEvent('bm-list-item-hide-submenu-inner');

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
export const menuItemContext = createContext({} as MenuItemContext);
export function useMenuItemContextInitializer() {
  const eventHub = useRef(submenuEventHub());
  const [selectedId, setSelectedId] = useState(null as MenuListItemId | null);

  // TODO selectedIdが更新されるたびにこの関数が呼ばれ、submenuEventHub()も一旦呼ばれる（useRefは効いているので問題は顕在化しない）という気持ち悪い挙動になっている
  return {
    selectedId,
    setSelectedId,
    submenuEventHub: eventHub
  };
}
export type MenuItemContext = ReturnType<typeof useMenuItemContextInitializer>;
