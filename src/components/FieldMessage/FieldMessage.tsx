import React from 'react';
import clsx from 'clsx';

import { ExtendableComponentProps } from '../common';

import fieldMessageClasses from './FieldMessage.module.css';

type BaseProps = {
  isError?: boolean;
};
export type FieldMessageProps = ExtendableComponentProps<'span', BaseProps>;

export const FieldMessage: React.FC<FieldMessageProps> = React.forwardRef(function FormFieldHelperText(
  { className, children, isError = false, ...rest },
  ref,
) {
  return (
    <span
      {...rest}
      ref={ref}
      className={clsx(fieldMessageClasses.fieldMessage, isError && fieldMessageClasses.isError, className)}
    >
      {children}
    </span>
  );
});
