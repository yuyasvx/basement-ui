import {
  MouseEvent,
  memo,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useContext,
  useRef,
  useState,
  useMemo,
  useId,
  useEffect
} from 'react';
import clsx from 'clsx';
import { ListItemButton, ListItemDetailedProps } from '../../element/list/ListItem';
import { BaseComponentProps } from '../../base/BaseComponent';
import { MenuListProps } from './MenuList';
import { menuItemContext, menuListContext } from './MenuListContext';
import { ChevronRight } from './ChevronRight';

const NAME = 'bm-c-menu-list-item';

export const MenuListItem = memo((props: MenuListItemProps) => {
  const [itemId] = useState(useId());
  const { className: oldClassName, secondary, ...restProps } = props;
  const { lockedRef, lockWait, onSelect } = useContext(menuListContext);
  const { selectedId, setSelectedId } = useContext(menuItemContext);
  const className = clsx(NAME, oldClassName);
  const status = useMemo(() => (selectedId === itemId ? 'selected' : 'normal'), [itemId, selectedId]);
  const ref = useRef<HTMLButtonElement>(null);
  const timeoutRef = useRef(null as NodeJS.Timeout | null);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const dataAttribute = useMemo(
    () =>
      ({
        'data-bm-menu-item': itemId,
        'data-bm-selected': selectedId === itemId,
        'data-bm-has-submenu': props.submenu != null
      } as Record<string, unknown>),
    [itemId, props.submenu, selectedId]
  );
  const newSecondary = props.submenu ? <ChevronRight style={{ display: 'block' }} /> : props.secondary;

  const handleSubmenu = useCallback(() => {
    setShowSubmenu(true);
    timeoutRef.current = null;
  }, []);

  const mouseEnterHandler = useCallback(() => {
    if (!lockedRef.current) {
      setSelectedId(itemId);
    }

    if (props.submenu) {
      timeoutRef.current = setTimeout(handleSubmenu, 300);
    }
  }, [handleSubmenu, itemId, lockedRef, props.submenu, setSelectedId]);

  const mouseLeaveHandler = useCallback(() => {
    if (showSubmenu) {
      return;
    }
    if (!lockedRef.current) {
      setSelectedId(null);
    }
  }, [lockedRef, setSelectedId, showSubmenu]);

  const fire = useCallback(
    (evt: CustomEvent | MouseEvent<HTMLButtonElement>) => {
      if (lockedRef.current || props.submenu) {
        return;
      }
      const elm = ref.current;
      if (elm == null) {
        return;
      }
      lockedRef.current = true;
      elm.classList.remove('-selected');
      elm.classList.add('-active');

      const menuItemHandler = props.handler;
      setTimeout(() => {
        menuItemHandler && menuItemHandler(evt);
        onSelect.current?.(props.name);
        setTimeout(() => {
          lockedRef.current = false;
        }, lockWait);
      }, 200);
    },
    [lockWait, lockedRef, onSelect, props.handler, props.name, props.submenu]
  );

  const handleExecution = useCallback(
    (evt: CustomEvent | Event) => {
      if (props.submenu) {
        setShowSubmenu(true);
        return;
      }
      fire(evt as CustomEvent);
    },
    [fire, props.submenu]
  );

  const hideSubmenu = useCallback(() => {
    if (showSubmenu) {
      setShowSubmenu(false);
    }
  }, [showSubmenu]);

  if (showSubmenu && status === 'normal') {
    setShowSubmenu(false);
    if (timeoutRef.current != null) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    const itemRef = ref.current;
    if (itemRef == null) {
      return;
    }
    itemRef.addEventListener('bm-list-item-exec-inner', handleExecution);
    itemRef.addEventListener('bm-list-item-hide-submenu-inner', hideSubmenu);

    return () => {
      itemRef.removeEventListener('bm-list-item-exec-inner', handleExecution);
      itemRef.removeEventListener('bm-list-item-hide-submenu-inner', hideSubmenu);
    };
  }, [handleExecution, hideSubmenu]);

  return (
    <>
      <ListItemButton
        status={status}
        className={className}
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
        {...restProps}
        secondary={newSecondary}
        nativeProps={dataAttribute}
        ref={ref}
        onClick={fire}
      >
        {props.children}
      </ListItemButton>
      {showSubmenu && props.submenu}
    </>
  );
});

export type MenuListItemProps = {
  name?: string;
  submenu?: ReactElement<PropsWithChildren<MenuListProps>>;
  handler?: (event: MouseEvent<HTMLButtonElement> | CustomEvent) => void;
} & PropsWithChildren<ListItemDetailedProps> &
  Omit<BaseComponentProps, 'nativeProps'>;
