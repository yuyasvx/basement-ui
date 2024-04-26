import { Identify } from '../../../util/Identify';

export type MenuListId = Identify<'menuListId', string>;
export function MenuListId(id: string): MenuListId {
  return id as MenuListId;
}
