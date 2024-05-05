import { AppearanceType } from '../domain/AppearanceType';
import { Case } from '../util/Case';
import { StyleKey } from './StyleKey';

export const StyleSets = {
  PUSH: 'bm-s-push' as StyleKey,
  UNION_PUSH: 'bm-e-union-push' as StyleKey,
  LIST: 'bm-e-list' as StyleKey,
  LIST_CONTAINER: 'bm-e-list-container' as StyleKey,
  LIST_ITEM: 'bm-e-list-item' as StyleKey,
  BUTTON: 'bm-c-button' as StyleKey,
  SWITCH_ELEMENT: 'bm-e-switchable' as StyleKey
} as const;

export interface StyleSetProps<VT = typeof AppearanceType> {
  variant?: Case<VT>;
  status?: string;
}

export const useStyleSet = <VT = typeof AppearanceType>(name: StyleKey, props: StyleSetProps<VT>) => {
  const manualEffect = props.status != null ? `---${props.status}` : undefined;
  const variant = props.variant ?? AppearanceType.NORMAL;
  const manualFlag = props.status != null ? '---manual' : undefined;

  return {
    name,
    manualEffect,
    manual: manualFlag,
    variant: `--${variant}`,
    classNames: [`--${variant}`, manualFlag, manualEffect]
  };
};
