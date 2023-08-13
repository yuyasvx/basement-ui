import { ComponentType, CSSProperties, FC, PropsWithChildren } from 'react';
import { AppearanceType } from '../domain/AppearanceType';
import { Case } from '../util/Case';

export interface AppearanceAdaptable {
  appearance?: Case<typeof AppearanceType>;
}
export interface BaseComponentProps {
  id?: string;
  tabIndex?: number;
  style?: CSSProperties;
  className?: string;
  dataProps?: { [key: string]: unknown };
}

export const getBaseComponentProps = <T extends BaseComponentProps>(props: PropsWithChildren<T>) => {
  const { id, style, tabIndex } = props;
  const data = props.dataProps ?? {};
  return {
    // as,
    // className: clsx(className, classNames),
    id,
    style,
    tabIndex,
    ...data
  };
};

// export const withBaseComponent = <P extends BaseComponentProps>(Component: ComponentType<P>) => {
//   return (props: P): ComponentType<P> => {
//     const newProps = getBaseComponentProps(props);
//     return <Component {...newProps} {...(props as P)} />;
//   };
// };
