import type { FC, PropsWithChildren } from 'react';

export interface ModalFrameProps {
  show: boolean;
}

export const ModalFrame: FC<PropsWithChildren<ModalFrameProps>> = (props) => {
  return <div style={{ background: '#C0C0C0' }}>{props.children}</div>;
};
