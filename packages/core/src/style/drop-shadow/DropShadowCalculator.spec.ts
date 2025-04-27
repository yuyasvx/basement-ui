import { describe, expect, test } from 'vitest';
import { StyleVariable } from '../StyleVariable';
import { calcDropShadow } from './DropShadowCalculator';

describe('DropShadowCalculator', () => {
  test('影の大きさを指定すると、適切なドロップシャドウの位置・半径・濃さを計算によって求めた結果が返る', () => {
    const shadowZero = calcDropShadow(0);
    expect(shadowZero.primary.shadowWidth).toBe(0);
    expect(shadowZero.primary.opacity).toBeCloseTo(0.15);
    expect(shadowZero.primary.offsetY).toBe(0);
    expect(shadowZero.secondary.shadowWidth).toBe(2);
    expect(shadowZero.secondary.opacity).toBeCloseTo(0.3);
    expect(shadowZero.secondary.offsetY).toBe(0);

    const shadowTen = calcDropShadow(10);
    expect(shadowTen.primary.shadowWidth).toBe(10);
    expect(shadowTen.primary.opacity).toBeCloseTo(0.16);
    expect(shadowTen.primary.offsetY).toBe(4);
    expect(shadowTen.secondary.shadowWidth).toBe(2);
    expect(shadowTen.secondary.opacity).toBeCloseTo(0.25);
    expect(shadowTen.secondary.offsetY).toBe(0);
  });

  test('計算によって求めたドロップシャドウのスタイルをCSSとして取得できる', () => {
    const shadow = calcDropShadow(10);
    expect(shadow.cssStyle).toStrictEqual({
      [`--${StyleVariable.SHADOW_STYLE}`]:
        '0px 4px 10px color-mix(in srgb, #000000 16.000000000000004%, transparent), 0px 0px 2px color-mix(in srgb, #000000 25%, transparent)',
    });
  });

  test('影の色と不透明度はcolor-mixによって表現する', () => {
    const shadow = calcDropShadow(10, 'rgb(3, 3, 3)', 0.4);
    expect(shadow.cssStyle).toStrictEqual({
      [`--${StyleVariable.SHADOW_STYLE}`]:
        '0px 4px 10px color-mix(in srgb, rgb(3, 3, 3) 6.400000000000001%, transparent), 0px 0px 2px color-mix(in srgb, rgb(3, 3, 3) 10%, transparent)',
    });
  });

  test('倍率を用いて影の濃さを強めたり弱めたりすることができる', () => {
    const shadow = calcDropShadow(10);
    const shadow2 = calcDropShadow(10, undefined, 2);
    const shadow3 = calcDropShadow(10, undefined, 0.5);

    expect(shadow2.primary.opacity).toBeCloseTo(shadow.primary.opacity * 2);
    expect(shadow2.secondary.opacity).toBeCloseTo(shadow.secondary.opacity * 2);

    expect(shadow3.primary.opacity).toBeCloseTo(shadow.primary.opacity * 0.5);
    expect(shadow3.secondary.opacity).toBeCloseTo(shadow.secondary.opacity * 0.5);
  });
});
