import { ForwardedRef, Ref, RefObject, createContext, useCallback, useRef } from 'react';
import { AnimationTrigger } from '../../domain/AnimationTrigger';
import { Case } from '../../util/Case';
import { MenuListId } from './value/MenuListId';
import { MenuListItemId } from './value/MenuListItemId';

const defaultMenuState = () => ({
  // 画面に表示されているメニューのIDを全て保持する。0番目はRootメニューとなり、インデックス番号が増えるとサブメニューの階層が深くなる
  menuPath: [] as MenuListId[],
  // menuListIDとMenuListItemIDの紐付け情報。キー操作でメニュー選択を変えた時とかに使う予定。
  menuMap: new Map<MenuListId, MenuListItemId[]>(),
  // menuListIDとMenuListItemのDOMのマッピング。サブメニューを描画するとき、メニューの表示位置は親メニューから決めるので、それに使う
  menuDomMap: new Map<MenuListId, RefObject<HTMLLIElement>>(),
  // 自動ロックが発動したかどうか。発動した場合は、メニューの操作が一切できなくなる想定。
  locked: false
});

export const menuListContext = createContext({} as MenuListContextInitializer);

export function useMenuListContextInitializer(
  containerRef: RefObject<HTMLDivElement>,
  autoLock = false,
  onSelect?: (name?: string) => void
) {
  // メニューリストの管理に用いる状態。これらの状態の変化でReactコンポーネントの動作に影響を及ぼしたく無いので、useRefで退避させる。
  const menuState = useRef(defaultMenuState());
  const getParentMenu = useCallback((menuListId: MenuListId) => {
    const { menuPath, menuDomMap } = menuState.current;
    const idx = menuPath.indexOf(menuListId);

    if (idx === 0) {
      return undefined;
    }
    const parentId = menuPath[idx - 1];

    return menuDomMap.get(parentId);
  }, []);

  return {
    containerRef,
    menuState,
    // メニューを閉じた時にmenuPathからメニューIDを削除するとき使う
    removeMenuPath: useCallback((menuListId: MenuListId) => {
      const state = menuState.current;
      const idx = state.menuPath.indexOf(menuListId);
      if (idx !== -1) {
        state.menuPath = state.menuPath.slice(0, idx);
      }
    }, []),
    getParentMenu,
    hasParent: useCallback(
      (menuListId: MenuListId) => {
        const parent = getParentMenu(menuListId);
        return parent != null;
      },
      [getParentMenu]
    ),
    getCointainerPosition: useCallback(() => {
      if (containerRef.current == null) {
        return {
          height: 0,
          width: 0,
          x: 0,
          y: 0
        } as DOMRect;
      }
      return containerRef.current.getBoundingClientRect();
    }, [containerRef]),
    autoLock,
    onSelect
  };
}
export type MenuListContextInitializer = ReturnType<typeof useMenuListContextInitializer>;
export type MenuListState = ReturnType<typeof defaultMenuState>;
