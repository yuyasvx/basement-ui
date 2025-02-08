import type { CSSProperties } from 'react';
import { StyleVariable } from '../StyleVariable';

abstract class DropShadowContext {
  readonly shadowWidth: number = 0;
  readonly opacity: number = 0;
  readonly offsetY: number = 0;
  readonly colorValue: string = '';

  protected lerp(minWidth: number, minFactor: number, maxWidth: number, maxFactor: number, width: number) {
    return minFactor + ((maxFactor - minFactor) * (width - minWidth)) / (maxWidth - minWidth);
  }

  protected getColorStyle(): string {
    return `color-mix(in srgb, ${this.colorValue} ${this.opacity * 100}%, transparent)`;
  }

  toCSSValue() {
    // return `0px ${this.offsetY}px ${this.shadowWidth}px rgba(0, 0, 0, ${this.opacity})`;
    return `0px ${this.offsetY}px ${this.shadowWidth}px ${this.getColorStyle()}`;
  }
}

class PrimaryDropShadow extends DropShadowContext {
  private static MIN_OPACITY = 0.15;
  private static MAX_OPACITY = 0.4;

  readonly shadowWidth: number;
  readonly opacity: number;
  readonly offsetY: number;
  readonly colorValue: string;

  constructor(baseValue: number, color = '#000000', opacityRate = 1) {
    super();
    this.shadowWidth = baseValue;
    this.opacity = this.calcOpacity(baseValue, opacityRate);
    this.offsetY = this.calcOffsetY(baseValue);
    this.colorValue = color;
  }

  private calcOpacity(baseValue: number, opacityRate: number): number {
    const calcOpacity = this.lerp(0, 0.1, 50, 0.4, baseValue);
    const adjustedOpacity =
      calcOpacity > PrimaryDropShadow.MAX_OPACITY
        ? PrimaryDropShadow.MAX_OPACITY
        : calcOpacity < PrimaryDropShadow.MIN_OPACITY
          ? PrimaryDropShadow.MIN_OPACITY
          : calcOpacity;

    return adjustedOpacity * opacityRate;
  }

  private calcOffsetY(baseValue: number): number {
    return baseValue === 0 ? 0 : this.lerp(0, 2, 50, 12, baseValue);
  }
}

class SecondaryDropShadow extends DropShadowContext {
  private static MIN_OPACITY = 0.15;
  private static MIN_WIDTH = 2;

  readonly shadowWidth: number;
  readonly opacity: number;
  readonly offsetY = 0;
  readonly colorValue: string;

  constructor(baseValue: number, color = '#000000', opacityRate = 1) {
    super();
    this.shadowWidth = this.calcShadowWidth(baseValue);
    this.opacity = this.calcOpacity(baseValue, opacityRate);
    this.colorValue = color;
  }

  private calcShadowWidth(baseValue: number): number {
    const width = this.lerp(0, 1, 50, 6, baseValue);
    return width < SecondaryDropShadow.MIN_WIDTH ? SecondaryDropShadow.MIN_WIDTH : width;
  }

  private calcOpacity(baseValue: number, opacityRate: number): number {
    const calcOpacity = this.lerp(0, 0.3, 50, 0.05, baseValue);
    const adjustedOpacity = calcOpacity < SecondaryDropShadow.MIN_OPACITY ? SecondaryDropShadow.MIN_OPACITY : calcOpacity;
    return adjustedOpacity * opacityRate;
  }
}

export function calcDropShadow(width = 10, color?: string, opacityRate?: number) {
  const primary = new PrimaryDropShadow(width, color, opacityRate);
  const secondary = new SecondaryDropShadow(width, color, opacityRate);

  return {
    primary,
    secondary,
    cssStyle: {
      [`--${StyleVariable.SHADOW_STYLE}`]: `${primary.toCSSValue()}, ${secondary.toCSSValue()}`,
    } as CSSProperties,
  };
}
