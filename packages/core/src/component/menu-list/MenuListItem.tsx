import clsx from 'clsx';
import {
  FC,
  MouseEvent,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { createPortal } from 'react-dom';
import { BaseComponentProps } from '../../base/BaseComponent';
import { ListItemDetailedProps } from '../../element/list/ListItem';
import { ListItemButton } from '../../element/list/ListItemButton';
import { ListItemEffect } from '../../element/list/ListItemEffect';
import { ChevronRight } from './ChevronRight';
import { MenuListProps } from './MenuList';
import { MenuListState, menuListContext } from './MenuListContext';
import { menuItemContext, useMenuItemContextInitializer } from './MenuListItemContext';
import { MenuListItemId } from './value/MenuListItemId';

const NAME = 'bm-c-menu-list-item';

export type MenuListItemProps = {
  name?: string;
  submenu?: ReactElement<PropsWithChildren<MenuListProps>>;
  handler?: (event: MouseEvent<HTMLButtonElement> | CustomEvent) => void;
} & PropsWithChildren<ListItemDetailedProps> &
  Omit<BaseComponentProps, 'nativeProps'>;

export const MenuItem: FC<MenuListItemProps> = (props) => {
  const { newProps, showSubmenu, containerRef } = useMenuItemComponent(props);

  return (
    <>
      <ListItemButton {...newProps}>{props.children}</ListItemButton>
      {containerRef.current && showSubmenu && (
        <SubmenuWrapper container={containerRef.current}>{props.submenu}</SubmenuWrapper>
      )}
    </>
  );
};

export const useMenuItemComponent = (props: MenuListItemProps) => {
  const [itemId] = useState(MenuListItemId(useId()));

  const { secondary, submenu, handler } = props;
  const { menuState, containerRef, autoLock, onSelect } = useContext(menuListContext);
  const { selectedId, setSelectedId, ...itemContext } = useContext(menuItemContext);
  const { menuDomMap, menuPath } = menuState.current;
  const submenuEventHub = itemContext.submenuEventHub.current;

  const effect = selectedId === itemId ? ListItemEffect.SELECTED : ListItemEffect.NORMAL;
  const ref = useRef<HTMLLIElement>(null);
  const submenuTimeout = useRef(null as NodeJS.Timeout | null);
  const [showSubmenu, setShowSubmenu] = useState(false);

  const newSecondary = submenu ? <ChevronRight style={{ display: 'block' }} /> : secondary;

  const handleSubmenu = useCallback(() => {
    setShowSubmenu(true);
    submenuTimeout.current = null;
  }, []);

  const mouseEnterHandler = useCallback(() => {
    if (menuState.current.locked) {
      return;
    }
    setSelectedId(itemId);
    submenuEventHub.notify(itemId);
    if (submenu) {
      submenuTimeout.current = setTimeout(handleSubmenu, 300);
    }
  }, [handleSubmenu, itemId, menuState, setSelectedId, submenu, submenuEventHub]);

  const mouseLeaveHandler = useCallback(() => {
    if (showSubmenu) {
      return;
    }
    if (!menuState.current.locked) {
      setSelectedId(null);
    }
  }, [menuState, setSelectedId, showSubmenu]);

  const fire = useCallback(
    (evt: CustomEvent | MouseEvent<HTMLButtonElement>) => {
      if (menuState.current.locked || submenu != null) {
        return;
      }
      const elm = ref.current;
      if (elm == null) {
        return;
      }
      if (autoLock) {
        menuState.current.locked = true;
      }
      elm.classList.remove('---selected');
      elm.classList.add('---active');

      setTimeout(() => {
        handler?.(evt);
        onSelect?.(props.name);
        // setTimeout(() => {
        //   lockedRef.current = false;
        // }, lockWait);
      }, 200);
    },
    [autoLock, handler, menuState, onSelect, props.name, submenu]
  );

  const everyUpdate = useCallback(() => {
    // 選択がなくなったら、サブメニュー表示トリガーを解除
    if (effect === ListItemEffect.NORMAL) {
      if (submenuTimeout.current != null) {
        clearTimeout(submenuTimeout.current);
      }
    }
    // 選択されたら、menuDomMapを更新
    if (submenu && selectedId === itemId) {
      const currentMenuListId = menuPath[menuPath.length - 1];
      menuDomMap.set(currentMenuListId, ref);
    }
  }, [effect, itemId, menuDomMap, menuPath, selectedId, submenu]);

  everyUpdate();

  // MenuListコンポーネントのuseInsertionEffectが発動した直後にこれが呼ばれる想定で実装している
  useLayoutEffect(() => {
    addMenuItemId(itemId, menuState.current);
  }, [itemId, menuState]);

  useEffect(() => {
    if (submenu) {
      submenuEventHub.subscribe(itemId, (eventItemId) => {
        if (itemId !== eventItemId) {
          setShowSubmenu(false);
        }
      });
    }

    return () => {
      submenuEventHub.unsubscribe(itemId);
    };
  }, [itemId, submenu, submenuEventHub]);

  return {
    itemId,
    showSubmenu,
    containerRef,
    newProps: {
      icon: props.icon,
      effect,
      className: useMemo(() => clsx(NAME, props.className), [props.className]),
      secondary: newSecondary,
      ref,
      onMouseEnter: mouseEnterHandler,
      onMouseLeave: mouseLeaveHandler,
      onClick: fire,
      tabIndex: -1
    }
  };
};

function addMenuItemId(itemId: MenuListItemId, menuState: MenuListState) {
  const { menuMap, menuPath } = menuState;
  const currentMenuListId = menuPath[menuPath.length - 1];
  const menuItemIds = menuMap.get(currentMenuListId) ?? [];
  menuItemIds.push(itemId);
  menuMap.set(currentMenuListId, menuItemIds);
}

const SubmenuWrapper: FC<PropsWithChildren<{ container: HTMLDivElement }>> = (props) => {
  return (
    <menuItemContext.Provider value={useMenuItemContextInitializer()}>
      {createPortal(props.children, props.container)}
    </menuItemContext.Provider>
  );
};
