import React from 'react';
import clsx from 'clsx';

import { ExtendableComponentProps } from '../../common';

import modalOverlayClasses from './ModalOverlay.module.css';

export type ModalOverlayProps = ExtendableComponentProps<'div'>;
export const ModalOverlay: React.FC<ModalOverlayProps> = React.forwardRef(function ModalOverlay(
  { children, className, style, ...rest },
  ref,
) {
  return (
    <div {...rest} className={clsx(modalOverlayClasses.modalOverlay, className)} style={{ ...style }} ref={ref}>
      {children}
    </div>
  );
});
