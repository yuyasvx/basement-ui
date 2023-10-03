import { MutableRefObject } from 'react';

/**
 * 表示しようとしているメニューに親要素がある場合（＝サブメニューである）、表示位置を決定します
 * @param menuListElement
 * @param positionRef
 */
export function setMenuPosition(
  menuListElement: HTMLUListElement,
  positionRef: MutableRefObject<Record<string, string>>
) {
  if (menuListElement.parentElement == null) {
    return;
  }
  const selectedItems = menuListElement.parentElement.querySelectorAll<HTMLButtonElement>('.-selected');
  if (selectedItems.length === 0) {
    return;
  }

  const cs = window.getComputedStyle(menuListElement.parentElement);
  const paddingRight = cs.getPropertyValue('padding-right');
  const paddingTop = cs.getPropertyValue('padding-top');

  const x = Math.floor(selectedItems[0].clientWidth);
  const y = Math.floor(selectedItems[0].offsetTop);
  positionRef.current.left = `calc(${x}px + ${paddingRight})`;
  positionRef.current.top = `calc(${y}px - ${paddingTop})`;

  // pendingRef.current = false;
  menuListElement.classList.remove('-pending');
  menuListElement.style.left = `calc(${x}px + ${paddingRight})`;
  menuListElement.style.top = `calc(${y}px - ${paddingTop})`;
}
