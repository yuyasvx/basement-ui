import clsx from 'clsx';
import { type FC, useCallback, useMemo, useState } from 'react';
import type { Case } from '../../lib/Case';
import { ComponentToken } from '../ComponentToken';

export const ScrollBar: FC = () => {
  return (
    <>
      <ScrollBarImpl type={ScrollBarImplType.VERTICAL} needToShow />
      <ScrollBarImpl type={ScrollBarImplType.HORIZONTAL} needToShow={false} />
    </>
  );
};

/** @internal */
export const ScrollBarImplType = {
  VERTICAL: '---vertical',
  HORIZONTAL: '---horizontal',
} as const;

type ScrollBarImplProps = {
  type: Case<typeof ScrollBarImplType>;
  needToShow: boolean;
};

const ScrollBarImpl: FC<ScrollBarImplProps> = ({ type, needToShow }) => {
  const [sleep, setSleep] = useState(true);
  const className = useMemo(() => clsx(ComponentToken.SCROLL_BAR, type), [type]);
  const handleMouseOnEvent = useCallback(() => {
    setSleep(false);
  }, []);
  const handleMouseOffEvent = useCallback(() => {
    setSleep(true);
  }, []);

  return (
    needToShow && (
      <div className={className} data-bmui-sleep={sleep} onMouseOver={handleMouseOnEvent} onMouseOut={handleMouseOffEvent}>
        <div className={ComponentToken.scrollBar.background}>
          <div className={ComponentToken.scrollBar.frame}>
            <div className={ComponentToken.scrollBar.knob}></div>
          </div>
        </div>
      </div>
    )
  );
};
