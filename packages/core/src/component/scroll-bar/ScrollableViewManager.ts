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

  /** スクロールビューのフレーム部分のRef */
  private frameElement?: HTMLElement;

  /** スクロールビューの内容部分のRef */
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

  /** 事実上スクロールビューのリサイズ検知 */
  private frameResizeObserver = new ResizeObserver((entries) => {
    console.log('frameResizeObserver', entries);
    this.refreshScrollBarStatus();
  });

  /** スクロールビューの中身のリサイズ検知 */
  private contentResizeObserver = new ResizeObserver((entries) => {
    console.log('contentResizeObserver', entries);
    this.refreshScrollBarStatus();
  });

  set viewElement(val: HTMLElement | undefined) {
    this._viewElement = val;
    this.updateChildElement();
  }

  get clientBox(): ViewBox {
    return { width: this.frameElement?.clientWidth ?? 0, height: this.frameElement?.clientHeight ?? 0 };
  }

  get scrollBox(): ViewBox {
    return { width: this.frameElement?.scrollWidth ?? 0, height: this.frameElement?.scrollHeight ?? 0 };
  }

  startScrollObservation(cb: (event: Event) => void) {
    this.frameElement?.addEventListener('scroll', cb);
  }

  endScrollObservation(cb: (event: Event) => void) {
    this.frameElement?.removeEventListener('scroll', cb);
  }

  enableObserver() {
    if (this.frameElement != null) {
      this.frameResizeObserver.observe(this.frameElement);
    }
    if (this.contentElement != null) {
      this.contentResizeObserver.observe(this.contentElement);
    }
  }

  disableObserver() {
    if (this.frameElement != null) {
      this.frameResizeObserver.unobserve(this.frameElement);
    }
    if (this.contentElement != null) {
      this.contentResizeObserver.unobserve(this.contentElement);
    }
  }

  /**
   * 初期化処理
   */
  refreshScrollBarStatus() {
    if (!this._viewElement || !this.frameElement) return;

    this._viewElement.style.setProperty(`--${ScrollBarVariable.VERTICAL_GUTTER_WIDTH}`, `${this.clientBox.height}px`);
    this._viewElement.style.setProperty(`--${ScrollBarVariable.KNOB_MIN_LENGTH}`, `${this.minimumScrollBarFrameHeight}px`);
    this.refreshViewBoxStatus();

    const vKnob = (this._viewElement.querySelector('[data-bmui-view-type="v-knob"]') as HTMLElement | null) ?? undefined;
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
    this.scrollTop = this.frameElement?.scrollTop ?? 0;
    this.scrollLeft = this.frameElement?.scrollLeft ?? 0;

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
    this.frameElement = (this._viewElement?.querySelector('[data-bmui-view-type="frame"]') as HTMLElement | null) ?? undefined;
    this.contentElement = (this._viewElement?.querySelector('[data-bmui-view-type="content"]') as HTMLElement | null) ?? undefined;
  }
}
