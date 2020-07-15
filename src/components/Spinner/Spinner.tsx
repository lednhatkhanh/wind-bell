import React from 'react';
import clsx from 'clsx';

import { ExtendableComponentProps } from '../common';

import spinnerClasses from './Spinner.module.css';

type SpinnerProps = ExtendableComponentProps<'svg'>;
export const Spinner: React.FC<SpinnerProps> = React.forwardRef(function Spinner({ className, ...rest }, ref) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
      className={clsx(spinnerClasses.spinner, className)}
      ref={ref}
    >
      <path d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z" fill="currentColor" />
      <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="currentColor" />
    </svg>
  );
});
