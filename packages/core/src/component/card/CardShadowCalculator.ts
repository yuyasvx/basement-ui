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

  constructor(baseValue: number, opacityRate = 1) {
    super();
    this.shadowWidth = baseValue;
    this.opacity = this.calcOpacity(baseValue, opacityRate);
    this.offsetY = this.calcOffsetY(baseValue);
  }

  toCSSValue() {
    return `0px ${this.offsetY}px ${this.shadowWidth}px rgba(0, 0, 0, ${this.opacity})`;
  }

  private calcOpacity(baseValue: number, opacityRate: number): number {
    const calcOpacity = this.lerp(0, 0.1, 50, 0.4, baseValue);
    const adjustedOpacity =
      calcOpacity > PrimaryCardShadowStyle.MAX_OPACITY
        ? PrimaryCardShadowStyle.MAX_OPACITY
        : calcOpacity < PrimaryCardShadowStyle.MIN_OPACITY
          ? PrimaryCardShadowStyle.MIN_OPACITY
          : calcOpacity;

    return adjustedOpacity * opacityRate;
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

  constructor(baseValue: number, opacityRate = 1) {
    super();
    this.shadowWidth = this.calcShadowWidth(baseValue);
    this.opacity = this.calcOpacity(baseValue, opacityRate);
  }

  toCSSValue() {
    return `0px ${this.offsetY}px ${this.shadowWidth}px rgba(0, 0, 0, ${this.opacity})`;
  }

  private calcShadowWidth(baseValue: number): number {
    const width = this.lerp(0, 1, 50, 6, baseValue);
    return width < SecondaryCardShadowStyle.MIN_WIDTH ? SecondaryCardShadowStyle.MIN_WIDTH : width;
  }

  private calcOpacity(baseValue: number, opacityRate: number): number {
    const calcOpacity = this.lerp(0, 0.3, 50, 0.05, baseValue);
    const adjustedOpacity = calcOpacity < SecondaryCardShadowStyle.MIN_OPACITY ? SecondaryCardShadowStyle.MIN_OPACITY : calcOpacity;
    return adjustedOpacity * opacityRate;
  }
}

export function calcCardShadow(width: number, opacityRate: number = 1) {
  const primary = new PrimaryCardShadowStyle(width, opacityRate);
  const secondary = new SecondaryCardShadowStyle(width, opacityRate);

  return {
    primary,
    secondary,
    cssStyle: {
      [`--${CardStyleVariable.SHADOW_STYLE}`]: `${primary.toCSSValue()}, ${secondary.toCSSValue()}`,
    } as CSSProperties,
  };
}
