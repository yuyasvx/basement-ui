import { Identify } from '../util/Identify';

export type StyleKey = Identify<'styleKey', string>;
export function StyleKey(key: string): StyleKey {
  return key as StyleKey;
}
