import { ForwardedRef, forwardRef } from 'react';

const NAME = 'bm-e-list-item-separator';

export const ListItemSeparator = forwardRef((_, ref: ForwardedRef<HTMLLIElement>) => {
  const { newProps } = useListItemSeparator();
  return <li {...newProps} ref={ref}></li>;
});

export function useListItemSeparator() {
  return {
    name: NAME,
    newProps: {
      className: NAME
    }
  };
}
