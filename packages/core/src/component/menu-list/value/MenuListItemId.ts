import { Identify } from '../../../util/Identify';

export type MenuListItemId = Identify<'menuListItemId', string>;
export function MenuListItemId(id: string): MenuListItemId {
  return id as MenuListItemId;
}
