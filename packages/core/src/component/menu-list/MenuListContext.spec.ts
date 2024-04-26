import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { useMenuListContextInitializer } from './MenuListContext';
import { MenuListId } from './value/MenuListId';

describe('MenuListContext', () => {
  describe('removeMenuPath', () => {
    test('削除対象のIDが配列の途中に存在している場合は、途中から最後まで削除する', () => {
      const { result } = renderHook(() => useMenuListContextInitializer(useRef(null)));
      const { removeMenuPath } = result.current;
      const state = result.current.menuState.current;

      state.menuPath.push(MenuListId('ROOT_ID'));
      state.menuPath.push(MenuListId('SUBMENU_1'));
      state.menuPath.push(MenuListId('SUBMENU_2'));
      state.menuPath.push(MenuListId('SUBMENU_3'));

      removeMenuPath(MenuListId('SUBMENU_1'));

      expect(state.menuPath).toStrictEqual(['ROOT_ID']);
    });

    test('削除対象のIDが配列に無い場合は、何もしない', () => {
      const { result } = renderHook(() => useMenuListContextInitializer(useRef(null)));
      const { removeMenuPath } = result.current;
      const state = result.current.menuState.current;

      state.menuPath.push(MenuListId('ROOT_ID'));
      state.menuPath.push(MenuListId('SUBMENU_1'));
      state.menuPath.push(MenuListId('SUBMENU_2'));

      removeMenuPath(MenuListId('SUBMENU_3'));

      expect(state.menuPath).toStrictEqual(['ROOT_ID', 'SUBMENU_1', 'SUBMENU_2']);
    });

    test('空配列', () => {
      const { result } = renderHook(() => useMenuListContextInitializer(useRef(null)));
      const { removeMenuPath } = result.current;
      const state = result.current.menuState.current;

      state.menuPath = [];

      removeMenuPath(MenuListId('TEST'));

      expect(state.menuPath).toStrictEqual([]);
    });
  });
});
