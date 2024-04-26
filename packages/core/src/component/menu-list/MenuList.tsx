import clsx from 'clsx';
import {
  FC,
  PropsWithChildren,
  memo,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';
import { List } from '../../element/list/List';
import { useCardStyle } from '../../style-element/card/Card';
import { useOnce } from '../../util/OnceHook';
import { menuListContext } from './MenuListContext';
import { menuItemContext, useMenuItemContextInitializer } from './MenuListItemContext';
import { MenuListId } from './value/MenuListId';

const NAME = 'bm-c-menu-list';

export type MenuListProps = PropsWithChildren<Omit<BaseComponentProps, 'tabIndex' | 'nativeProps'>>;

export const MenuList: FC<MenuListProps> = memo((props) => {
  const contextValue = useMenuItemContextInitializer();
  const { props: newProps } = useMenuListComponent(props);
  return (
    <menuItemContext.Provider value={contextValue}>
      <List {...newProps}>{props.children}</List>
    </menuItemContext.Provider>
  );
});

export function useMenuListComponent(props: MenuListProps) {
  const [menuListId] = useState(MenuListId(useId()));
  const baseProps = getBaseComponentProps(props);
  const { menuState, removeMenuPath, getParentMenu, getCointainerPosition } = useContext(menuListContext);
  const { menuPath, menuMap, menuDomMap } = menuState.current;

  const { className: cardClass } = useCardStyle({ blur: 1, background: 3, shadow: 1 });
  const componentName = `${NAME}__inner`;
  const ref = useRef<HTMLUListElement>(null);

  useOnce(() => {
    menuPath.push(menuListId);
  });

  const parentMenu = getParentMenu(menuListId);
  const child = parentMenu != null;

  const className = useMemo(
    () =>
      clsx(
        componentName,
        cardClass,
        props.className,
        // { '-pending': pendingRef.current }
        { '-absolute': child }
      ),
    [cardClass, child, componentName, props.className]
  );

  useLayoutEffect(() => {
    if (ref.current == null) {
      return;
    }
    const idx = menuPath.indexOf(menuListId);
    if (idx === 0) {
      return;
    }
    const parentId = menuPath[idx - 1];
    const parentDom = menuDomMap.get(parentId);
    if (parentDom?.current == null) {
      return;
    }

    const pos = getSubmenuPosition(parentDom.current, getCointainerPosition());
    ref.current.style.top = pos.top;
    ref.current.style.left = pos.left;
  }, [getCointainerPosition, menuDomMap, menuListId, menuPath]);

  useEffect(() => {
    return () => {
      removeMenuPath(menuListId);
      menuMap.delete(menuListId);
    };
  }, [menuListId, menuMap, removeMenuPath]);

  return {
    name: componentName,
    menuListId,
    props: {
      className,
      // onKeyDown: keyboardHandler,
      // tabIndex: props.root ? 0 : -1,
      // ref: menuRef,
      id: baseProps.id,
      nativeProps: { 'data-bm-menu': '' },
      ref,
      tabIndex: child ? -1 : 0
    }
  };
}

/**
 * @internal
 * @param dom
 * @param containerPosition
 */
export function getSubmenuPosition(dom: HTMLLIElement, containerPosition: DOMRect) {
  // FIXME ポジションを算出した結果、画面からはみ出る場合は考慮していません
  const parentElement = dom.parentElement;
  const computedStyle = parentElement != null ? window.getComputedStyle(parentElement) : undefined;
  const paddingTop = computedStyle != null ? computedStyle.getPropertyValue('padding-top') : 0;
  const paddingLeft = computedStyle != null ? computedStyle.getPropertyValue('padding-left') : 0;

  const parentRect = dom.getBoundingClientRect();
  const left = parentRect.width + parentRect.left - containerPosition.left;
  const top = parentRect.top - containerPosition.top;

  return { left: `calc(${left}px - ${paddingLeft})`, top: `calc(${top}px - ${paddingTop})` };
}
