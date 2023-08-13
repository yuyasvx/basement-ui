import { FC, PropsWithChildren } from 'react';

const NAME = 'bm-e-combined-button-item';

export const ConbinedButtonItem: FC<PropsWithChildren> = props => {
  return <button>{props.children}</button>;
};
