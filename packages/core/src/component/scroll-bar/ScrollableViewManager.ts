import { ScrollBarVariable } from './ScrollBarVariable';

export type ViewBox = Readonly<{
  width: number;
  height: number;
}>;
const viewBoxBehavior = {
  minus(p1: ViewBox, p2: ViewBox): ViewBox {
    return {
      width: p1.width - p2.width,
      height: p1.height - p2.height,
    };
  },
};

export class ScrollableViewManager {
  /** スクロールバーのノブの最小の高さ。
   *
   * 表示内容が多くなればなるほど、スクロールバーのノブは小さくなるが、これ以上は小さく表示させたくない大きさを設定する */
  public minimumScrollBarFrameHeight = 40;

  /** スクロールビューのRef */
  private _viewElement?: HTMLElement;

  /** スクロールビューの中身のRef */
  private contentElement?: HTMLElement;

  /** 縦のスクロールした量 */
  private scrollTop = 0;
  private scrollLeft = 0;

  /** 縦にスクロールできる量。ビューサイズ200pxで内容が250pxだった場合、50pxスクロールできるので、その値 */
  private scrollableTop = 0;
  private scrollableLeft = 0;

  /** 縦スクロールバーのノブの長さ */
  private verticalLength = this.minimumScrollBarFrameHeight;
  private verticalOffset = 0;

  private resizeObserver = new ResizeObserver(() => {
    this.refreshScrollBarStatus();
  });
  private mutationObserver = new MutationObserver(() => {
    this.refreshScrollBarStatus();
    this.updateVerticalOffset();
  });

  set viewElement(val: HTMLElement | undefined) {
    this._viewElement = val;
    this.updateChildElement();
  }

  get clientBox(): ViewBox {
    return { width: this.contentElement?.clientWidth ?? 0, height: this.contentElement?.clientHeight ?? 0 };
  }

  get scrollBox(): ViewBox {
    return { width: this.contentElement?.scrollWidth ?? 0, height: this.contentElement?.scrollHeight ?? 0 };
  }

  startScrollObservation(cb: (event: Event) => void) {
    this.contentElement?.addEventListener('scroll', cb);
  }

  endScrollObservation(cb: (event: Event) => void) {
    this.contentElement?.removeEventListener('scroll', cb);
  }

  enableObserver() {
    if (this.contentElement == null) {
      console.log('failed');
      return;
    }
    this.resizeObserver.observe(this.contentElement);
    this.mutationObserver.observe(this.contentElement, { attributes: true, childList: true, subtree: true });
  }

  disableObserver() {
    if (this.contentElement == null) {
      return;
    }
    this.resizeObserver.unobserve(this.contentElement);
    this.mutationObserver.disconnect();
  }

  /**
   * 初期化処理
   */
  refreshScrollBarStatus() {
    this._viewElement?.style.setProperty(`--${ScrollBarVariable.VERTICAL_GUTTER_WIDTH}`, `${this.clientBox.height}px`);
    this._viewElement?.style.setProperty(`--${ScrollBarVariable.KNOB_MIN_LENGTH}`, `${this.minimumScrollBarFrameHeight}px`);
    this.refreshViewBoxStatus();

    const vKnob = (this._viewElement?.querySelector('[data-bmui-view-type="v-knob"]') as HTMLElement | null) ?? undefined;
    this.verticalOffset = vKnob?.offsetTop ?? 0;

    this.updateScrollBarFrameLength();

    this.acceptScrolling();
  }

  refreshViewBoxStatus() {
    const difference = viewBoxBehavior.minus(this.scrollBox, this.clientBox);
    this.scrollableTop = difference.height;
    this.scrollableLeft = difference.width;
  }

  /**
   * 外部からのスクロール操作をスクロールバーコンポーネントに反映させます
   */
  acceptScrolling() {
    this.scrollTop = this.contentElement?.scrollTop ?? 0;
    this.scrollLeft = this.contentElement?.scrollLeft ?? 0;

    this.updateScrollBarPosition();

    // 領域外までスクロールしちゃったら、ノブの長さが縮むようにしたい
    // if (this.scrollTop > this.scrollableTop) {
    //   this._viewElement?.style.setProperty(
    //     `--${ScrollBarVariable.VERTICAL_FRAME_LENGTH}`,
    //     `${this.clientBox.height - this.scrollableTop - (this.scrollTop - this.scrollableTop)}px`,
    //   );
    // } else if (this.scrollTop < 0) {
    //   this._viewElement?.style.setProperty(
    //     `--${ScrollBarVariable.VERTICAL_FRAME_LENGTH}`,
    //     `${this.clientBox.height - this.scrollableTop + this.scrollTop}px`,
    //   );
    // } else {
    //   this._viewElement?.style.setProperty(`--${ScrollBarVariable.VERTICAL_FRAME_LENGTH}`, `${this.clientBox.height - this.scrollableTop}px`);
    // }
  }

  private updateScrollBarFrameLength() {
    const verticalLength = this.clientBox.height - this.scrollableTop - this.verticalOffset;
    this.verticalLength = verticalLength < this.minimumScrollBarFrameHeight ? this.minimumScrollBarFrameHeight : verticalLength;
    this._viewElement?.style.setProperty(`--${ScrollBarVariable.VERTICAL_KNOB_LENGTH}`, `${this.verticalLength}px`);
  }

  private updateScrollBarPosition() {
    const scrollTop = this.scrollTop;
    const restOfScrollTop = this.scrollableTop;
    const restOfScrollBarBackground = this.clientBox.height - this.verticalLength - this.verticalOffset;
    const topPosition = restOfScrollTop === 0 ? 0 : (scrollTop * restOfScrollBarBackground) / restOfScrollTop;

    this._viewElement?.style.setProperty(`--${ScrollBarVariable.VERTICAL_KNOB_POSITION}`, `${topPosition}px`);
  }

  private updateChildElement() {
    this.contentElement = (this._viewElement?.querySelector('[data-bmui-view-type="content"]') as HTMLElement | null) ?? undefined;
  }

  private updateVerticalOffset() {
    // console.log(this._viewElement?.computedStyleMap().get('--' + ScrollBarVariable.VERTICAL_HEAD_OFFSET));
  }
}
