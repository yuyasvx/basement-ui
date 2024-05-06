import { Case } from '../util/Case';
import { VariantType } from './VariantType';

export interface VariantAdaptable<VT = typeof VariantType> {
  variant?: Case<VT>;
}
