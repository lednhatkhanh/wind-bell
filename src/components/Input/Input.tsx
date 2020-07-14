import React from 'react';
import clsx from 'clsx';

import { ExtendableComponentProps } from '../common';

import inputClasses from './Input.module.css';

type BaseProps = {
  fullWidth?: boolean;
};

export type InputProps = ExtendableComponentProps<'input', BaseProps>;

export const Input: React.FC<InputProps> = React.forwardRef(function Input(
  { fullWidth = false, className, ...rest },
  ref,
) {
  return (
    <input {...rest} ref={ref} className={clsx(inputClasses.input, fullWidth && inputClasses.isFullWidth, className)} />
  );
});
