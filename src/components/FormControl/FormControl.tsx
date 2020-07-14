import React from 'react';
import clsx from 'clsx';

import { ExtendableComponentProps } from '../common';

import formControlClasses from './FormControl.module.css';

export type FormControlProps = ExtendableComponentProps<'div'>;

export const FormControl: React.FC<FormControlProps> = React.forwardRef(function FormControl(
  { className, children, ...rest },
  ref,
) {
  return (
    <div {...rest} ref={ref} className={clsx(formControlClasses.formControl, className)}>
      {children}
    </div>
  );
});
