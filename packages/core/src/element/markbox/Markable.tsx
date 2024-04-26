import clsx from 'clsx';
import { CSSProperties, FC, ReactNode, useMemo } from 'react';
import { AppearanceType, getAppearanceClassName } from '../../domain/AppearanceType';
import { PUSHABLE_STYLE } from '../../domain/StyleClass';
import { Case } from '../../util/Case';

export interface CheckboxElementProps {
  appearance?: Case<typeof AppearanceType>;
  symbol: ReactNode;
  style?: CSSProperties;
  className?: string;
}

export interface MarkableContext {
  disabled: boolean;
  marked: boolean;
}

const NAME = 'bm-e-markable';
const INNER_CHECK_SYMBOL = 'bm-e-markable__symbol';

export const useCheckboxElementHook = (props: CheckboxElementProps) => {
  const checkboxClass = useMemo(() => clsx(NAME, PUSHABLE_STYLE, props.className), [props.className]);

  return { checkboxClass };
};

export const useMarkableClassHook = (context: MarkableContext) => {
  const markableClass = useMemo(
    () =>
      clsx({
        '-marked': context.marked,
        '-disabled': context.disabled
      }),
    [context.marked, context.disabled]
  );

  return { markableClass };
};
