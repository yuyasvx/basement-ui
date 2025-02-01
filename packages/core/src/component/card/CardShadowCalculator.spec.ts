import { describe, expect, test } from 'vitest';
import { calcCardShadow } from './CardShadowCalculator';
import { CardStyleVariable } from './CardStyleVariable';

describe('CardShadowCalculator', () => {
  test('影の大きさを指定すると、適切なドロップシャドウの位置・半径・濃さを計算によって求めた結果が返る', () => {
    const shadowZero = calcCardShadow(0);
    expect(shadowZero.primary.shadowWidth).toBe(0);
    expect(shadowZero.primary.opacity).toBeCloseTo(0.15);
    expect(shadowZero.primary.offsetY).toBe(0);
    expect(shadowZero.secondary.shadowWidth).toBe(2);
    expect(shadowZero.secondary.opacity).toBeCloseTo(0.3);
    expect(shadowZero.secondary.offsetY).toBe(0);

    const shadowTen = calcCardShadow(10);
    expect(shadowTen.primary.shadowWidth).toBe(10);
    expect(shadowTen.primary.opacity).toBeCloseTo(0.16);
    expect(shadowTen.primary.offsetY).toBe(4);
    expect(shadowZero.secondary.shadowWidth).toBe(2);
    expect(shadowZero.secondary.opacity).toBeCloseTo(0.3);
    expect(shadowZero.secondary.offsetY).toBe(0);
  });

  test('計算によって求めたドロップシャドウのスタイルをCSSとして取得できる', () => {
    const shadow = calcCardShadow(10);
    expect(shadow.cssStyle).toStrictEqual({
      [`--${CardStyleVariable.SHADOW_STYLE}`]: '0px 4px 10px rgba(0, 0, 0, 0.16000000000000003), 0px 0px 2px rgba(0, 0, 0, 0.25)',
    });
  });

  test('倍率を用いて影の濃さを強めたり弱めたりすることができる', () => {
    const shadow = calcCardShadow(10);
    const shadow2 = calcCardShadow(10, 2);
    const shadow3 = calcCardShadow(10, 0.5);

    expect(shadow2.primary.opacity).toBeCloseTo(shadow.primary.opacity * 2);
    expect(shadow2.secondary.opacity).toBeCloseTo(shadow.secondary.opacity * 2);

    expect(shadow3.primary.opacity).toBeCloseTo(shadow.primary.opacity * 0.5);
    expect(shadow3.secondary.opacity).toBeCloseTo(shadow.secondary.opacity * 0.5);
  });
});
