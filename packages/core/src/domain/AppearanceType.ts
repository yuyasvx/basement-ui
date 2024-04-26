import { Case } from '../util/Case';

export const AppearanceType = {
  NORMAL: 'normal',
  TINT: 'tint',
  FLAT: 'flat',
  SUPER_FLAT: 'super_flat',
  MINIMAL: 'minimal'
} as const;

const appearanceMap: Record<string, string> = {
  [AppearanceType.NORMAL]: '--normal',
  [AppearanceType.TINT]: '--tint',
  [AppearanceType.FLAT]: '--flat',
  [AppearanceType.SUPER_FLAT]: '--super-flat'
};

export const getAppearanceClassName = (appearance?: Case<typeof AppearanceType>): Case<typeof appearanceMap> => {
  return appearance != null ? appearanceMap[appearance] : appearanceMap[AppearanceType.NORMAL];
};
