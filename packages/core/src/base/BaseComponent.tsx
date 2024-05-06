import { CSSProperties } from 'react';

export function getBaseComponentProps<P extends BaseComponentProps>(props: P) {
  const { id, style, tabIndex } = props;
  const data = props.nativeProps ?? {};
  return {
    // as,
    // className: clsx(className, classNames),
    id,
    style,
    tabIndex,
    ...data
  };
}

export interface BaseComponentProps {
  id?: string;
  tabIndex?: number;
  style?: CSSProperties;
  className?: string;
  nativeProps?: { [key: string]: unknown };
}
