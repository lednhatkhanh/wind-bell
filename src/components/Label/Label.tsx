import React from 'react';
import clsx from 'clsx';

import { ExtendableComponentProps } from '../common';

import labelClasses from './Label.module.css';

export type LabelProps = ExtendableComponentProps<'label'>;

export const Label: React.FC<LabelProps> = React.forwardRef(function Label({ className, children, ...rest }, ref) {
  return (
    <label {...rest} ref={ref} className={clsx(labelClasses.label, className)}>
      {children}
    </label>
  );
});
