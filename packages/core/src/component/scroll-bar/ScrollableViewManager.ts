import { ScrollBarVariable } from './ScrollBarVariable';

export type ViewBox = Readonly<{
  width: number;
  height: number;
}>;
const viewBox = {
  minus(p1: ViewBox, p2: ViewBox): ViewBox {
    return {
      width: p1.width - p2.width,
      height: p1.height - p2.height,
    };
  },
};

export class ScrollableViewManager {
  public minimumScrollBarFrameHeight = 40;
  private _viewElement?: HTMLElement;
  private contentElement?: HTMLElement;
  private scrollTop = 0;
  private scrollLeft = 0;
  private scrollableTop = 0;
  private scrollableLeft = 0;
  private verticalLength = this.minimumScrollBarFrameHeight;

  private resizeObserver = new ResizeObserver(() => {
    console.log('detected');
    this.refreshScrollBarStatus();
  });

  get viewElement(): HTMLElement | undefined {
    return this._viewElement;
  }

  set viewElement(val: HTMLElement | null | undefined) {
    this._viewElement = val ?? undefined;
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

  enableResizeObserver() {
    if (this.contentElement == null) {
      console.log('failed');
      return;
    }
    this.resizeObserver.observe(this.contentElement);
  }

  disableResizeObserver() {
    if (this.contentElement == null) {
      return;
    }
    this.resizeObserver.unobserve(this.contentElement);
  }

  /**
   * 初期化処理
   */
  refreshScrollBarStatus() {
    this._viewElement?.style.setProperty(`--${ScrollBarVariable.VERTICAL_GUTTER_WIDTH}`, `${this.clientBox.height}px`);
    this._viewElement?.style.setProperty(`--${ScrollBarVariable.FRAME_MIN_LENGTH}`, `${this.minimumScrollBarFrameHeight}px`);
    this.refreshViewBoxStatus();
    this.updateScrollBarFrameLength();

    this.acceptScrolling();
  }

  refreshViewBoxStatus() {
    const difference = viewBox.minus(this.scrollBox, this.clientBox);
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
    const verticalLength = this.clientBox.height - this.scrollableTop;
    this.verticalLength = verticalLength < this.minimumScrollBarFrameHeight ? this.minimumScrollBarFrameHeight : verticalLength;
    this._viewElement?.style.setProperty(`--${ScrollBarVariable.VERTICAL_FRAME_LENGTH}`, `${this.verticalLength}px`);
  }

  private updateScrollBarPosition() {
    const scrollTop = this.scrollTop;
    const restOfScrollTop = this.scrollableTop;
    const restOfScrollBarBackground = this.clientBox.height - this.verticalLength;
    const topPosition = (scrollTop * restOfScrollBarBackground) / restOfScrollTop;

    this._viewElement?.style.setProperty(`--${ScrollBarVariable.VERTICAL_FRAME_POSITION}`, `${topPosition}px`);
  }

  private updateChildElement() {
    this.contentElement = (this._viewElement?.querySelector('[data-bmui-view-type="content"]') as HTMLElement | null) ?? undefined;
  }
}
