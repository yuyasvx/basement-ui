import clsx from 'clsx';
import { FC } from 'react';
import { AppearanceType } from '../../domain/AppearanceType';
import { Button, ButtonProps } from '../../form-items/button/Button';
import { CloseIcon } from './WindowControlIcon';

export const CloseButton: FC<Omit<ButtonProps, 'icon'>> = (props) => {
  return <WindowControlButton {...props} icon={<CloseIcon />} />;
};

export const WindowControlButton: FC<ButtonProps> = (props) => {
  const newProps = { ...props };
  if (newProps.variant == null) {
    newProps.variant = AppearanceType.MINIMAL;
  }
  if (newProps.tabIndex == null) {
    newProps.tabIndex = -1;
  }
  if (newProps.focusable == null) {
    newProps.focusable = false;
  }
  const cn = props.className ?? '';
  newProps.className = clsx('bm-c-window-control-button', cn);

  return <Button {...newProps} />;
};
