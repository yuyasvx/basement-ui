import { AppearanceType } from '../domain/AppearanceType';
import { Case } from '../util/Case';

export const StyleElements = {
  PUSH: 'bm-s-push'
} as const;

export interface StyleElementProps<VT = typeof AppearanceType> {
  variant?: Case<VT>;
  effect?: string;
}

export const useStyleElement = <VT = typeof AppearanceType>(name: string, props: StyleElementProps<VT>) => {
  const manualEffect = props.effect != null ? `---${props.effect}` : undefined;
  const variant = props.variant ?? AppearanceType.NORMAL;

  return {
    name,
    manualEffect,
    manual: props.effect != null ? '---manual' : undefined,
    variant: `--${variant}`
  };
};
