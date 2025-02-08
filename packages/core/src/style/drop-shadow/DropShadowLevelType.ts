import type { Case } from '../../lib/Case';

export const DropShadowLevelType = {
  LEVEL_2: 'lv-2',
  LEVEL_5: 'lv-5',
  LEVEL_10: 'lv-10',
  LEVEL_20: 'lv-20',
  LEVEL_30: 'lv-30',
  LEVEL_40: 'lv-40',
} as const;

export type DropShadowLevelType = Case<typeof DropShadowLevelType>;
