import { CSSProperties, KeyboardEvent, MutableRefObject } from 'react';

// export function getStylePosition(
//   style: CSSProperties | undefined,
//   root: boolean,
//   position: { left: string; top: string }
// ) {
//   if (root) {
//     return style;
//   }
//   const newStyle = style ?? ({} as CSSProperties);
//   newStyle.left = position.left;
//   newStyle.top = position.top;
//   return newStyle;
// }

/**
 * 表示しようとしているメニューに親要素がある場合（＝サブメニューである）、表示位置を決定します
 * param menuListElement
 * param positionRef
 */
// export function setMenuPosition(
//   menuListElement: HTMLUListElement,
//   positionRef: MutableRefObject<Record<string, string>>
// ) {
//   if (menuListElement.parentElement == null) {
//     return;
//   }
//   const selectedItems = menuListElement.parentElement.querySelectorAll<HTMLButtonElement>('.-selected');
//   if (selectedItems.length === 0) {
//     return;
//   }
//
//   const cs = window.getComputedStyle(menuListElement.parentElement);
//   const paddingRight = cs.getPropertyValue('padding-right');
//   const paddingTop = cs.getPropertyValue('padding-top');
//
//   const itemRect = selectedItems[0].getBoundingClientRect();
//   const x = Math.floor(itemRect.width);
//   const y = Math.floor(selectedItems[0].offsetTop);
//   const itemHeight = Math.floor(itemRect.height);
//
//   const menuRect = menuListElement.getBoundingClientRect();
//   const maxSize = { width: window.innerWidth, height: window.innerHeight };
//   const overflowX = x + menuRect.x + menuRect.width > maxSize.width;
//   const overflowY = y + menuRect.y + menuRect.height > maxSize.height;
//
//   if (overflowX) {
//     positionRef.current.left = `calc(${-Math.floor(menuRect.width)}px + ${paddingRight})`;
//     menuListElement.style.left = `calc(${-Math.floor(menuRect.width)}px + ${paddingRight})`;
//   } else {
//     positionRef.current.left = `calc(${x}px + ${paddingRight})`;
//     menuListElement.style.left = `calc(${x}px + ${paddingRight})`;
//   }
//
//   if (overflowY) {
//     const delta = y - Math.floor(menuRect.height) + itemHeight;
//     positionRef.current.top = `${delta}px`;
//     menuListElement.style.top = `${delta}px`;
//   } else {
//     positionRef.current.top = `calc(${y}px - ${paddingTop})`;
//     menuListElement.style.top = `calc(${y}px - ${paddingTop})`;
//   }
//
//   menuListElement.classList.remove('-pending');
// }

const nextEvent = new CustomEvent('bm-list-item-next');
const prevEvent = new CustomEvent('bm-list-item-prev');
const execEvent = new CustomEvent('bm-list-item-exec');
const hideSubmenuEvent = new CustomEvent('bm-list-item-hide-submenu');

export function handleKeyboard(evt: KeyboardEvent<HTMLUListElement>, menuElement: HTMLUListElement) {
  if (evt.key === 'ArrowDown') {
    evt.preventDefault();
    menuElement.dispatchEvent(nextEvent);
    return;
  }
  if (evt.key === 'ArrowUp') {
    evt.preventDefault();
    menuElement.dispatchEvent(prevEvent);
    return;
  }
  if (evt.key === 'Enter' || evt.key === ' ') {
    evt.preventDefault();
    menuElement.dispatchEvent(execEvent);
    return;
  }
  if (evt.key === 'ArrowLeft') {
    evt.preventDefault();
    const parent = menuElement.parentElement;
    if (parent != null && parent.dataset.bmMenu === '') {
      parent.dispatchEvent(hideSubmenuEvent);
    }
  }
}
