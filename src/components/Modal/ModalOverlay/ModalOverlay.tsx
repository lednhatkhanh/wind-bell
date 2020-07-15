import React from 'react';
import clsx from 'clsx';

import { useScrollbarWidth, useEnhancedEffect } from '../../../hooks';
import { ExtendableComponentProps } from '../../common';

import modalOverlayClasses from './ModalOverlay.module.css';

export type ModalOverlayProps = ExtendableComponentProps<'div'>;
export const ModalOverlay: React.FC<ModalOverlayProps> = React.forwardRef(function ModalOverlay(
  { children, className, style, ...rest },
  ref,
) {
  const scrollBarWidth = useScrollbarWidth();

  useEnhancedEffect(() => {
    document.body.classList.add('overflow-hidden');
    document.body.style.paddingRight = `${scrollBarWidth}px`;

    return () => {
      if (typeof window !== 'undefined') {
        document.body.classList.remove('overflow-hidden');
        document.body.style.paddingRight = '0px';
      }
    };
  }, [scrollBarWidth]);

  return (
    <div {...rest} className={clsx(modalOverlayClasses.modalOverlay, className)} style={{ ...style }} ref={ref}>
      {children}
    </div>
  );
});
