import clsx from 'clsx';
import { FC, PropsWithChildren, useMemo } from 'react';
import { BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';
import { RootStyle } from '../../domain/StyleClass';
import { useCardStyle } from '../card/Card';

const NAME = 'bm-s-header';

export const Header: FC<PropsWithChildren<HeaderProps>> = (props) => {
  const { props: headerStyleProps } = useHeaderStyle(props);
  const baseProps = getBaseComponentProps(props);
  const className = useMemo(
    () => clsx(headerStyleProps.className, props.className),
    [headerStyleProps.className, props.className]
  );

  return (
    <header {...baseProps} className={className}>
      {props.children}
    </header>
  );
};

export type HeaderProps = HeaderStyleProps & BaseComponentProps;

export function useHeaderStyle(props: HeaderStyleProps) {
  const { getBlurStyleClass } = useCardStyle();

  return {
    name: NAME,
    props: {
      className: clsx(NAME, RootStyle.TEXT_BASE, getBlurStyleClass(props.blur ? 1 : 0))
    }
  };
}

export type HeaderStyleProps = {
  blur?: boolean;
};
