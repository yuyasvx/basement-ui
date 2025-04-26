const BRAND: unique symbol = Symbol('brandedType');
/**
 * @internal
 */
export type Brand<K, T> = K & { [BRAND]: T };
