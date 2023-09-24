import { FC, PropsWithChildren, useMemo } from 'react';
import clsx from 'clsx';
import { BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';
import { MouseEvents } from '../../domain/EventProps';
import { getMouseEventHandler } from '../../util/Handler';
import { Case } from '../../util/Case';

interface FlexStackDetailedProps {
  // direction?: Case<typeof FlexStackDirection>;
  vertical?: boolean;
  inline?: boolean;
  reversed?: boolean;
  justify?: Case<typeof FlexStackJustify>;
}

export const FlexStackJustify = {
  SPACE_BETWEEN: 'space-between',
  END: 'end',
  CENTER: 'center'
} as const;

const NAME = 'bm-l-flex-stack';
const ITEM_NAME = `${NAME}__item`;

export type FlexStackProps = FlexStackDetailedProps;

export const useFlexStackLayout = (props: FlexStackProps) => {
  const classNames = useMemo(
    () =>
      clsx(
        NAME,
        { '-vertical': props.vertical === true },
        { '-inline': props.inline === true },
        { '-reversed': props.reversed === true },
        { '-space-between': props.justify === FlexStackJustify.SPACE_BETWEEN },
        { '-end': props.justify === FlexStackJustify.END },
        { '-center': props.justify === FlexStackJustify.CENTER }
      ),
    [props.inline, props.justify, props.reversed, props.vertical]
  );

  return {
    name: NAME,
    itemName: ITEM_NAME,
    className: classNames
  };
};
