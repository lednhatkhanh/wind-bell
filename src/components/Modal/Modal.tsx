import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { ExtendableComponentProps } from '../common';
import { Portal } from '../Portal';

import { ModalOverlay, ModalOverlayProps } from './ModalOverlay';
import { ModalContent, ModalContentProps } from './ModalContent';

type BaseProps = {
  'aria-labelledby': string;
  isOpen: boolean;
  onClose: () => void;
  ModalContent?: ModalContentProps;
  ModalOverlay?: ModalOverlayProps;
};
export type ModalProps = ExtendableComponentProps<'div', BaseProps>;

export const Modal: React.FC<ModalProps> = ({
  children,
  ['aria-labelledby']: ariaLabelledBy,
  isOpen,
  onClose,
  className,
  ModalContent: modalContentProps = {},
  ...rest
}) => {
  const modalContentRef = React.useRef<HTMLDivElement | null>(null);

  const handleClose = React.useCallback(() => {
    if (isOpen) {
      onClose();
    }
  }, [onClose, isOpen]);

  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    },
    [handleClose],
  );

  const handleClickOutside = React.useCallback(
    (event: MouseEvent) => {
      if (!modalContentRef.current?.contains(event.target as HTMLElement)) {
        handleClose();
      }
    },
    [handleClose],
  );

  const handleModalContentRefs = (instance: HTMLDivElement | null) => {
    modalContentRef.current = instance;

    const { ref: modalContentPropRef } = modalContentProps;
    if (typeof modalContentPropRef === 'function') {
      modalContentPropRef(instance);
    } else if (modalContentPropRef) {
      (modalContentPropRef as React.MutableRefObject<HTMLDivElement | null>).current = instance;
    }
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('mousedown', handleClickOutside);
      }
    };
  }, [handleClickOutside, handleKeyDown]);

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <MotionModalOverlay
            initial={overlayExitAnimate}
            animate={overlayAnimate}
            exit={overlayExitAnimate}
            {...(rest as unknown)}
            className={className}
          >
            <MotionModalContent
              initial={contentExitAnimate}
              animate={contentAnimate}
              exit={contentExitAnimate}
              {...(modalContentProps as unknown)}
              ref={handleModalContentRefs}
              aria-labelledby={ariaLabelledBy}
            >
              {children}
            </MotionModalContent>
          </MotionModalOverlay>
        )}
      </AnimatePresence>
    </Portal>
  );
};

const MotionModalOverlay = motion.custom(ModalOverlay);
const MotionModalContent = motion.custom(ModalContent);

const overlayExitAnimate = { background: 'rgba(0, 0, 0, 0)' };
const overlayAnimate = { background: 'rgba(0, 0, 0, 0.75)' };
const contentAnimate = { scale: 1 };
const contentExitAnimate = { scale: 0 };
