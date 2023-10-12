import { FC } from 'react';
import { BaseComponentProps, getBaseComponentProps } from '../../base/BaseComponent';

export const ChevronRight: FC<BaseComponentProps> = props => {
  const b = getBaseComponentProps(props);
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...b}>
      <path
        className="bm-e-symbol"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.2426 4.58578L6 0.34314L4.58579 1.75735L8.82843 5.99999L4.58579 10.2426L6 11.6568L10.2426 7.41421L11.6569 5.99999L10.2426 4.58578Z"
      />
    </svg>
  );
};
