import React from 'react';
import clsx from 'clsx';

import { useEnhancedEffect } from '../../../hooks';
import { ExtendableComponentProps } from '../../common';

import modalContentClasses from './ModalContent.module.css';

export type ModalContentProps = ExtendableComponentProps<'div'>;
export const ModalContent: React.FC<ModalContentProps> = React.forwardRef(function ModalContent(
  { children, className, role = 'dialog', ['aria-modal']: ariaModal = true, tabIndex = 0, ...rest },
  ref,
) {
  const ownRef = React.useRef<HTMLDivElement | null>(null);

  const handleRefs = (instance: HTMLDivElement | null) => {
    ownRef.current = instance;

    if (typeof ref === 'function') {
      ref(instance);
    } else if (ref) {
      ref.current = instance;
    }
  };

  useEnhancedEffect(() => {
    ownRef.current?.focus();
  }, []);

  return (
    <div
      {...rest}
      tabIndex={tabIndex}
      className={clsx(modalContentClasses.modalContent, className)}
      ref={handleRefs}
      role={role}
      aria-modal={ariaModal}
    >
      {children}
    </div>
  );
});
