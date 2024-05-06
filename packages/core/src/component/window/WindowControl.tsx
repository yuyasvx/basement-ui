import clsx from 'clsx';
import { FC } from 'react';
import { Button, ButtonProps } from '../../form-items/button/Button';
import { VariantType } from '../../style-element/VariantType';
import { CloseIcon } from './WindowControlIcon';

export const CloseButton: FC<Omit<ButtonProps, 'icon'>> = (props) => {
  return <WindowControlButton {...props} icon={<CloseIcon />} />;
};

export const WindowControlButton: FC<ButtonProps> = (props) => {
  const newProps = { ...props };
  if (newProps.variant == null) {
    newProps.variant = VariantType.MINIMAL;
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
