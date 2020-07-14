import React from 'react';
import clsx from 'clsx';

import { ExtendableComponentProps } from '../../common';

import modalContentClasses from './ModalContent.module.css';

type Props = ExtendableComponentProps<'div'>;
export const ModalContent: React.FC<Props> = React.forwardRef(function ModalContent(
  { children, className, role = 'dialog', ['aria-modal']: ariaModal = true, tabIndex = 0, ...rest },
  ref,
) {
  return (
    <div
      {...rest}
      tabIndex={tabIndex}
      className={clsx(modalContentClasses.modalContent, className)}
      ref={ref}
      role={role}
      aria-modal={ariaModal}
    >
      {children}
    </div>
  );
});
