import type { CSSProperties } from 'react';
import { CardStyleVariable } from './CardStyleVariable';

abstract class CardShadowStyle {
  readonly shadowWidth: number;
  readonly opacity: number;
  readonly offsetY: number;

  constructor() {
    this.shadowWidth = 0;
    this.opacity = 0;
    this.offsetY = 0;
  }

  protected lerp(minWidth: number, minFactor: number, maxWidth: number, maxFactor: number, width: number) {
    return minFactor + ((maxFactor - minFactor) * (width - minWidth)) / (maxWidth - minWidth);
  }

  abstract toCSSValue(): string;
}

class PrimaryCardShadowStyle extends CardShadowStyle {
  private static MIN_OPACITY = 0.15;
  private static MAX_OPACITY = 0.4;

  readonly shadowWidth: number;
  readonly opacity: number;
  readonly offsetY: number;

  constructor(baseValue: number) {
    super();
    this.shadowWidth = baseValue;
    this.opacity = this.calcOpacity(baseValue);
    this.offsetY = this.calcOffsetY(baseValue);
  }

  toCSSValue() {
    return `0px ${this.offsetY}px ${this.shadowWidth}px rgba(0, 0, 0, ${this.opacity})`;
  }

  private calcOpacity(baseValue: number): number {
    const calcOpacity = this.lerp(0, 0.1, 50, 0.4, baseValue);
    return calcOpacity > PrimaryCardShadowStyle.MAX_OPACITY
      ? PrimaryCardShadowStyle.MAX_OPACITY
      : calcOpacity < PrimaryCardShadowStyle.MIN_OPACITY
        ? PrimaryCardShadowStyle.MIN_OPACITY
        : calcOpacity;
  }

  private calcOffsetY(baseValue: number): number {
    return baseValue === 0 ? 0 : this.lerp(0, 2, 50, 12, baseValue);
  }
}

class SecondaryCardShadowStyle extends CardShadowStyle {
  private static MIN_OPACITY = 0.15;
  private static MIN_WIDTH = 2;

  readonly shadowWidth: number;
  readonly opacity: number;
  readonly offsetY = 0;

  constructor(baseValue: number) {
    super();
    this.shadowWidth = this.calcShadowWidth(baseValue);
    this.opacity = this.calcOpacity(baseValue);
  }

  toCSSValue() {
    return `0px ${this.offsetY}px ${this.shadowWidth}px rgba(0, 0, 0, ${this.opacity})`;
  }

  private calcShadowWidth(baseValue: number): number {
    const width = this.lerp(0, 1, 50, 6, baseValue);
    return width < SecondaryCardShadowStyle.MIN_WIDTH ? SecondaryCardShadowStyle.MIN_WIDTH : width;
  }

  private calcOpacity(baseValue: number): number {
    const calcOpacity = this.lerp(0, 0.3, 50, 0.05, baseValue);
    return calcOpacity < SecondaryCardShadowStyle.MIN_OPACITY ? SecondaryCardShadowStyle.MIN_OPACITY : calcOpacity;
  }
}

export function calcCardShadow(width: number) {
  const primary = new PrimaryCardShadowStyle(width);
  const secondary = new SecondaryCardShadowStyle(width);

  return {
    primary,
    secondary,
    cssStyle: {
      [`--${CardStyleVariable.SHADOW_STYLE}`]: `${primary.toCSSValue()}, ${secondary.toCSSValue()}`,
    } as CSSProperties,
  };
}
