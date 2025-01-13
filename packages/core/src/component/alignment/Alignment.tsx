import clsx from 'clsx';
import { type FC, type HTMLAttributes, type PropsWithChildren, useMemo } from 'react';
import type { Case } from '../../lib/Case';
import { ComponentToken } from '../ComponentToken';
import type { AlignmentType } from './AlignmentType';

export type AlignmentProps = {
  horizontalAlign?: Case<typeof AlignmentType>;
  verticalAlign?: Case<typeof AlignmentType>;
};

export const Alignment: FC<PropsWithChildren<AlignmentProps & HTMLAttributes<HTMLDivElement>>> = (props) => {
  const { newProps, restProps } = useAlignment(props);
  newProps.className = useMemo(() => clsx(newProps.className, restProps.className), [newProps.className, restProps.className]);

  return <div {...newProps} {...restProps} />;
};

export function useAlignment<P extends AlignmentProps>(props: P) {
  const { horizontalAlign, verticalAlign, ...restProps } = props;
  const cls = useMemo(
    () => clsx(ComponentToken.ALIGNMENT, { [`-h-${horizontalAlign}`]: horizontalAlign != null }, { [`-v-${verticalAlign}`]: verticalAlign != null }),
    [horizontalAlign, verticalAlign],
  );

  return {
    newProps: {
      className: cls,
    },
    restProps,
    alignmentClassName: cls,
  };
}
