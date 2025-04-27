import clsx from 'clsx';
import { type FC, useMemo, useState } from 'react';
import type { Case } from '../../lib/Case';
import { ComponentToken } from '../ComponentToken';

export const ScrollBar: FC = () => {
  return (
    <>
      <ScrollBarImpl type={ScrollBarImplType.VERTICAL} needToShow displayMode={DisplayMode.ALWAYS} />
      <ScrollBarImpl type={ScrollBarImplType.HORIZONTAL} needToShow={false} displayMode={DisplayMode.ALWAYS} />
    </>
  );
};

/** @internal */
export const ScrollBarImplType = {
  VERTICAL: '---vertical',
  HORIZONTAL: '---horizontal',
} as const;

/** @internal */
export const DisplayMode = {
  ALWAYS_ACTIVE: 'always-active',
  ALWAYS: 'always',
  WHEN_SCROLL: 'when-scroll',
} as const;

export const ScrollBarStatus = {
  ACTIVE: 'active',
  SHOW: 'show',
  HIDDEN: 'hidden',
} as const;

type ScrollBarImplProps = {
  type: Case<typeof ScrollBarImplType>;
  needToShow: boolean;
  displayMode: Case<typeof DisplayMode>;
  activeDuration?: number;
};

const ScrollBarImpl: FC<ScrollBarImplProps> = ({ displayMode, needToShow, type }) => {
  const className = useMemo(() => clsx(ComponentToken.SCROLL_BAR, type), [type]);
  const [scrollBarStatus] = useState(
    displayMode === DisplayMode.ALWAYS_ACTIVE
      ? ScrollBarStatus.ACTIVE
      : displayMode === DisplayMode.ALWAYS
        ? ScrollBarStatus.SHOW
        : (ScrollBarStatus.HIDDEN as Case<typeof ScrollBarStatus>),
  );

  return (
    needToShow && (
      <div className={className} data-bmui-display-mode={displayMode} data-bmui-status={scrollBarStatus}>
        <div className={ComponentToken.scrollBar.background}>
          <div className={ComponentToken.scrollBar.knob} data-bmui-view-type={type === ScrollBarImplType.VERTICAL ? 'v-knob' : 'h-knob'}>
            <div className={ComponentToken.scrollBar.innerKnob}></div>
          </div>
        </div>
      </div>
    )
  );
};
