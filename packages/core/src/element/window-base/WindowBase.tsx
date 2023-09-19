import { FC, PropsWithChildren, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';
import { MouseEvents } from '../../domain/EventProps';
import { backgroundStyle, blurStyle, RootStyle, shadowStyle } from '../../domain/StyleClass';

interface FrameDetailedProps {
  shadowLevel?: 0 | 1 | 2 | 3 | 4;
  backgroundLevel?: 0 | 1 | 2 | 3 | 4;
  blurLevel?: 0 | 1;
}

export type FrameProps = PropsWithChildren<FrameDetailedProps & BaseComponentProps & MouseEvents<HTMLDivElement>>;

const NAME = 'bm-e-frame';

export const useFrameHook = (props: FrameProps) => {
  const getBackgroundAtom = useCallback((level?: number) => {
    if (level == null) {
      return backgroundStyle[1];
    }
    if (level === 0) {
      return '';
    }
    return backgroundStyle[level - 1] ?? backgroundStyle[1];
  }, []);

  const getShadowAtom = useCallback((level?: number) => {
    if (level == null || level === 0) {
      return '';
    }
    return shadowStyle[level - 1] ?? shadowStyle[1];
  }, []);

  const getBlurAtom = useCallback((level?: number) => {
    if (level == null || level === 0) {
      return '';
    }
    return blurStyle[0];
  }, []);

  const classNames = useMemo(
    () =>
      clsx(
        NAME,
        RootStyle.BASE,
        RootStyle.TEXT_BASE,
        getBackgroundAtom(props.backgroundLevel),
        getShadowAtom(props.shadowLevel),
        getBlurAtom(props.blurLevel),
        props.className
      ),
    [
      getBackgroundAtom,
      getShadowAtom,
      getBlurAtom,
      props.backgroundLevel,
      props.blurLevel,
      props.className,
      props.shadowLevel
    ]
  );
  const baseProps = getBaseComponentProps(props);

  return {
    baseProps,
    classNames
  };
};

/**
 * @deprecated
 * @param props
 * @constructor
 */
export const WindowBase: FC<FrameProps> = props => {
  const { baseProps, classNames } = useFrameHook(props);
  // todo divタグに限定させたくない。
  return (
    <div {...baseProps} className={classNames}>
      {props.children}
    </div>
  );
};
