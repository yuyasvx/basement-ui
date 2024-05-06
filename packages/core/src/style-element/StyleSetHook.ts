import { Case } from '../util/Case';
import { StyleKey } from './StyleKey';
import { VariantType } from './VariantType';

export const StyleSets = {
  PUSH: 'bm-s-push' as StyleKey,
  UNION_PUSH: 'bm-e-union-push' as StyleKey,
  LIST: 'bm-e-list' as StyleKey,
  LIST_CONTAINER: 'bm-e-list-container' as StyleKey,
  LIST_ITEM: 'bm-e-list-item' as StyleKey,
  BUTTON: 'bm-c-button' as StyleKey,
  SWITCH_ELEMENT: 'bm-e-switchable' as StyleKey,
  CHECKBOX: 'bm-c-checkbox' as StyleKey
} as const;

export interface StyleSetProps<VT = typeof VariantType, S = string> {
  variant?: Case<VT>;
  status?: S;
}

export const useStyleSet = <VT = typeof VariantType>(name: StyleKey, props: StyleSetProps<VT>) => {
  const manualStatus = props.status != null ? `---${props.status}` : undefined;
  const variant = props.variant ?? VariantType.NORMAL;
  const manualFlag = props.status != null ? '---manual' : undefined;

  return {
    name,
    manualStatus,
    manual: manualFlag,
    variant: `--${variant}`,
    classNames: [`--${variant}`, manualFlag, manualStatus]
  };
};
