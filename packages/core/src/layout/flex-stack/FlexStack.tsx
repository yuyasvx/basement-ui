import clsx from 'clsx';
import { useMemo } from 'react';
import { Case } from '../../util/Case';
import { FlexAlign } from './FlexAlign';
import { FlexStackJustify } from './FlexStackJustify';

interface FlexStackDetailedProps {
  // direction?: Case<typeof FlexStackDirection>;
  vertical?: boolean;
  inline?: boolean;
  reversed?: boolean;
  justify?: Case<typeof FlexStackJustify>;
  align?: Case<typeof FlexAlign>;
}

const NAME = 'bm-l-flex-stack';
const ITEM_NAME = `${NAME}__item`;

export type FlexStackProps = FlexStackDetailedProps;

export const useFlexStackLayout = (props: FlexStackProps) => {
  const classNames = useMemo(
    () =>
      clsx(NAME, {
        '-vertical': props.vertical === true,
        '-inline': props.inline === true,
        '-reversed': props.reversed === true,
        '-space-between': props.justify === FlexStackJustify.SPACE_BETWEEN,
        '-end': props.justify === FlexStackJustify.END,
        '-center': props.justify === FlexStackJustify.CENTER,
        '-align-center': props.align === FlexAlign.CENTER,
        '-align-start': props.align === FlexAlign.START,
        '-align-end': props.align === FlexAlign.END,
        '-align-stretch': props.align === FlexAlign.STRETCH
      }),
    [props.align, props.inline, props.justify, props.reversed, props.vertical]
  );

  return {
    name: NAME,
    itemName: ITEM_NAME,
    className: classNames
  };
};
