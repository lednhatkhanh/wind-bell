import React from 'react';
import clsx from 'clsx';

import { ExtendableComponentProps } from '../common';

import formMessageClasses from './FormMessage.module.css';
import { CloseIcon } from '../../icons';

type BaseProps = {
  variant?: 'success' | 'warning' | 'error' | 'info';
  onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
export type FormMessageProps = ExtendableComponentProps<'div', BaseProps>;

export const FormMessage: React.FC<FormMessageProps> = React.forwardRef(function FormMessage(
  { className, children, variant = 'info', onClose, ...rest },
  ref,
) {
  return (
    <div
      {...rest}
      ref={ref}
      className={clsx(
        formMessageClasses.formMessage,
        {
          error: formMessageClasses.isError,
          info: formMessageClasses.isInfo,
          warning: formMessageClasses.isWaring,
          success: formMessageClasses.isSuccess,
        }[variant],
        className,
      )}
    >
      {children}
      <button type="button" className={formMessageClasses.closeButton} aria-label="Close" onClick={onClose}>
        <CloseIcon className={formMessageClasses.closeIcon} />
      </button>
    </div>
  );
});
