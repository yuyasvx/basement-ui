import clsx from 'clsx';
import {
  CSSProperties,
  FC,
  ForwardedRef,
  KeyboardEvent,
  PropsWithChildren,
  RefObject,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef
} from 'react';
import { BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';
import { List } from '../../element/list/List';
import { useCardStyle } from '../../style-element/card/Card';
import {
  MenuItemContext,
  menuItemContext,
  menuListContext,
  useMenuItemContextInitializer,
  useMenuListContextInitializer
} from './MenuListContext';
import { handleKeyboard, setMenuPosition } from './MenuLogic';

const NAME = 'bm-c-menu-list';

export type MenuListProps = PropsWithChildren & {
  initialSelectedItem?: string;
  lockWaitDuration?: number;
  onSelect?: (name?: string) => void;
  relativePosition?: boolean;
} & Omit<BaseComponentProps, 'tabIndex' | 'nativeProps'>;
export type MenuListHookProps = { root: boolean } & MenuListProps;

export const MenuList = forwardRef((props: MenuListProps, ref: ForwardedRef<HTMLUListElement>) => {
  return (
    <menuListContext.Provider value={useMenuListContextInitializer(props.lockWaitDuration)}>
      <ListInner {...props} ref={ref} root />
    </menuListContext.Provider>
  );
});

export const SubmenuList = forwardRef((props: MenuListProps, ref: ForwardedRef<HTMLUListElement>) => {
  return <ListInner {...props} ref={ref} root={false} />;
});

const ListInner: FC<MenuListProps & { root: boolean; ref: ForwardedRef<HTMLUListElement> }> = (props) => {
  const contextValue = useMenuItemContextInitializer();
  const { props: newProps } = useMenuListComponent(props, props.ref, contextValue);

  return (
    <menuItemContext.Provider value={contextValue}>
      <List {...newProps}>{props.children}</List>
    </menuItemContext.Provider>
  );
};
export function useMenuListComponent(
  props: MenuListHookProps,
  ref: ForwardedRef<HTMLUListElement>,
  context: MenuItemContext
) {
  const pendingRef = useRef(!props.root);
  const positionRef = useRef({ left: '0', top: '0' });
  const baseProps = getBaseComponentProps(props);
  const { className: cardClass } = useCardStyle({ blur: 1, background: 3, shadow: 1 });
  const className = useMemo(
    () =>
      clsx(
        NAME,
        cardClass,
        props.className,
        { '-submenu': !props.root },
        { '-pending': pendingRef.current },
        { '-relative': props.relativePosition ?? true }
      ),
    [cardClass, props.className, props.relativePosition, props.root]
  );
  const { currentMenuElement, onSelect } = useContext(menuListContext);
  const { prev, next, exec, hideSubmenu, menuElement } = context;
  const fallbackRef = useRef<HTMLUListElement>(null);
  const menuRef = ref != null ? (ref as RefObject<HTMLUListElement>) : fallbackRef;

  const getStylePosition = useCallback(
    (style?: CSSProperties) => {
      if (props.root) {
        return style;
      }
      const newStyle = style ?? ({} as CSSProperties);
      newStyle.left = positionRef.current.left;
      newStyle.top = positionRef.current.top;
      return newStyle;
    },
    [props.root]
  );

  const keyboardHandler = useCallback(
    (evt: KeyboardEvent<HTMLUListElement>) => {
      if (currentMenuElement.current) {
        handleKeyboard(evt, currentMenuElement.current);
      }
    },
    [currentMenuElement]
  );

  if (props.root) {
    onSelect.current = props.onSelect;
  }

  useEffect(() => {
    // 最後に表示しているメニューがアクティブなメニュー
    currentMenuElement.current = menuRef.current;

    menuElement.current = menuRef.current;

    if (!props.root && pendingRef.current && menuRef.current) {
      setMenuPosition(menuRef.current, positionRef);
      pendingRef.current = false;
    }
    const parent = menuRef.current?.parentElement;

    // 親要素もメニューな場合、親要素メニューをアクティブにする
    return () => {
      if (parent == null || parent.dataset.bmMenu == null) {
        return;
      }
      currentMenuElement.current = parent as HTMLUListElement;
    };
  }, [currentMenuElement, menuElement, menuRef, props.root]);

  useEffect(() => {
    const menu = menuRef.current;
    if (menu == null) {
      return;
    }

    menu.addEventListener('bm-list-item-next', next);
    menu.addEventListener('bm-list-item-prev', prev);
    menu.addEventListener('bm-list-item-exec', exec);
    menu.addEventListener('bm-list-item-hide-submenu', hideSubmenu);

    return () => {
      menu.removeEventListener('bm-list-item-next', next);
      menu.removeEventListener('bm-list-item-prev', prev);
      menu.removeEventListener('bm-list-item-exec', exec);
      menu.removeEventListener('bm-list-item-hide-submenu', hideSubmenu);
    };
  }, [exec, hideSubmenu, menuRef, next, prev]);

  return {
    name: NAME,
    props: {
      className,
      onKeyDown: keyboardHandler,
      tabIndex: props.root ? 0 : -1,
      ref: menuRef,
      style: getStylePosition(baseProps.style),
      id: baseProps.id,
      nativeProps: { 'data-bm-menu': '' }
    }
  };
}
