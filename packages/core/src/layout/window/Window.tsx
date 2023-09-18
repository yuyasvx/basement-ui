import { FC, PropsWithChildren, RefObject, useMemo } from 'react';
import clsx from 'clsx';
import { BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';
import { CardStyle, ShadowLevel, useCardStyle } from '../../hook/CardStyleHook';
import { CARD_STYLE } from '../../domain/StyleClass';

const NAME = 'bm-l-window';

export type WindowProps = BaseComponentProps & { ref?: RefObject<HTMLDivElement> } & Partial<CardStyle>;

export const Window: FC<PropsWithChildren<WindowProps>> = props => {
  const baseProps = getBaseComponentProps(props);
  const { getShadowStyleClass, getBackgroundStyleClass, getBlurStyleClass } = useCardStyle();
  const className = useMemo(
    () =>
      clsx(
        NAME,
        CARD_STYLE,
        getShadowStyleClass(props.shadow),
        getBackgroundStyleClass(props.background),
        getBlurStyleClass(props.blur),
        props.className
      ),
    [
      getBackgroundStyleClass,
      getBlurStyleClass,
      getShadowStyleClass,
      props.background,
      props.blur,
      props.className,
      props.shadow
    ]
  );

  return (
    <div className={className} {...baseProps} ref={props.ref}>
      {props.children}
    </div>
  );
};
